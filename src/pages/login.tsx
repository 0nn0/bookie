import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { GetServerSideProps, NextPage } from 'next';

import Layout from '@/components/Layout';
import LoginComponent from '@/components/Login';

const Login: NextPage = () => {
  return (
    <Layout title="Login">
      <LoginComponent />
    </Layout>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
