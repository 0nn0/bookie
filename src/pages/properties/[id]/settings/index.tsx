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
    <Layout title="Settings">
      <Container>
        <PropertyNav propertyId={propertyId} roleId={RoleIdByName.Owner} />

        <PropertyContent>
          <SectionHeading title="Settings" />

          {isLoading && <LoadingState />}

          {isError && (
            <ErrorState>{JSON.stringify(error.message, null, 2)}</ErrorState>
          )}

          {data && (
            <>
              <PropertyDetailsForm
                name={data.name}
                description={data.description}
              />
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
