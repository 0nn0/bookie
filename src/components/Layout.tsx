import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';

import Header from './Header';

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function Layout({ title, children }: LayoutProps) {
  const session = useSession();
  return (
    <>
      <Head>
        <title>{`${title} | Bookie`}</title>
      </Head>
      {session && <Header />}
      <main>{children}</main>
    </>
  );
}
