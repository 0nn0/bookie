import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import Layout from '@/components/Layout';
import PropertyList from '@/components/PropertyList';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/ui/Container';
import Headline from '@/components/ui/Headline';

const Home: NextPage = ({ user }) => {
  if (!user)
    return (
      <Layout title="Home">
        <Container>
          <header className="mb-6">
            <nav>
              <ul className="flex gap-4">
                <li>
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <a>Signup</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <Headline level={1}>
            Easily share your holiday home with friends and family
          </Headline>
          <p>
            Bookie helps families manage collectively owned vacation homes. No
            more manually planning who can stay when. Family and friends can
            simply make reservations themselves based on your configuration.
          </p>
          <p></p>
          <div className="mt-10">
            <Headline level={2}>Features</Headline>
            <div className="">
              <ul className="list-inside list-disc">
                <li>
                  Shared calendar through which you can manage all bookings
                </li>
                <li>Booking system configurable to your needs</li>
                <li>Supports multiple properties</li>
              </ul>
            </div>
          </div>
        </Container>
      </Layout>
    );

  const action = {
    href: '/properties/new',
    label: 'New',
  };

  return (
    <Layout title="Home">
      <Container>
        <div className="mb-6">
          <SectionHeading
            title="Properties"
            action={
              <Link href={action.href}>
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {action.label}
                </button>
              </Link>
            }
          />
        </div>

        <PropertyList />
      </Container>
    </Layout>
  );
};

export default Home;

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
