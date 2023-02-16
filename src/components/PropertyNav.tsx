import {
  CalendarDaysIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import { Role, RoleId } from '@/pages/api/user';

import Tabs from './Tabs';

const PropertyNav = ({
  propertyId,
  roleId,
}: {
  propertyId: string;
  roleId: RoleId;
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

  if (roleId === Role.OWNER) {
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
    <div className="bottom-nav fixed left-0 bottom-0 z-30 flex w-full border border-t border-gray-200 bg-gray-50 bg-opacity-40 px-1 pb-3 pt-2 shadow backdrop-blur-md ">
      <Tabs items={tabs} />
    </div>
  );
};

export default PropertyNav;
