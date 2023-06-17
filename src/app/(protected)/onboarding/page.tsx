'use client';

import { useRouter } from 'next/navigation';

import ProfileForm from '@/components/account/ProfileForm';

export default function Page() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mb-2 mt-6 text-center text-3xl font-bold text-gray-900">
            Welcome to Bookie
          </h2>
          <p className="text-center">
            First things first, tell us a bit about yourself.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
            <ProfileForm
              submitButtonLabel="Continue"
              onSuccess={() => {
                router.push('/properties');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
