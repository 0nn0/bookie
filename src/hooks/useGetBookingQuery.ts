import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

const useGetBookingQuery = ({ bookingId }: { bookingId: string }) => {
  const supabaseClient = useSupabaseClient();

  const fetchBooking = async () => {
    return await supabaseClient
      .from('bookings')
      .select(
        'id, start_date, end_date, status, guests_owners(id, role_id, profiles(id, first_name, last_name)), properties(id, name)'
      )
      .eq('id', bookingId)
      .single();
  };

  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: async () => {
      return await fetchBooking().then((result) => result.data);
    },
  });
};

export default useGetBookingQuery;
