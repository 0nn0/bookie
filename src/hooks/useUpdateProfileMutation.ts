import { useMutation } from '@tanstack/react-query';

import { useSupabase } from '@/app/supabase-provider';

const useUpdateProfileMutation = () => {
  const { supabase, session } = useSupabase();

  return useMutation({
    mutationFn: async (formData: { first_name: string; last_name: string }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session?.user.id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export default useUpdateProfileMutation;
