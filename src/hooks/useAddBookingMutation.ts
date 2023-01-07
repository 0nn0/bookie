import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kStringMaxLength } from 'buffer';

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

      // get the guests_owners id
      const { data: guestsOwnersData, error: guestsOwnersError } =
        await supabase
          .from('guests_owners')
          .select('id')
          .eq('property_id', propertyId)
          .eq('profile_id', user.id)
          .single();

      if (guestsOwnersData?.id) {
        const { data, error } = await supabase
          .from('bookings')
          .insert([
            {
              property_id: propertyId,
              guests_owners_id: guestsOwnersData.id,
              start_date: startDate,
              end_date: endDate,
            },
          ])
          .select('*');

        if (error instanceof Error) {
          throw new Error(error.message);
        }

        return data;
      } else {
        if (guestsOwnersError instanceof Error) {
          throw new Error(guestsOwnersError.message);
        }
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', propertyId] });
    },
  });
};

export default useAddBookingMutation;
