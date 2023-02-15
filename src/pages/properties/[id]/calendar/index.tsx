import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BookingList from '@/components/BookingList';
import Layout from '@/components/Layout';
import PropertyContent from '@/components/PropertyContent';
import PropertyNav from '@/components/PropertyNav';
import SectionHeading from '@/components/SectionHeading';
import TabsInPils from '@/components/TabsInPils';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { Role, RoleId } from '@/pages/api/user';

export type CalendarFilter = 'UPCOMING' | 'ALL';

export const CalendarFilters = {
  UPCOMING: 'UPCOMING',
  ALL: 'ALL',
};

const CalendarPage = ({ user, roleId }: { user: any; roleId: RoleId }) => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  const [filter, setFilter] = useState<CalendarFilter>('UPCOMING');

  return (
    <Layout title="Bookings">
      <Container>
        <PropertyNav propertyId={propertyId} roleId={roleId} />
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
                userId={user.id}
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

  if (!ctx.params?.id) {
    return {
      notFound: true,
    };
  }

  // get role
  const { data } = await supabase
    .from('guests_owners')
    .select('id, role_id')
    .eq('profile_id', session.user.id)
    .eq('property_id', ctx.params.id)
    .single();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,

      roleId: data.role_id,
    },
  };
};
