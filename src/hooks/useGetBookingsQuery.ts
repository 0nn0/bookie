import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import { CalendarFilter } from '@/pages/properties/[id]/calendar';

export interface BookingsByProperty {
  propertyId: string;
  filter: CalendarFilter;
  limit?: number;
  userId?: never;
}

export interface BookingsByUser {
  userId: string;
  filter: CalendarFilter;
  limit?: number;
  propertyId?: never;
}

type Props = BookingsByProperty | BookingsByUser;

const useGetBookingsQuery = (props: Props) => {
  const supabaseClient = useSupabaseClient();

  const fetchBookings = async () => {
    let query = supabaseClient
      .from('bookings')
      .select(
        'id, start_date, end_date, status, guests_owners!inner(id, role_id, profile_id, profiles(id, first_name, last_name, avatar_url)), properties(id, name)'
      );

    if ('propertyId' in props) {
      query.eq('property_id', props.propertyId);
    }

    if ('userId' in props) {
      query.eq('guests_owners.profile_id', props.userId);
    }

    if (props.filter === 'UPCOMING') {
      query = query
        .eq('status', 'BOOKED')
        .gte('end_date', new Date().toISOString());
    }

    if (props.limit) {
      query = query.limit(props.limit);
    }

    query = query.order('start_date', { ascending: true }).throwOnError();

    return await query;
  };

  return useQuery({
    queryKey: props.propertyId
      ? ['bookings', props.propertyId, props.filter]
      : ['bookings', props.filter],
    queryFn: async () => {
      return await fetchBookings().then((result) => result.data);
    },
  });
};

export default useGetBookingsQuery;
