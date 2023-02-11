import {
  Session,
  User,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';

import AccountDetails from '@/components/AccountDetails';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/ui/Container';

import Layout from '../components/Layout';
import Headline from '../components/ui/Headline';

interface Props {
  user: User;
  initialSession: Session;
}

const Account: NextPage<Props> = ({ user, initialSession }) => {
  console.log({ user });

  return (
    <Layout title="Account">
      <Container>
        <SectionHeading title="Account" />

        <AccountDetails session={initialSession} />
      </Container>
    </Layout>
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
