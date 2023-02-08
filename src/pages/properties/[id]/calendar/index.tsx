import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BackLink from '@/components/BackButton';
import BookingList from '@/components/BookingList';
import Layout from '@/components/Layout';
import PropertyHeader from '@/components/PropertyHeader';
import TabsInPils from '@/components/TabsInPils';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

export type CalendarFilter = 'UPCOMING' | 'ALL';

const CalendarPage: NextPage = () => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  const [filter, setFilter] = useState<CalendarFilter>('UPCOMING');

  const { isLoading, data, error } = useGetPropertyQuery({
    propertyId,
  });

  const title = data?.name || '';

  return (
    <Layout title={title}>
      <Container>
        <BackLink href="/">Properties</BackLink>

        {isLoading && <p>Loading...</p>}
        {error instanceof Error && <p>{error.message}</p>}
        {data && (
          <>
            <PropertyHeader
              headline={data.name}
              propertyId={propertyId}
              roleId={data.role_id}
            />

            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  Bookings
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users in your account including their name,
                  title, email and role.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Button
                  href={`/properties/${propertyId}/calendar/new`}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  New booking
                </Button>
              </div>
            </div>

            {data.role_id === 'OWNER' && (
              <div className="mt-10">
                <TabsInPils
                  onClick={(id: CalendarFilter) => setFilter(id)}
                  items={[
                    {
                      id: 'UPCOMING',
                      name: 'Upcoming',
                      selected: filter === 'UPCOMING',
                    },
                    {
                      id: 'ALL',
                      name: 'All',
                      selected: filter === 'ALL',
                    },
                  ]}
                />
                <div className="mt-4">
                  <BookingList
                    roleId={data.role_id}
                    guestsOwnersId={data.guest_owners_id}
                    propertyId={propertyId}
                    filter={filter}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </Layout>
  );
};

export default CalendarPage;

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
