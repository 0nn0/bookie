import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import PropertyNav from '@/components/PropertyNav';
import Headline from '@/components/ui/Headline';
import useGetPropertiesQuery from '@/hooks/useGetPropertiesQuery';

const PropertyPage = () => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  const { isLoading, data, error } = useGetPropertiesQuery({
    propertyId,
  });

  const title = data?.name || '';

  return (
    <Layout title={title}>
      {isLoading && <p>Loading...</p>}
      {error instanceof Error && <p>{error.message}</p>}
      {data && (
        <>
          <div className="mt-4 mb-4">
            <Headline level={1}>{data.name}</Headline>
            <PropertyNav propertyId={propertyId} />
          </div>
          <br />
          <p>Calendar coming soon...</p>
        </>
      )}
    </Layout>
  );
};

export default PropertyPage;

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

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
