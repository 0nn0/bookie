import { useSession, useUser } from '@supabase/auth-helpers-react';
import Head from 'next/head';

import Header from './Header';

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function Layout({ title, children }: LayoutProps) {
  const session = useSession();

  console.log({ session });
  const user = useUser();

  return (
    <>
      <Head>
        <title>{`${title} | Bookie`}</title>
      </Head>
      {user && <Header />}
      <main>{children}</main>
    </>
  );
}
