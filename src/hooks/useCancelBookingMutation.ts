import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Database } from '@/lib/database.types';

const useCancelBookingMutation = (bookingId: string, propertyId: string) => {
  const user = useUser();
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not logged in');

      // check if user is authorised (owner/guest)
      // const { data, error } = await supabase
      //   .from('bookings')
      //   .select()
      //   .eq('property_id', propertyId)
      //   .eq('profile_id', user.id)
      //   .eq('role_id', Role.OWNER)

      // if (data && data.length > 0) {
      // cancel booking

      // console.log('useCancelBookingMutation', { bookingId });
      const { data: propertyData, error: propertyError } = await supabase
        .from('bookings')
        .update({ status: 'CANCELED' })
        .eq('id', bookingId);

      return propertyData;
      // }

      // throw new Error('User is not owner');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', propertyId] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useCancelBookingMutation;
