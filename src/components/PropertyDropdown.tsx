import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Home } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';

import useGetPropertiesQuery from '@/hooks/useGetPropertiesQuery';

const PropertyDropdown = () => {
  const router = useRouter();

  const { isLoading, data, error } = useGetPropertiesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // get name of selected property
  const selectedProperty = data.find((item) => {
    const { id, role_id, properties } = item;
    if (properties) {
      return properties.id === router.query.id;
    }
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex" aria-label="Customise options">
          <div className="mr-2 inline-flex">
            <Home />
          </div>{' '}
          {selectedProperty?.properties?.name || 'Overview'}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onSelect={() => {
              router.push(`/`);
            }}
          >
            Overview
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="m-1 h-px bg-gray-200" />

          {data.map((item) => {
            const { id, role_id, properties } = item;
            if (properties) {
              return (
                <DropdownMenu.Item
                  key={id}
                  className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onSelect={() => {
                    router.push(`/properties/${properties.id}/calendar`);
                  }}
                >
                  {properties.name}
                </DropdownMenu.Item>
              );
            }
          })}

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PropertyDropdown;
