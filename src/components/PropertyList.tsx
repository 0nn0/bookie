import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

import useGetPropertiesQuery from '@/hooks/useGetPropertiesQuery';

import Card from './Card';

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
    <Card>
      <ul role="list" className="divide-y divide-gray-200">
        {data.map((item) => {
          const { id, role_id, properties } = item;
          if (properties) {
            return (
              <li key={id}>
                <Link href={`/properties/${properties.id}/calendar`}>
                  <a className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="flex min-w-0 flex-1 items-center">
                        <div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="truncate text-sm font-medium text-indigo-600">
                              {properties.name}
                            </p>
                          </div>

                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-900">
                                {role_id === 'OWNER' ? 'Owner' : 'Guest'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </Card>
  );
};

export default PropertyList;
