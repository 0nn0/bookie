import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import { PropertiesByUser } from '@/pages/api/properties';

const useGetGuestsQuery = ({ propertyId }: { propertyId: string }) => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const fetchGuests = async () => {
    const { data, error } = await supabaseClient
      .from('guests_owners')
      .select('id, role_id, profiles(id, email, last_sign_in_at)')
      .eq('property_id', propertyId)
      // exclude the current user
      .neq('profile_id', user?.id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return useQuery<unknown, unknown, PropertiesByUser>({
    queryKey: ['guests', propertyId],
    queryFn: () => fetchGuests(),
  });
};

export default useGetGuestsQuery;
