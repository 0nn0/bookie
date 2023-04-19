import { useUser } from '@supabase/auth-helpers-react';
import Head from 'next/head';

import Header from './Header';

type LayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const Layout = ({ title = '', description = '', children }: LayoutProps) => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>{`${title} | Bookie`}</title>
        <meta name="description" content={description} />
      </Head>
      {user && <Header />}
      <main className="pt-24">{children}</main>
    </>
  );
};

export default Layout;
