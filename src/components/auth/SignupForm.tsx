'use client';

import { useState } from 'react';

import VerifyOtpForm from '@/components/auth/components/VerifyOtpForm';

import RequestOtpForm from './components/RequestOtpForm';

export default function SignupForm() {
  const [email, setEmail] = useState<string>();

  if (email) {
    return <VerifyOtpForm email={email} isSignUp={true} />;
  }

  return (
    <RequestOtpForm
      isSignUp={true}
      onSubmitSuccess={(_email: string) => {
        setEmail(_email);
      }}
    />
  );
}
