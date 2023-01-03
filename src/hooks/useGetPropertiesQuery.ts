import { useQuery } from '@tanstack/react-query';

import { PropertiesByUser } from '@/pages/api/properties';

// type QueryData = Pick<GuestsOwners, 'id' | 'role'> & {
//   properties: Pick<Properties, 'id' | 'name'>;
// };

const useGetPropertiesQuery = () => {
  const fetchProperties = async () => {
    const result = await fetch(`/api/properties`, {
      method: 'GET',
    });

    return await result.json();
  };

  return useQuery<unknown, unknown, PropertiesByUser>({
    queryKey: ['properties'],
    queryFn: () => fetchProperties(),
  });
};

export default useGetPropertiesQuery;
