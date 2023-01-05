import Link from 'next/link';
import React from 'react';

import useDeletePropertyMutation from '@/hooks/useDeletePropertyMutation';
import useGetPropertiesQuery from '@/hooks/useGetPropertiesQuery';

const DeleteButton: React.FC<{
  children: React.ReactNode;
  propertyId: string;
}> = ({ children, propertyId }) => {
  const mutation = useDeletePropertyMutation({ propertyId });

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
          const { id, role_id, properties } = item;
          if (properties) {
            return (
              <tr key={id}>
                <td>
                  <Link href={`/properties/${properties.id}`}>
                    <a className="text-blue-600">{properties.name}</a>
                  </Link>
                </td>
                <td>{role_id}</td>
                <td>
                  {role_id === 'OWNER' && (
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
