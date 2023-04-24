import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import { StatusIdByName } from '@/constants/constants';

const useGetBookingsQuery = ({
  month,
  year,
  propertyId,
}: {
  month: number;
  year: number;
  propertyId: string;
}) => {
  const supabaseClient = useSupabaseClient();

  const fetchBookings = async () => {
    const startDate = `${year}-${month}-01`;

    const daysInMonth = new Date(year, month, 0).getDate();
    const endDate = `${year}-${month}-${daysInMonth}`;

    const query = supabaseClient
      .from('bookings')
      .select(
        'id, start_date, end_date, fact_table!inner(id, profile_id, profiles(id, first_name, last_name, avatar_url), properties(id, name))'
      )
      .eq('fact_table.property_id', propertyId)
      .eq('status_id', StatusIdByName.Booked)
      .gte('start_date', startDate)
      .lte('end_date', endDate)
      .order('start_date', { ascending: true })
      .throwOnError();

    return await query;
  };

  return useQuery({
    queryKey: ['bookings', propertyId, `${month}-${year}`],
    queryFn: async () => {
      return await fetchBookings().then((result) => result.data);
    },
  });
};
export default useGetBookingsQuery;
