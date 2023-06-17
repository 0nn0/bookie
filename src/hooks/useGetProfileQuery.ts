import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@/app/supabase-provider';

const useGetProfileQuery = () => {
  const { supabase, session } = useSupabase();

  const fetchProfile = async () => {
    return await supabase.auth.getUser(session?.user.id);
  };

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => fetchProfile().then((result) => result.data),
    enabled: !!session?.user.id,
  });
};

export default useGetProfileQuery;
