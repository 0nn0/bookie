'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSupabase } from '@/app/supabase-provider';
import Stack from '@/components/layout/Stack';
import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';

interface Props {
  email: string;
  isSignUp: boolean;
  // verifyOtpType: 'magiclink' | 'signup';
}

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  otp: z.string().min(6, 'Please enter a valid login code'),
});

type FormSchema = z.infer<typeof schema>;

export default function VerifyOtpForm({ email, isSignUp }: Props) {
  const { supabase } = useSupabase();
  const router = useRouter();

  const {
    register,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
    },
  });

  const submit = async (formData: FormSchema) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: formData.otp,
        type: isSignUp ? 'invite' : 'email',
      });

      if (error) {
        setError('otp', {
          type: 'manual',
          message: 'Login code is incorrect',
        });

        return;
      }

      router.push('/properties');
    } catch (error: any) {
      setError('otp', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" disabled register={register} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>

        <div>
          <p className="text-center text-sm text-gray-600">
            {isSignUp ? (
              <>
                We just sent you a temporary sign up code. <br />
                Please check your inbox and paste the sign up code below.
              </>
            ) : (
              <>
                We just sent you a temporary login code.
                <br />
                Please check your inbox.
              </>
            )}
          </p>
        </div>

        <div>
          <Label htmlFor="otp">
            {isSignUp ? 'Sign up code' : 'Login code'}
          </Label>
          <Input
            id="otp"
            type="text"
            placeholder="Paste the code from your email"
            register={register}
          />
          <ErrorMessage>{errors.otp?.message}</ErrorMessage>
        </div>

        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            fullWidth
          >
            {isSignUp ? 'Create new account' : 'Continue with login code'}
          </Button>
        </div>
      </Stack>
    </form>
  );
}
