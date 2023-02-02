import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import BackLink from '@/components/BackButton';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import Layout from '@/components/Layout';
import PropertyHeader from '@/components/PropertyHeader';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import useDeletePropertyMutation from '@/hooks/useDeletePropertyMutation';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

const Settings: NextPage = () => {
  const router = useRouter();
  const propertyId = router.query.id as string;

  const { isLoading, data, error } = useGetPropertyQuery({
    propertyId,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error instanceof Error) {
    return <p>{error.message}</p>;
  }

  return (
    <Layout title="Settings">
      <Container>
        <BackLink href="/">Properties</BackLink>

        <PropertyHeader
          headline={data.name}
          propertyId={propertyId}
          roleId={data.role_id}
        />
        <Card>
          <CardContent>
            <DeleteButton propertyId={propertyId}>Delete property</DeleteButton>
          </CardContent>
        </Card>
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
