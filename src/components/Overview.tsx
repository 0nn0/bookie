import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import PropertyForm, { FormSchema } from './PropertyForm';
import PropertyList from './PropertyList';
import Headline from './ui/Headline';

const Overview = () => {
  const user = useUser();
  const userId = user?.id;
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormSchema) => {
      if (!user?.id) throw new Error('User not logged in');

      const { data, error } = await supabase
        .from('properties')
        .insert([
          {
            name: formData.name,
          },
        ])
        .select('*');

      if (error) {
        throw new Error(error.message);
      }

      if (data && data.length === 0) {
        throw new Error('No data returned');
      }

      const propertyId = data[0].id;

      const { data: dataNewGuestsOwners, error: errorNewGuestsOwners } =
        await supabase.from('guests_owners').insert([
          {
            profile_id: user.id,
            property_id: propertyId,
            role: 'owner',
          },
        ]);

      if (errorNewGuestsOwners) {
        throw new Error(errorNewGuestsOwners.message);
      }

      return dataNewGuestsOwners;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });

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

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  const onSubmit = async (formData: FormSchema) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <Headline level={1}>Properties</Headline>

      {data && <PropertyList data={data} />}
      <br />
      <br />
      <PropertyForm submitDisabled={mutation.isLoading} onSubmit={onSubmit} />
    </>
  );
};

export default Overview;
