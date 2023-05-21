import { RoleIdByName } from '@/constants/constants';

import PropertyNav from '../property/PropertyNav';

type LayoutProps = {
  children: React.ReactNode;
  roleId: string;
  propertyId: string;
};

const PropertyLayout = ({ children, roleId, propertyId }: LayoutProps) => {
  return (
    <>
      {roleId === RoleIdByName.Owner && <PropertyNav propertyId={propertyId} />}
      {children}
    </>
  );
};

export default PropertyLayout;
