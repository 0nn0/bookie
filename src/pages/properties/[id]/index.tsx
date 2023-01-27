import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BookingForm from '@/components/BookingForm';
import BookingList from '@/components/BookingList';
import Layout from '@/components/Layout';
import PropertyNav from '@/components/PropertyNav';
import Container from '@/components/ui/Container';
import Headline from '@/components/ui/Headline';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

const PropertyPage = () => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  const [filter, setFilter] = useState<'UPCOMING' | 'CANCELED' | 'ALL'>(
    'UPCOMING'
  );
  const { isLoading, data, error } = useGetPropertyQuery({
    propertyId,
  });

  const title = data?.name || '';

  return (
    <Layout title={title}>
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {isLoading && <p>Loading...</p>}
        {error instanceof Error && <p>{error.message}</p>}
        {data && (
          <>
            <div className="mt-4 mb-4">
              <Headline level={1}>
                {data.name} ({data.role_id})
              </Headline>
              <PropertyNav propertyId={propertyId} roleId={data.role_id} />
            </div>
            <br />

            {data.role_id && (
              <>
                {/* <Headline level={2}>
                {data.role_id === 'OWNER' ? 'All' : 'Your'} Bookings
              </Headline> */}

                {/* {data.role_id === 'OWNER' && (
                <>
                  <button
                    onClick={() => {
                      setFilter('UPCOMING');
                    }}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => {
                      setFilter('CANCELED');
                    }}
                  >
                    Canceled
                  </button>
                  <button
                    onClick={() => {
                      setFilter('ALL');
                    }}
                  >
                    All
                  </button>
                  <BookingList
                    roleId={data.role_id}
                    guestsOwnersId={data.guest_owners_id}
                    propertyId={propertyId}
                    filter={filter}
                  />
                </>
              )} */}

                <BookingForm propertyId={propertyId} />
              </>
            )}
          </>
        )}
      </div>
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
