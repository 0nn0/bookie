import Head from 'next/head';

type LayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const Layout = ({ title = '', description = '', children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${title} | Bookie`}</title>
        <meta name="description" content={description} />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
