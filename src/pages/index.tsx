import { useSession } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Login from "../components/Login";
import Main from "../components/Main";

export default function Home() {
  const session = useSession();

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <>
          <Layout>
            <Header />
            <Main>
              Home
              {/* <Account key={session.user.id} session={session} /> */}
            </Main>
          </Layout>
        </>
      )}
    </>
  );
}
