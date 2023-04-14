import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BookingCalendar from '@/components/BookingCalendar';
import BookingList from '@/components/BookingList';
import Layout from '@/components/Layout';
import PropertyContent from '@/components/PropertyContent';
import PropertyNav from '@/components/PropertyNav';
import SectionHeading from '@/components/SectionHeading';
import TabsInPils from '@/components/TabsInPils';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { RoleIdByName } from '@/constants/constants';

export type CalendarFilter = 'UPCOMING' | 'ALL';

export const CalendarFilters = {
  UPCOMING: 'UPCOMING',
  ALL: 'ALL',
};

const CalendarPage = ({ user, roleId }: { user: any; roleId: string }) => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  const [filter, setFilter] = useState<CalendarFilter>('UPCOMING');

  return (
    <Layout title="Bookings">
      <Container>
        <PropertyNav propertyId={propertyId} roleId={roleId} />
        {/* <PropertyContent>
          <SectionHeading
            title="Bookings"
            action={
              <Button
                href={`/properties/${propertyId}/calendar/new`}
                type="button"
                intent="primary"
              >
                New booking
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
                userId={roleId === RoleIdByName.Guest ? user.id : undefined}
                propertyIds={[propertyId]}
                filter={filter}
              />
            </div>
          </div>
         */}
        <PropertyContent>
          <BookingCalendar
            userId={roleId === RoleIdByName.Guest ? user.id : undefined}
            propertyId={propertyId}
          />
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
    .from('fact_table')
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
