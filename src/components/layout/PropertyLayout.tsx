import { RoleIdByName } from '@/constants/constants';

import PropertyNav from '../property/PropertyNav';

type LayoutProps = {
  children: React.ReactNode;
  roleId: string;
};

const PropertyLayout = ({ children, roleId }: LayoutProps) => {
  return (
    <>
      {roleId === RoleIdByName.Owner && <PropertyNav />}
      {children}
    </>
  );
};

export default PropertyLayout;
