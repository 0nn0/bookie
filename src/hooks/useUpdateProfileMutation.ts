import { useMutation } from '@tanstack/react-query';

import { useSupabase } from '@/app/supabase-provider';

const useUpdateProfileMutation = () => {
  const { supabase, session } = useSupabase();

  return useMutation({
    mutationFn: async (formData: { first_name: string; last_name: string }) => {
      // update value in users table, which is used for avatar
      const { error: updateUserTableError } = await supabase.auth.updateUser({
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
      });

      if (updateUserTableError) {
        throw new Error(updateUserTableError.message);
      }

      // update value in profiles table, which is used for e.g. the calendar
      const { error: updateProfilesTable } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session?.user.id);

      if (updateProfilesTable) {
        throw new Error(updateProfilesTable.message);
      }

      await supabase.auth.refreshSession();
    },
  });
};

export default useUpdateProfileMutation;
