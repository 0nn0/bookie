import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

const useGetUpcomingBookingsQuery = ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const supabaseClient = useSupabaseClient();

  const fetch = async () => {
    return await supabaseClient
      .from('bookings')
      .select(
        'id, start_date, end_date, status, guests_owners(id, role_id, profiles(id, first_name, last_name, avatar_url)), properties(id, name)'
      )
      .eq('property_id', propertyId)
      .gte('end_date', new Date().toISOString())
      .neq('status', 'CANCELED')
      .order('start_date', { ascending: true })
      .throwOnError();
  };

  return useQuery({
    queryKey: ['bookings', propertyId],
    queryFn: async () => {
      return await fetch().then((result) => result.data);
    },
  });
};

export default useGetUpcomingBookingsQuery;