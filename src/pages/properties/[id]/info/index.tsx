import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import ErrorState from '@/components/ErrorState';
import Layout from '@/components/Layout';
import LoadingState from '@/components/LoadingState';
import PropertyContent from '@/components/PropertyContent';
import PropertyNav from '@/components/PropertyNav';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/ui/Container';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

const InfoPage = ({ roleId }: { roleId: string }) => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  const { isLoading, data, isError, error } = useGetPropertyQuery({
    propertyId,
  });

  return (
    <Layout title="Info">
      <Container>
        <PropertyNav propertyId={propertyId} roleId={roleId} />
        <PropertyContent>
          <SectionHeading title="Info" />
          {isLoading && <LoadingState />}
          {isError && <ErrorState>{error?.message}</ErrorState>}
          {data && <p className="whitespace-pre-line">{data.description}</p>}
        </PropertyContent>
      </Container>
    </Layout>
  );
};

export default InfoPage;

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
    .select('role_id')
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
