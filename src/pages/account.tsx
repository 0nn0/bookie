import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";

export default function AccountPage({ user, initialSession }) {
  console.log({ user });
  const supabase = useSupabaseClient();
  return (
    <div>
      <Account session={initialSession} />
    </div>
  );
}

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
