import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import { PropertiesByUser } from '@/pages/api/properties';

const useGetPropertiesQuery = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const fetchProperties = async () => {
    const { data, error } = await supabaseClient
      .from('guests_owners')
      .select('id, role_id, properties(id, name)')
      .eq('profile_id', user?.id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return useQuery<unknown, unknown, PropertiesByUser>({
    queryKey: ['properties'],
    queryFn: () => fetchProperties(),
  });
};

export default useGetPropertiesQuery;
