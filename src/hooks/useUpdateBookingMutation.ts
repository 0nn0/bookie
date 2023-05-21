import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import { useSupabase } from '@/app/supabase-provider';

const useUpdateBookingMutation = ({
  propertyId,
  bookingId,
}: {
  propertyId: string;
  bookingId: string;
}) => {
  const { supabase, session } = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      startDate,
      endDate,
    }: {
      startDate: Date;
      endDate: Date;
    }) => {
      if (!session?.user.id) throw new Error('User not logged in');

      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      const formattedEndDate = format(endDate, 'yyyy-MM-dd');

      // 1. Check if dates are available
      // const { data: existingBookings, error: existingError } =
      //   await supabase.rpc('booking_exists', {
      //     sdate: formattedStartDate,
      //     edate: formattedEndDate,
      //     propid: propertyId,
      //   });

      // if (existingError instanceof Error) console.log(existingError.message);

      // if (existingBookings && existingBookings.length > 0) {
      //   window.alert('Selected dates are not available');
      // }

      // 2. Update booking
      const { data, error } = await supabase
        .from('bookings')
        .update({
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        })
        .eq('id', bookingId);

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', propertyId] });
    },
  });
};

export default useUpdateBookingMutation;
