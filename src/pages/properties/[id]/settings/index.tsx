import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import ErrorState from '@/components/ErrorState';
import Layout from '@/components/Layout';
import LoadingState from '@/components/LoadingState';
import PropertyContent from '@/components/PropertyContent';
import PropertyDetailsForm from '@/components/PropertyDetailsForm';
import PropertyNav from '@/components/PropertyNav';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import useDeletePropertyMutation from '@/hooks/useDeletePropertyMutation';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';
import { Role } from '@/pages/api/user';

const Settings: NextPage = () => {
  const router = useRouter();
  const propertyId = router.query.id as string;

  const { isLoading, data, error, isError } = useGetPropertyQuery({
    propertyId,
  });

  return (
    <Layout title="Settings">
      <Container>
        <PropertyNav propertyId={propertyId} roleId="OWNER" />

        <PropertyContent>
          <SectionHeading title="Settings" />

          {isLoading && <LoadingState />}

          {isError && (
            <ErrorState>{JSON.stringify(error.message, null, 2)}</ErrorState>
          )}

          {data && (
            <>
              <PropertyDetailsForm name={data.name} />
              <br />
              <br />
              <br />
              <br />
              <DeleteButton propertyId={propertyId}>
                Delete property
              </DeleteButton>
            </>
          )}
        </PropertyContent>
      </Container>
    </Layout>
  );
};

function DeleteButton({
  children,
  propertyId,
}: {
  children: React.ReactNode;
  propertyId: string;
}) {
  const router = useRouter();
  const mutation = useDeletePropertyMutation({ propertyId });

  return (
    <>
      <Button
        intent="error"
        onClick={() => {
          mutation.mutate(propertyId, {
            onSuccess: () => {
              router.push('/');
            },
          });
        }}
      >
        {mutation.isLoading || mutation.isSuccess ? 'Loading' : children}
      </Button>
      {mutation.isError && <div>You are not the owner</div>}
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
    .from('guests_owners')
    .select()
    .eq('profile_id', session.user.id)
    .eq('property_id', ctx.params.id)
    .eq('role_id', Role.OWNER)
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
