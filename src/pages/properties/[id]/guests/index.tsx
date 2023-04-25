import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { DialogContext } from '@/components/dialog/DialogContext';
import GuestList from '@/components/guests/GuestList';
import InviteGuestForm from '@/components/guests/InviteGuestForm';
import AuthLayout from '@/components/layout/AuthLayout';
import ErrorState from '@/components/layout/ErrorState';
import LoadingState from '@/components/layout/LoadingState';
import SectionHeading from '@/components/layout/SectionHeading';
import PropertyContent from '@/components/property/PropertyContent';
import PropertyNav from '@/components/property/PropertyNav';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { RoleIdByName } from '@/constants/constants';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

const Guests = ({ roleId }: { roleId: string }) => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  const dialogContext = useContext(DialogContext);

  const { isLoading, data, error } = useGetPropertyQuery({
    propertyId,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error instanceof Error) {
    return <ErrorState>{error.message}</ErrorState>;
  }

  function handleInviteGuest() {
    dialogContext?.setDialog(
      <InviteGuestForm
        propertyId={propertyId}
        onSuccess={() => {
          dialogContext.setOpen(false);
        }}
      />
    );

    dialogContext?.setOpen(true);
  }

  return (
    <AuthLayout title={data.name}>
      <Container>
        <PropertyNav propertyId={propertyId} roleId={roleId} />
        <PropertyContent>
          <SectionHeading
            title="Guests"
            action={
              <Button
                onClick={handleInviteGuest}
                className="hidden items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:inline-flex sm:w-auto"
              >
                Invite guest
              </Button>
            }
          />

          <GuestList propertyId={propertyId} />
          <div className="sm:hidden">
            <FloatingActionButton onClick={handleInviteGuest} />
          </div>
        </PropertyContent>
      </Container>
    </AuthLayout>
  );
};

export default Guests;

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

  // check if user is owner of this property
  const { data } = await supabase
    .from('fact_table')
    .select()
    .eq('profile_id', session.user.id)
    .eq('property_id', ctx.params.id)
    .eq('role_id', RoleIdByName.Owner)
    .single();

  if (!data) {
    return {
      notFound: true,
    };
  }

  // get role
  const { data: roleData } = await supabase
    .from('fact_table')
    .select('role_id')
    .eq('profile_id', session.user.id)
    .eq('property_id', ctx.params.id)
    .single();

  if (!roleData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
      roleId: roleData.role_id,
    },
  };
};
