import { ChevronDownIcon } from '@heroicons/react/20/solid';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Home, LayoutList, Menu } from 'lucide-react';
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

  // check if account page
  const isAccountPage = router.pathname === '/account';

  return (
    <DropdownMenu.Root>
      {isAccountPage && (
        <DropdownMenu.Trigger asChild>
          <button
            className="flex w-full items-center justify-center rounded-md  bg-white/40 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            aria-label="Menu"
          >
            <div className="mr-2 inline-flex">
              <Menu />
            </div>{' '}
            Menu
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </DropdownMenu.Trigger>
      )}
      {!isAccountPage && (
        <DropdownMenu.Trigger asChild>
          <button
            className="flex w-full items-center justify-center rounded-md  bg-white/40 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            aria-label="Select property"
          >
            <div className="mr-2 inline-flex">
              {selectedProperty?.properties?.name ? (
                <Home size={18} />
              ) : (
                <LayoutList size={18} />
              )}
            </div>{' '}
            {selectedProperty?.properties?.name || 'Overview'}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </DropdownMenu.Trigger>
      )}

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          sideOffset={5}
          align="start"
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
                    router.push(`/properties/${properties.id}/info`);
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
