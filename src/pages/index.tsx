import { useSession } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import Login from "../components/Login";

export default function Home() {
  const session = useSession();

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Login />
      ) : (
        <>
          <Account key={session.user.id} session={session} />
        </>
      )}
    </div>
  );
}
