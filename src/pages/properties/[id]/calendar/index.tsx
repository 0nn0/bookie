import {
  User,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import BookingCalendar from '@/components/calendar/BookingCalendar';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import PropertyLayout from '@/components/layout/PropertyLayout';
import PropertyContent from '@/components/property/PropertyContent';
import Container from '@/components/ui/Container';
import { NextPageWithLayout } from '@/pages/_app';

type Props = {
  user: User;
  roleId: string;
};

const CalendarPage: NextPageWithLayout<Props> = ({ user, roleId }) => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  return (
    <PropertyLayout roleId={roleId}>
      <Container>
        <PropertyContent>
          <BookingCalendar
            userId={user.id}
            roleId={roleId}
            propertyId={propertyId}
          />
        </PropertyContent>
      </Container>
    </PropertyLayout>
  );
};

CalendarPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout title="Calendar">{page}</AuthenticatedLayout>;
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
