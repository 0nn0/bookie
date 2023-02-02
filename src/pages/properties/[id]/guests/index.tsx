import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import BackLink from '@/components/BackButton';
import GuestList from '@/components/GuestList';
import Layout from '@/components/Layout';
import PropertyHeader from '@/components/PropertyHeader';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

const Guests: NextPage = () => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

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
    <Layout title={data.name}>
      <Container>
        <BackLink href="/">Properties</BackLink>

        <PropertyHeader
          headline={data.name}
          propertyId={propertyId}
          roleId={data.role_id}
        />

        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Guests</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Button
              href={`/properties/${propertyId}/guests/new`}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Invite guest
            </Button>
          </div>
        </div>

        <GuestList propertyId={propertyId} />
      </Container>
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
