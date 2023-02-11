import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BookingList from '@/components/BookingList';
import ErrorState from '@/components/ErrorState';
import Layout from '@/components/Layout';
import LoadingState from '@/components/LoadingState';
import PropertyContent from '@/components/PropertyContent';
import PropertyNav from '@/components/PropertyNav';
import SectionHeading from '@/components/SectionHeading';
import TabsInPils from '@/components/TabsInPils';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

export type CalendarFilter = 'UPCOMING' | 'ALL';

const CalendarPage: NextPage = () => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  const [filter, setFilter] = useState<CalendarFilter>('UPCOMING');

  return (
    <Layout title="Bookings">
      <Container>
        <PropertyNav propertyId={propertyId} />
        <PropertyContent>
          <SectionHeading
            title="Bookings"
            action={
              <Button
                href={`/properties/${propertyId}/calendar/new`}
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                New
              </Button>
            }
          />

          <div>
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
                roleId="OWNER"
                propertyId={propertyId}
                filter={filter}
              />
            </div>
          </div>
        </PropertyContent>
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
