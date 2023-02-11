import { NextPage } from 'next';
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

const Settings: NextPage = () => {
  const router = useRouter();
  const propertyId = router.query.id as string;

  const { isLoading, data, error, isError } = useGetPropertyQuery({
    propertyId,
  });

  return (
    <Layout title="Settings">
      <Container>
        <PropertyNav propertyId={propertyId} />

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
