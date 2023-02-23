import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

import { RoleIdByName } from '@/constants/constants';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerSupabaseClient({ req, res });

  // check if user is logged in
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { email, propertyId } = req.body;

    // check if use is an owner (authorised to invite guests)
    const { data: ownerData, error: ownerError } = await supabase
      .from('fact_table')
      .select()
      .eq('property_id', propertyId)
      .eq('profile_id', session.user.id)
      .eq('role_id', RoleIdByName.Owner)
      .single();

    if (ownerError) {
      console.log({ ownerError });
      return res.status(500).json({ error: ownerError.message });
    }

    const { data: inviteData, error: inviteError } =
      await supabaseAdmin.auth.admin.inviteUserByEmail(email);

    let profileId;

    if (inviteError) {
      // e.g. user already exists
      console.log('inviteError', inviteError.message);
      // return res.status(500).json({ error: inviteError.message });

      // get user id from email
      const { data: user, error: userError } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      profileId = user?.id;
    } else {
      profileId = inviteData?.user.id;
    }

    // console.log({ profileId });

    if (!profileId) {
      return res.status(500).json({ error: 'Could not find user' });
    }

    // check if user is already a guest for this property
    const guest = await supabaseAdmin
      .from('fact_table')
      .select()
      .eq('profile_id', profileId)
      .eq('property_id', propertyId);

    console.log({ guest });

    if (guest.data.length === 0) {
      console.log('Inserting guest');
      await supabaseAdmin.from('fact_table').insert({
        created_at: new Date(),
        profile_id: profileId,
        property_id: propertyId,
        role_id: RoleIdByName.Guest,
      });
    } else {
      return res.status(409).json({ error: 'User is already a guest' });
    }

    return res.status(200).json({});
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
