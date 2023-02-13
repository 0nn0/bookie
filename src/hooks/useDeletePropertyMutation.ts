import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Database } from '@/lib/database.types';
import { Role } from '@/pages/api/user';

const useDeletePropertyMutation = ({ propertyId }: { propertyId: string }) => {
  const user = useUser();
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (propertyId: string) => {
      if (!user?.id) throw new Error('User not logged in');

      // check if user is owner
      const { data, error } = await supabase
        .from('guests_owners')
        .select()
        .eq('property_id', propertyId)
        .eq('profile_id', user.id)
        .eq('role_id', Role.OWNER);

      if (data && data.length > 0) {
        // delete all guests_owners records for this property
        const { data, error } = await supabase
          .from('guests_owners')
          .delete()
          .eq('property_id', propertyId);

        if (error) {
          throw new Error(error.message);
        }

        // delete property
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .delete()
          .eq('id', propertyId);

        return propertyData;
      }

      throw new Error('User is not owner');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useDeletePropertyMutation;
