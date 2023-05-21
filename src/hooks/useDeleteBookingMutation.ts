import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useSupabase } from '@/app/supabase-provider';

const useDeleteBookingMutation = ({
  propertyId,
  bookingId,
}: {
  propertyId: string;
  bookingId: string;
}) => {
  const { supabase, session } = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!session?.user.id) throw new Error('User not logged in');

      // check if booking is from the logged in user
      const { data, error } = await supabase
        .from('bookings')
        .select('id, fact_table!inner(id, profile_id)')
        .eq('id', bookingId)
        .eq('fact_table.profile_id', session?.user.id);

      if (error) {
        throw new Error(error.message);
      }

      if (data?.length === 0) {
        throw new Error('User is not owner');
      }

      // delete booking for this property
      const { error: deleteBookingsError } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

      if (deleteBookingsError) {
        throw new Error(deleteBookingsError.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', propertyId] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useDeleteBookingMutation;
