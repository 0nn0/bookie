import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps, NextPage } from "next";

const Logout: NextPage = () => {
  return <h1 className="text-3xl font-bold underline">Loading</h1>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("error", error);
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default Logout;
