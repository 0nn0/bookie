import { CalendarDays, Home, Settings, Users } from 'lucide-react';

import Tabs from './Tabs';

const PropertyNav = ({
  propertyId,
  roleId,
}: {
  propertyId: string;
  roleId: 'OWNER' | 'GUEST';
}) => {
  const tabs = [
    {
      name: 'General',
      href: `/properties/${propertyId}/general`,
      current: true,
      Icon: Home,
    },
    {
      name: 'Bookings',
      href: `/properties/${propertyId}/calendar`,
      current: true,
      Icon: CalendarDays,
    },
    {
      name: 'Guests',
      href: `/properties/${propertyId}/guests`,
      current: false,
      Icon: Users,
    },
    {
      name: 'Settings',
      href: `/properties/${propertyId}/settings`,
      current: false,
      Icon: Settings,
    },
  ];

  return (
    <div className="bottom-nav fixed left-0 bottom-0 z-30 flex w-full border border-t border-gray-200 bg-gray-50 bg-opacity-40 px-1 shadow backdrop-blur-md md:hidden">
      <Tabs items={tabs} />
    </div>
  );
};

export default PropertyNav;
