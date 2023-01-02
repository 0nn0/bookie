import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import type { Database } from '@/lib/database.types';

import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';
import Headline from './ui/Headline';

const Overview = () => {
  const user = useUser();
  const userId = user?.id;
  const supabase = useSupabaseClient<Database>();

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from('guests_owners')
      .select('id, role, properties(id, name), profiles(email)')
      .eq('profile_id', userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <Headline level={1}>Properties</Headline>

      {data && <PropertyList data={data} />}
      <br />
      <br />
      <PropertyForm />
    </>
  );
};

export default Overview;
