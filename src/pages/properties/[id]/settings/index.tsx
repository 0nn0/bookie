import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import AuthLayout from '@/components/AuthLayout';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import Dialog from '@/components/Dialog';
import { DialogContext } from '@/components/DialogContext';
import ErrorState from '@/components/ErrorState';
import LoadingState from '@/components/LoadingState';
import PropertyContent from '@/components/PropertyContent';
import PropertyDetailsForm from '@/components/PropertyDetailsForm';
import PropertyNav from '@/components/PropertyNav';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { RoleIdByName } from '@/constants/constants';
import useDeletePropertyMutation from '@/hooks/useDeletePropertyMutation';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

const Settings: NextPage = () => {
  const router = useRouter();
  const propertyId = router.query.id as string;

  const { isLoading, data, error, isError } = useGetPropertyQuery({
    propertyId,
  });

  return (
    <AuthLayout title="Settings">
      <Container>
        <PropertyNav propertyId={propertyId} roleId={RoleIdByName.Owner} />

        <PropertyContent>
          <div className="mb-6">
            <SectionHeading title="Settings" />
          </div>
          <Card>
            <CardContent>
              {isLoading && <LoadingState />}

              {isError && (
                <ErrorState>
                  {JSON.stringify(error.message, null, 2)}
                </ErrorState>
              )}

              {data && (
                <>
                  <PropertyDetailsForm name={data.name} />
                  <br />
                  <br />
                  <br />
                  <div className="mt-12 mb-12">
                    <hr />
                  </div>
                  <DeleteButton propertyId={propertyId}>
                    Delete property
                  </DeleteButton>
                </>
              )}
            </CardContent>
          </Card>
        </PropertyContent>
      </Container>
    </AuthLayout>
  );
};

function DeleteButton({
  children,
  propertyId,
}: {
  children: React.ReactNode;
  propertyId: string;
}) {
  const dialogContext = useContext(DialogContext);
  const router = useRouter();
  const mutation = useDeletePropertyMutation({ propertyId });

  const handleClick = () => {
    dialogContext?.setDialog(
      <Dialog
        title="Are you sure?"
        body="This will permanently delete this property including its bookings. This action cannot be undone. "
        confirmButton={{
          label: 'Yes, delete property',
          disabled: mutation.isLoading,
          onClick: () => {
            mutation.mutate(propertyId, {
              onSuccess: () => {
                router.push('/');
              },
            });
          },
        }}
        cancelButton={{
          label: 'No, keep property',
          onClick: () => {
            dialogContext?.setOpen(false);
          },
        }}
      />
    );

    dialogContext?.setOpen(true);
  };

  return (
    <>
      <Button intent="error" onClick={handleClick}>
        {mutation.isLoading || mutation.isSuccess ? 'Loading' : children}
      </Button>
      {mutation.isError && (
        <div className="mt-2 text-sm text-red-600">
          {mutation.error?.message}
        </div>
      )}
    </>
  );
}

export default Settings;

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
      redirect: {
        destination: `/properties/${ctx.params.id}/error`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
