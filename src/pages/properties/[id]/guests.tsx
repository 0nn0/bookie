import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import GuestList from '@/components/GuestList';
import InviteGuestForm from '@/components/InviteGuestForm';
import Layout from '@/components/Layout';
import PropertyNav from '@/components/PropertyNav';
import Headline from '@/components/ui/Headline';

const Guests = () => {
  const { query } = useRouter();
  const propertyId = query?.id as string;
  const supabase = useSupabaseClient();
  const user = useUser();

  const fetchProperty = async (propertyId: string) => {
    if (!user?.id) throw new Error('User not logged in');

    // check if user is owner or guest of property
    const { data, error } = await supabase
      .from('guests_owners')
      .select()
      .eq('property_id', propertyId)
      .eq('profile_id', user.id)
      .single();

    if (data) {
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (propertyError) {
        throw new Error(propertyError.message);
      }

      return propertyData;
    } else {
      throw new Error('User is not owner or guest of property');
    }
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => fetchProperty(propertyId),
    enabled: !!propertyId,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
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
    .eq('role', 'OWNER')
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
