import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Database } from '@/lib/database.types';

const useDeleteGuestMutation = ({
  propertyId,
  guestId,
}: {
  propertyId: string;
  guestId: string;
}) => {
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (propertyId: string) => {
      console.log('DELETE', { propertyId, guestId });

      // delete all bookings
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .delete()
        .eq('fact_table_id', guestId)
        .eq('property_id', propertyId);

      // delete guest
      const { data, error } = await supabase
        .from('fact_table')
        .delete()
        .eq('id', guestId)
        .eq('property_id', propertyId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests', propertyId] });
    },
  });
};

export default useDeleteGuestMutation;
