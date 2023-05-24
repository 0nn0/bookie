import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { RoleIdByName } from '@/constants/constants';
import { Database } from '@/lib/database.types';

export async function DELETE() {
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

  // 1. check if user is owner or guest of any properties
  const { data: factTableRecords } = await supabase
    .from('fact_table')
    .select()
    .eq('profile_id', session.user.id);

  // 2. get the property ids of which they are the owner
  const ownedPropertyIds = factTableRecords
    ?.filter((item) => item.role_id === RoleIdByName.Owner)
    .map((item) => item.property_id);

  // 3. delete all bookings from all by user owned properties + all bookings which user made as a guest
  if (ownedPropertyIds) {
    // get all booking ids
    const { data: ownedPropertiesBookings } = await supabase
      .from('bookings')
      .select('id, fact_table!inner(id, profile_id, property_id)')
      .or(
        `property_id.in.(${ownedPropertyIds}),profile_id.eq.${session?.user.id}`,
        {
          foreignTable: 'fact_table',
        }
      );

    const bookingIdsToBeDeleted = ownedPropertiesBookings?.map(
      (item) => item.id
    );

    if (bookingIdsToBeDeleted && bookingIdsToBeDeleted.length > 0) {
      await supabase.from('bookings').delete().in('id', bookingIdsToBeDeleted);
    }
  }

  // 4. delete all guests/owners for any property that they own
  if (ownedPropertyIds) {
    for (const propertyId of ownedPropertyIds) {
      //   await supabase.from('bookings').delete().eq('property_id', propertyId);
      await supabase.from('fact_table').delete().eq('property_id', propertyId);
    }
  }

  // 5. delete all guests/owners for any property that they own
  if (ownedPropertyIds) {
    for (const propertyId of ownedPropertyIds) {
      await supabase.from('fact_table').delete().eq('property_id', propertyId);
    }
  }

  // 6. delete themselves from properties for which they are a guest
  const { error: deleteSelfError } = await supabase
    .from('fact_table')
    .delete()
    .eq('profile_id', session.user.id);

  console.log({ deleteSelfError });

  // 7. delete properties for which they are the owner
  if (ownedPropertyIds) {
    for (const propertyId of ownedPropertyIds) {
      await supabase.from('properties').delete().eq('id', propertyId);
    }
  }

  // 8. delete user from profiles
  const { error: deleteProfilesError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', session.user.id);

  console.log({ deleteProfilesError });

  // 9. signout user
  const { error: signOutError } = await supabase.auth.signOut();

  console.log({ signOutError });

  // 10. delete user from users table
  const { error: userDeleteError } = await supabase.auth.admin.deleteUser(
    session.user.id
  );

  console.log({ userDeleteError });

  //   res.status(200).json({ message: 'User deleted' });
  return new NextResponse('User deleted', { status: 200 });
}
