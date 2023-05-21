'use client';

import Link from 'next/link';
import { useState } from 'react';

import RequestOtpForm from '@/components/auth/RequestOtpForm';
import VerifyOtpForm from '@/components/auth/VerifyOtpForm';

export default function Page() {
  const [email, setEmail] = useState<string>();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="rounded-lg bg-white py-8 px-4 shadow sm:px-10">
            {email ? (
              <VerifyOtpForm email={email} isSignUp={true} />
            ) : (
              <RequestOtpForm
                isSignUp={true}
                onSubmitSuccess={(_email: string) => {
                  setEmail(_email);
                }}
              />
            )}
          </div>
          <br />

          <div className="text-center">
            Already have an account? Go to{' '}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
