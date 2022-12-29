import {
  Session,
  User,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';

import Account from '@/components/Account';

import Layout from '../components/Layout';

interface Props {
  user: User;
  initialSession: Session;
}

const Profile: NextPage<Props> = ({ user, initialSession }) => {
  console.log({ user });

  return (
    <Layout title="Profile">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <header>
                <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  Account
                </h1>
              </header>
              <Account session={initialSession} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

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
