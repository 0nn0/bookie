import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { StatusIdByName } from '@/constants/constants';
import { Database } from '@/lib/database.types';

const useAddBookingMutation = ({ propertyId }: { propertyId: string }) => {
  const user = useUser();
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    }) => {
      if (!user?.id) throw new Error('User not logged in');

      // get the fact_table id
      const { data: factTableData, error: factTableError } = await supabase
        .from('fact_table')
        .select('id')
        .eq('property_id', propertyId)
        .eq('profile_id', user.id)
        .single();

      if (factTableData?.id) {
        const { data, error } = await supabase
          .from('bookings')
          .insert([
            {
              fact_table_id: factTableData.id,
              start_date: startDate,
              end_date: endDate,
              status_id: StatusIdByName.Booked,
            },
          ])
          .select('*');

        if (error instanceof Error) {
          throw new Error(error.message);
        }

        return data;
      } else {
        if (factTableError instanceof Error) {
          throw new Error(factTableError.message);
        }
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', propertyId] });
    },
  });
};

export default useAddBookingMutation;
