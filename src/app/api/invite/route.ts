import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { RoleIdByName } from '@/constants/constants';
import { Database } from '@/lib/database.types';

export async function POST(request: Request) {
  const requestBody = await request.json();

  // validate request body
  const schema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    propertyId: z.string(),
  });

  const result = schema.safeParse(requestBody);

  if (!result.success) {
    return new NextResponse('Invalid request payload', { status: 400 });
  }

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  // check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return new NextResponse('Not authenticated', { status: 401 });
  }

  const { firstName, lastName, email, propertyId } = requestBody;

  // check if use is an owner (authorised to invite guests)
  const { data: ownerData, error: ownerError } = await supabase
    .from('fact_table')
    .select()
    .eq('property_id', propertyId)
    .eq('profile_id', session.user.id)
    .eq('role_id', RoleIdByName.Owner)
    .single();

  if (ownerError) {
    return new NextResponse('Unauthorized', { status: 500 });
  }

  // invite user
  const { data: inviteData, error: inviteError } =
    await supabase.auth.admin.inviteUserByEmail(email, {
      data: {
        firstName,
        lastName,
      },
    });

  let profileId;

  if (inviteError) {
    // e.g. user already exists
    console.log('inviteError', inviteError.message);

    // get user id from email
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    profileId = user?.id;
  } else {
    profileId = inviteData?.user.id;
  }

  if (!profileId) {
    return new NextResponse('Could not find user', { status: 500 });
  }

  // update first and last name in profile table
  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
    })
    .eq('id', profileId);

  // check if user is already a guest for this property
  const guest = await supabase
    .from('fact_table')
    .select()
    .eq('profile_id', profileId)
    .eq('property_id', propertyId);

  const notAGuest = guest.data?.length === 0;

  if (notAGuest) {
    // add user as guest
    await supabase.from('fact_table').insert({
      profile_id: profileId,
      property_id: propertyId,
      role_id: RoleIdByName.Guest,
    });
  } else {
    return new NextResponse('User is already a guest', { status: 409 });
  }

  return NextResponse.json(requestBody);
}
