import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import BookingList from '@/components/BookingList';
import Layout from '@/components/Layout';
import PropertyContent from '@/components/PropertyContent';
import PropertyList from '@/components/PropertyList';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/ui/Container';
import Headline from '@/components/ui/Headline';

const Home = ({ initialSession }: { initialSession: any }) => {
  if (!initialSession?.user)
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
            Effortlessly manage your vacation home with Bookie
          </Headline>
          <p className="mt-6">
            Bookie is a user-friendly platform designed to assist families and
            friends in managing their jointly owned vacation homes. With Bookie,
            you no longer have to worry about manually coordinating who can stay
            at the property and when. Your family and friends can easily make
            their own reservations based on your predetermined configuration,
            simplifying the entire booking process.
          </p>
          <p></p>
          <div className="mt-12">
            <Headline level={2}>Benefits</Headline>
            <div className="mt-6 flex flex-col gap-6 md:flex-row">
              <div>
                <Headline level={5}>Easy scheduling</Headline>
                <p>
                  Bookie makes it easy for family and friends to schedule stays
                  at the vacation home without a central coordinator.
                </p>
              </div>

              <div>
                <Headline level={5}>Organized reservations</Headline>
                <p>
                  Keep track of who has booked the property and when to prevent
                  double bookings and ensure everyone has a fair opportunity to
                  use it.
                </p>
              </div>

              <div>
                <Headline level={5}>Reduced stress</Headline>
                <p>
                  Simplifying the booking process and eliminating the need for a
                  central coordinator can help reduce stress and potential
                  conflicts.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    );

  const action = {
    href: '/properties/new',
    label: 'Add property',
  };

  return (
    <Layout title="Home">
      <Container>
        <PropertyContent>
          <div className="mb-6">
            <SectionHeading title="Upcoming bookings" />
          </div>

          <BookingList userId={initialSession.user.id} filter="UPCOMING" />

          <div className="mt-16 mb-6">
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
        </PropertyContent>
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

  return {
    props: {
      initialSession: session,
    },
  };
};
