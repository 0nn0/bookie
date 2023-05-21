'use client';

import {
  CalendarDaysIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PropertyNav = ({ propertyId }: { propertyId: string }) => {
  const pathname = usePathname();
  const tabs = [
    {
      name: 'Calendar',
      href: `/properties/${propertyId}/calendar`,
      Icon: CalendarDaysIcon,
    },
    {
      name: 'Guests',
      href: `/properties/${propertyId}/guests`,
      Icon: UserGroupIcon,
    },
    {
      name: 'Settings',
      href: `/properties/${propertyId}/settings`,
      Icon: Cog6ToothIcon,
    },
  ];

  return (
    <div className="fixed left-0 bottom-0 z-30 flex w-full border-t border-gray-200 bg-gray-50 px-4 pb-3 pt-2">
      <div className="mx-auto max-w-5xl flex-1">
        <nav className="flex flex-1 gap-1 pb-2" aria-label="Tabs">
          {tabs.map((tab) => {
            const isCurrent = pathname.startsWith(tab.href);
            const { Icon } = tab;

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  'flex-1 items-center justify-center rounded-lg pb-3 pt-1 text-xs font-normal',
                  isCurrent
                    ? ' text-indigo-600'
                    : 'text-gray-500  hover:text-gray-700'
                )}
                aria-current={isCurrent ? 'page' : undefined}
              >
                <div className="flex justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-1 text-center">{tab.name}</div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default PropertyNav;
