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
      const { data, error } = await supabase
        .from('guests_owners')
        .delete()
        .eq('id', guestId);

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
