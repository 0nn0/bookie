import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import BookingCalendar from '@/components/calendar/BookingCalendar';
import AuthLayout from '@/components/layout/AuthLayout';
import PropertyContent from '@/components/property/PropertyContent';
import PropertyNav from '@/components/property/PropertyNav';
import Container from '@/components/ui/Container';

const CalendarPage = ({ user, roleId }: { user: any; roleId: string }) => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  return (
    <AuthLayout title="Bookings">
      <Container>
        <PropertyNav propertyId={propertyId} roleId={roleId} />
        <PropertyContent>
          <BookingCalendar userId={user.id} propertyId={propertyId} />
        </PropertyContent>
      </Container>
    </AuthLayout>
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
