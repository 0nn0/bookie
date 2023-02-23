import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import BackLink from '@/components/BackButton';
import BookingForm from '@/components/BookingForm';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import Layout from '@/components/Layout';
import PropertyContent from '@/components/PropertyContent';
import PropertyNav from '@/components/PropertyNav';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/ui/Container';

const New = ({ roleId }: { roleId: string }) => {
  const { query } = useRouter();
  const propertyId = query.id as string;

  return (
    <Layout title="New booking">
      <Container>
        <PropertyContent>
          <div className="mb-4">
            <BackLink href={`/properties/${propertyId}/calendar`}>
              Back
            </BackLink>
          </div>
          <PropertyNav propertyId={propertyId} roleId={roleId} />
          <SectionHeading title="New booking" />

          <Card>
            <CardContent>
              <BookingForm propertyId={propertyId} />
            </CardContent>
          </Card>
        </PropertyContent>
      </Container>
    </Layout>
  );
};

export default New;

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
