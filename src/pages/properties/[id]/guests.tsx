import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import GuestList from '@/components/GuestList';
import InviteGuestForm from '@/components/InviteGuestForm';
import Layout from '@/components/Layout';
import PropertyNav from '@/components/PropertyNav';
import Headline from '@/components/ui/Headline';
import useGetOwnedPropertyQuery from '@/hooks/useGetOwnedPropertyQuery';

const Guests = () => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  const { isLoading, data, error } = useGetOwnedPropertyQuery({
    propertyId,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error instanceof Error) {
    return <p>{error.message}</p>;
  }

  return (
    <Layout title={data.name}>
      <div className="mt-4 mb-4">
        <Headline level={1}>{data.name}</Headline>
        <PropertyNav propertyId={propertyId} />
        <br />
      </div>
      <div className="mb-8">
        <GuestList propertyId={propertyId} />
      </div>
      <InviteGuestForm propertyId={propertyId} />
    </Layout>
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

  // check if user is owner of this property
  const { data } = await supabase
    .from('guests_owners')
    .select()
    .eq('profile_id', session.user.id)
    .eq('property_id', ctx.params.id)
    .eq('role_id', 'OWNER')
    .single();

  if (!data) {
    return {
      redirect: {
        destination: `/properties/${ctx.params.id}`,
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
