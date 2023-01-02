import Link from 'next/link';

const PropertyNav = ({ propertyId }: { propertyId: string }) => {
  return (
    <nav>
      <Link href={`/properties/${propertyId}/`}>Calendar</Link>{' '}
      <Link href={`/properties/${propertyId}/guests`}>Guests</Link>
    </nav>
  );
};

export default PropertyNav;
