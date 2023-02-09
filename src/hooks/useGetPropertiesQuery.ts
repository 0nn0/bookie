import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import { PropertiesByUser } from '@/pages/api/properties';

const useGetPropertiesQuery = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const fetchProperties = async () => {
    return await supabaseClient
      .from('guests_owners')
      .select('id, role_id, properties(id, name)')
      .eq('profile_id', user?.id)
      .throwOnError();
  };

  return useQuery<unknown, unknown, PropertiesByUser>({
    queryKey: ['properties'],
    queryFn: async () => fetchProperties().then((result) => result.data),
  });
};

export default useGetPropertiesQuery;
