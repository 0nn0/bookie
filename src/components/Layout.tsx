import Head from 'next/head';

import Header from './Header';

type LayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const Layout = ({ title = '', description = '', children }: LayoutProps) => {
  console.log('render Layout');
  return (
    <>
      <Head>
        <title>{`${title} | Bookie`}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <main className="pt-24">{children}</main>
    </>
  );
};

export default Layout;
