import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import Layout from '@/components/Layout';
import RequestOtpForm from '@/components/RequestOtpForm';
import VerifyOtpForm from '@/components/VerifyOtpForm';

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>();

  return (
    <Layout title="Login">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login to Bookie
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="rounded-lg bg-white py-8 px-4 shadow sm:px-10">
              {email ? (
                <VerifyOtpForm email={email} isSignUp={false} />
              ) : (
                <RequestOtpForm
                  isSignUp={false}
                  onSubmitSuccess={(_email: string) => {
                    setEmail(_email);
                  }}
                />
              )}
            </div>
            <br />
            {!email && (
              <div className="text-center">
                Don&#39;t have an account? Go to{' '}
                <Link href="/signup">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
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
