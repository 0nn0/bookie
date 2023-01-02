import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

const useGetPropertiesQuery = () => {
  const fetchProperties = async () => {
    const result = await fetch(`/api/properties`, {
      method: 'GET',
    });

    return await result.json();
  };

  return useQuery({
    queryKey: ['properties'],
    queryFn: () => fetchProperties(),
  });
};

export default useGetPropertiesQuery;
