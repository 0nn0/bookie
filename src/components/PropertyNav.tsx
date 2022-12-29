import Link from 'next/link';

const PropertyNav = ({ propertyId }) => {
  return (
    <nav>
      <Link href={`/properties/${propertyId}/`}>Calendar</Link>{' '}
      <Link href={`/properties/${propertyId}/guests`}>Guests</Link>
    </nav>
  );
};

export default PropertyNav;
