import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';

import Layout from '@/components/Layout';
import PropertyForm from '@/components/PropertyForm';
import PropertyList from '@/components/PropertyList';
import Headline from '@/components/ui/Headline';

export default function Home() {
  return (
    <Layout title="Home">
      <Headline level={1}>Properties</Headline>
      <PropertyList />
      <br />
      <br />
      <PropertyForm />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
