import type { properties as Properties } from '@prisma/client';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

import useGetPropertiesQuery from '@/hooks/useGetPropertiesQuery';

const DeleteButton: React.FC<{
  children: React.ReactNode;
  propertyId: string;
}> = ({ children, propertyId }) => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (propertyId: string) => {
      if (!user?.id) throw new Error('User not logged in');

      // check if user is owner
      const { data, error } = await supabase
        .from('guests_owners')
        .select()
        .eq('property_id', propertyId)
        .eq('profile_id', user.id)
        .eq('role', 'OWNER');

      if (data && data.length > 0) {
        // delete all guests_owners records for this property
        const { data, error } = await supabase
          .from('guests_owners')
          .delete()
          .eq('property_id', propertyId);

        if (error) {
          throw new Error(error.message);
        }

        // delete property
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .delete()
          .eq('id', propertyId);

        return propertyData;
      }

      throw new Error('User is not owner');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <button
        onClick={() => {
          mutation.mutate(propertyId);
        }}
      >
        {mutation.isLoading || mutation.isSuccess ? 'Loading' : children}
      </button>
      {mutation.isError && <div>You are not the owner</div>}
    </>
  );
};

const PropertyList = () => {
  const { isLoading, data, error } = useGetPropertiesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No properties listed</div>;
  }

  return (
    <table border={1} cellPadding={10}>
      <thead>
        <tr>
          <th>Name of property</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const { id, role, properties } = item;
          if (properties) {
            return (
              <tr key={id}>
                <td>
                  <Link href={`/properties/${properties.id}`}>
                    <a className="text-blue-600">{properties.name}</a>
                  </Link>
                </td>
                <td>{role}</td>
                <td>
                  {role === 'OWNER' && (
                    <DeleteButton propertyId={properties.id}>
                      Delete
                    </DeleteButton>
                  )}
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default PropertyList;
