import Link from 'next/link';

const PropertyNav = ({
  propertyId,
  roleId,
}: {
  propertyId: string;
  roleId: 'OWNER' | 'GUEST';
}) => {
  return (
    <nav>
      <Link href={`/properties/${propertyId}/`}>Calendar</Link>{' '}
      {roleId === 'OWNER' && (
        <Link href={`/properties/${propertyId}/guests`}>Guests</Link>
      )}
    </nav>
  );
};

export default PropertyNav;
