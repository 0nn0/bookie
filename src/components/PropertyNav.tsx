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
      name: 'Calendar',
      href: `/properties/${propertyId}/calendar`,
      current: true,
    },
    {
      name: 'Guests',
      href: `/properties/${propertyId}/guests`,
      current: false,
    },
    {
      name: 'Settings',
      href: `/properties/${propertyId}/settings`,
      current: false,
    },
  ];

  return <Tabs items={tabs} />;
};

export default PropertyNav;
