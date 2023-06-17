'use client';

import { useState } from 'react';

import VerifyOtpForm from '@/components/auth/components/VerifyOtpForm';

import RequestOtpForm from './components/RequestOtpForm';

export default function LoginForm() {
  const [email, setEmail] = useState<string>();

  if (email) {
    return <VerifyOtpForm email={email} isSignUp={false} />;
  }

  return (
    <RequestOtpForm
      isSignUp={false}
      onSubmitSuccess={(_email: string) => {
        setEmail(_email);
      }}
    />
  );
}
