import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@/app/supabase-provider';

const useGetPropertiesQuery = (roleId?: string) => {
  const { supabase, session } = useSupabase();

  const fetchProperties = async () => {
    const query = supabase
      .from('fact_table')
      .select('id, profile_id, role_id, properties(id, name)')
      .eq('profile_id', session?.user?.id)
      .order('name', { ascending: true, foreignTable: 'properties' });

    if (roleId) {
      query.eq('fact_table.role_id', roleId);
    }

    query.throwOnError();

    return await query;
  };

  return useQuery({
    queryKey: ['properties'],
    queryFn: async () => fetchProperties().then((result) => result.data),
    enabled: !!session?.user.id,
  });
};

export default useGetPropertiesQuery;
