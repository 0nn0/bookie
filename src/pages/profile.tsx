import {
  createServerSupabaseClient,
  Session,
  User,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, NextPage } from "next";
import Account from "../components/Account";
import Header from "../components/Header";
import Layout from "../components/Layout";

interface Props {
  user: User;
  initialSession: Session;
}

const AccountPage: NextPage<Props> = ({ user, initialSession }) => {
  console.log({ user });

  return (
    <Layout>
      <Header />
      <Account session={initialSession} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

export default AccountPage;
