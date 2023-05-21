import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useSupabase } from '@/app/supabase-provider';
import { RoleIdByName } from '@/constants/constants';

const useAddPropertyMutation = () => {
  const { supabase, session } = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (!session?.user.id) throw new Error('User not logged in');

      const { data, error } = await supabase
        .from('properties')
        .insert([
          {
            name,
          },
        ])
        .select('*');

      if (error) {
        throw new Error(error.message);
      }

      if (data && data.length === 0) {
        throw new Error('No data returned');
      }

      const propertyId = data[0].id;

      const { data: dataNewGuestsOwners, error: errorNewGuestsOwners } =
        await supabase.from('fact_table').insert([
          {
            profile_id: session.user.id,
            property_id: propertyId,
            role_id: RoleIdByName.Owner,
          },
        ]);

      if (errorNewGuestsOwners) {
        throw new Error(errorNewGuestsOwners.message);
      }

      return dataNewGuestsOwners;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};

export default useAddPropertyMutation;
