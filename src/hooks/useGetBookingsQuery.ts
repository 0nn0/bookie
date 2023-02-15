import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import { CalendarFilter } from '@/pages/properties/[id]/calendar';

const useGetBookingsQuery = ({
  userId,
  filter,
  propertyId,
  limit,
}: {
  userId: string;
  filter: CalendarFilter;
  propertyId?: string;
  limit?: number;
}) => {
  const supabaseClient = useSupabaseClient();

  const fetchBookings = async () => {
    let query = supabaseClient
      .from('bookings')
      .select(
        'id, start_date, end_date, status, guests_owners(id, role_id, profiles(id, first_name, last_name, avatar_url)), properties(id, name)'
      );

    if (propertyId) {
      query.eq('property_id', propertyId);
    } else {
      query.eq('guests_owners.profiles.id', userId);
    }

    if (filter === 'UPCOMING') {
      query = query
        .eq('status', 'BOOKED')
        .gte('end_date', new Date().toISOString());
    }

    if (limit) {
      query = query.limit(limit);
    }

    query = query.order('start_date', { ascending: true }).throwOnError();

    return await query;
  };

  return useQuery({
    queryKey: propertyId
      ? ['bookings', propertyId, filter]
      : ['bookings', filter],
    queryFn: async () => {
      return await fetchBookings().then((result) => result.data);
    },
  });
};

export default useGetBookingsQuery;
