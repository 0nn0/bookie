import Link from 'next/link';
import { useState } from 'react';

import RequestOtpForm from './RequestOtpForm';
import VerifyOtpForm from './VerifyOtpForm';

const Login = () => {
  const [email, setEmail] = useState<string>();

  return (
    <>
      <Link href="/signup">Sign up</Link>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
