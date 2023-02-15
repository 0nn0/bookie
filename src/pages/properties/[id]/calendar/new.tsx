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
import { Role, RoleId } from '@/pages/api/user';

const New = ({ roleId }: { roleId: RoleId }) => {
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

  if (!ctx.params?.id) {
    return {
      notFound: true,
    };
  }

  // check if user is owner of this property
  const { data } = await supabase
    .from('guests_owners')
    .select()
    .eq('profile_id', session.user.id)
    .eq('property_id', ctx.params.id)
    .eq('role_id', Role.OWNER)
    .single();

  if (!data) {
    return {
      notFound: true,
    };
  }

  // get role
  const { data: roleData } = await supabase
    .from('guests_owners')
    .select('role_id')
    .eq('profile_id', session.user.id)
    .eq('property_id', ctx.params.id)
    .single();

  if (!roleData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
      roleId: roleData.role_id,
    },
  };
};
