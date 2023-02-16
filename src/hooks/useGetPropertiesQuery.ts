import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

const useGetPropertiesQuery = () => {
  const user = useUser();
  console.log({ user });
  const supabaseClient = useSupabaseClient();

  const fetchProperties = async () => {
    return await supabaseClient
      .from('guests_owners')
      .select('id, role_id, properties(id, name)')
      .eq('profile_id', user?.id)
      .throwOnError();
  };

  return useQuery({
    queryKey: ['properties'],
    queryFn: async () => fetchProperties().then((result) => result.data),
    enabled: !!user,
  });
};

export default useGetPropertiesQuery;
