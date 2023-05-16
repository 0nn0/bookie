import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

const useGetPropertiesQuery = (roleId?: string) => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const fetchProperties = async () => {
    const query = supabaseClient
      .from('fact_table')
      .select('id, profile_id, role_id, properties(id, name)')
      .eq('profile_id', user?.id)
      .order('name', { ascending: true, foreignTable: 'properties' });

    if (roleId) {
      query.eq('fact_table.role_id', roleId);
    }

    query.throwOnError();

    return await query;
  };

  return useQuery({
    queryKey: ['properties', roleId],
    queryFn: async () => fetchProperties().then((result) => result.data),
    enabled: !!user,
  });
};

export default useGetPropertiesQuery;
