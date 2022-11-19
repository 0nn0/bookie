import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Main from "../components/Main";
import { NextPageWithLayout } from "./_app";

const AccountPage: NextPageWithLayout = ({ user, initialSession }) => {
  console.log({ user });
  const supabase = useSupabaseClient();
  return (
    <Layout>
      <Header />
      <Account session={initialSession} />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  console.log("getServerSideProps", getServerSideProps);
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
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

AccountPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      <Header />
      <Main>{page}</Main>
    </Layout>
  );
};

export default AccountPage;
