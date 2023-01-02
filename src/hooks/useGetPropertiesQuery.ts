import type {
  guests_owners as GuestsOwners,
  properties as Properties,
} from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

type QueryData = Pick<GuestsOwners, 'id' | 'role'> & {
  properties: Pick<Properties, 'id' | 'name'>;
};

const useGetPropertiesQuery = () => {
  const fetchProperties = async () => {
    const result = await fetch(`/api/properties`, {
      method: 'GET',
    });

    return await result.json();
  };

  return useQuery<unknown, unknown, QueryData[]>({
    queryKey: ['properties'],
    queryFn: () => fetchProperties(),
  });
};

export default useGetPropertiesQuery;
