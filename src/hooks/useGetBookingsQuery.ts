import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import { StatusIdByName } from '@/constants/constants';
import { CalendarFilter } from '@/pages/properties/[id]/calendar';

export interface BookingsByProperty {
  propertyIds: string[];
  filter: CalendarFilter;
  limit?: number;
  userId?: never;
}

export interface BookingsByUser {
  userId: string;
  filter: CalendarFilter;
  limit?: number;
  propertyIds?: never;
}

type Props = BookingsByProperty | BookingsByUser;

const useGetBookingsQuery = (props: Props) => {
  const supabaseClient = useSupabaseClient();

  const fetchBookings = async () => {
    let query = supabaseClient
      .from('bookings')
      .select(
        'id, start_date, end_date, status_id, status!inner(id, name), fact_table!inner(id, role_id, profile_id, property_id, profiles(id, first_name, last_name, avatar_url), properties(id, name))'
      );

    // From selected properties
    if ('propertyIds' in props && props.propertyIds) {
      query.in('fact_table.property_id', props.propertyIds);
    }

    // Your own bookings
    if ('userId' in props && props.userId) {
      query.eq('fact_table.profile_id', props.userId);
    }

    if (props.filter === 'UPCOMING') {
      query
        .eq('status_id', StatusIdByName.Booked)
        .gte('end_date', new Date().toISOString());
    }

    if (props.limit) {
      query.limit(props.limit);
    }

    query.order('start_date', { ascending: true });
    query.throwOnError();

    return await query;
  };

  return useQuery({
    queryKey: props.propertyIds
      ? ['bookings', props.propertyIds, props.filter]
      : ['bookings', props.filter],
    queryFn: async () => {
      return await fetchBookings().then((result) => result.data);
    },
  });
};
export default useGetBookingsQuery;
