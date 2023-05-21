import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@/app/supabase-provider';

const useGetProfileQuery = () => {
  const { supabase, session } = useSupabase();

  const fetchProfile = async () => {
    return await supabase
      .from('profiles')
      .select(`id, first_name, last_name`)
      .eq('id', session?.user.id)
      .single();
  };

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => fetchProfile().then((result) => result.data),
    enabled: !!session?.user.id,
  });
};

export default useGetProfileQuery;
