import { useUser } from '@supabase/auth-helpers-react';
import Head from 'next/head';

import Header from './Header';

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>{`${title} | Bookie`}</title>
      </Head>
      {user && <Header />}
      <main className="py-8">{children}</main>
    </>
  );
};

export default Layout;
