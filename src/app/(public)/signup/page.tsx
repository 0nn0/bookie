import Link from 'next/link';

import SignupForm from '@/components/auth/SignupForm';
import Headline from '@/components/ui/Headline';
import Text from '@/components/ui/Text';

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Headline size="h1" className="text-center">
            Sign up
          </Headline>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
            <SignupForm />
          </div>
          <br />

          <Text className="text-center">
            Already have an account? Go to{' '}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}
