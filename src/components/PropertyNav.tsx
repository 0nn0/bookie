import {
  CalendarDaysIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import { RoleIdByName } from '@/constants/constants';

import Tabs from './Tabs';

const PropertyNav = ({
  propertyId,
  roleId,
}: {
  propertyId: string;
  roleId: string;
}) => {
  let tabs = [
    {
      name: 'Info',
      href: `/properties/${propertyId}/info`,
      current: true,
      Icon: InformationCircleIcon,
    },
    {
      name: 'Bookings',
      href: `/properties/${propertyId}/calendar`,
      current: true,
      Icon: CalendarDaysIcon,
    },
  ];

  if (roleId === RoleIdByName.Owner) {
    tabs = [
      ...tabs,
      {
        name: 'Guests',
        href: `/properties/${propertyId}/guests`,
        current: false,
        Icon: UserGroupIcon,
      },
      {
        name: 'Settings',
        href: `/properties/${propertyId}/settings`,
        current: false,
        Icon: Cog6ToothIcon,
      },
    ];
  }

  return (
    <div className="z-5 fixed left-0 bottom-0 flex w-full border-t border-gray-200 bg-gray-50 px-1 pb-3 pt-2">
      <div className="mx-auto max-w-5xl flex-1">
        <Tabs items={tabs} />
      </div>
    </div>
  );
};

export default PropertyNav;
