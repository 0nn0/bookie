import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';

import Layout from '@/components/Layout';
import PropertyForm from '@/components/PropertyForm';
import PropertyList from '@/components/PropertyList';
import Headline from '@/components/ui/Headline';

export default function Home({ user }) {
  console.log({ user });
  if (!user)
    return (
      <Layout title="Home">
        <Headline level={1}>
          Easily share your holiday home with friends and family
        </Headline>
        <p>
          No more manually planning who can stay when. Family and friends can
          simply make reservations themselves based on your configuration.
        </p>
        <p>
          Bookie helps families manage collectively owned vacation
          property/homes
        </p>
        <Headline level={2}>Features</Headline>
        <ul>
          <li>Shared calendar through which family can manage their booking</li>
          <li>Booking system configurable to your needs</li>
          <li>Support multiple properties per user</li>
        </ul>
      </Layout>
    );

  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <Headline level={1}>Properties</Headline>
        <PropertyList />
        <br />
        <br />
        <PropertyForm />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return { props: {} };
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  // },
  //   };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
