import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useSupabase } from '@/app/supabase-provider';

const useUpdatePropertyMutation = ({ propertyId }: { propertyId: string }) => {
  const { supabase, session } = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (!session?.user.id) throw new Error('User not logged in');

      return await supabase
        .from('properties')
        .update({
          name,
        })
        .eq('id', propertyId)
        .throwOnError();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};

export default useUpdatePropertyMutation;
