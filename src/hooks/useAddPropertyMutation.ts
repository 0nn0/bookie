import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { Database } from '@/lib/database.types';

const useAddPropertyMutation = () => {
  const user = useUser();
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (!user?.id) throw new Error('User not logged in');

      const { data, error } = await supabase
        .from('properties')
        .insert([
          {
            name,
          },
        ])
        .select('*');

      console.log({ data });

      if (error) {
        throw new Error(error.message);
      }

      if (data && data.length === 0) {
        throw new Error('No data returned');
      }

      const propertyId = data[0].id;

      const { data: dataNewGuestsOwners, error: errorNewGuestsOwners } =
        await supabase.from('guests_owners').insert([
          {
            profile_id: user.id,
            property_id: propertyId,
            role_id: 'OWNER',
          },
        ]);

      if (errorNewGuestsOwners) {
        throw new Error(errorNewGuestsOwners.message);
      }

      return dataNewGuestsOwners;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });

      router.push('/');
    },
  });
};

export default useAddPropertyMutation;
