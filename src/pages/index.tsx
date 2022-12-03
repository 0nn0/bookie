import { useSession } from "@supabase/auth-helpers-react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import Login from "../components/Login";

export default function Home() {
  const session = useSession();

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <>
          <Layout>
            <Container>Home</Container>
          </Layout>
        </>
      )}
    </>
  );
}
