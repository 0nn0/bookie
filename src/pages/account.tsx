import {
  Session,
  User,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';

import AccountForm from '@/components/account/AccountForm';
import AuthLayout from '@/components/layout/AuthLayout';
import Card from '@/components/layout/Card';
import CardContent from '@/components/layout/CardContent';
import SectionHeading from '@/components/layout/SectionHeading';
import PropertyContent from '@/components/property/PropertyContent';
import Container from '@/components/ui/Container';

interface Props {
  user: User;
  initialSession: Session;
}

const Account: NextPage<Props> = ({ user, initialSession }) => {
  return (
    <AuthLayout title="Account">
      <Container>
        <SectionHeading title="Account" />
        <PropertyContent>
          <Card>
            <CardContent>
              <AccountForm session={initialSession} />
            </CardContent>
          </Card>
        </PropertyContent>
      </Container>
    </AuthLayout>
  );
};

export default Account;

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
