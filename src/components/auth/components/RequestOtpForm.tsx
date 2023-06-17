import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSupabase } from '@/app/supabase-provider';
import Stack from '@/components/layout/Stack';
import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';

interface Props {
  onSubmitSuccess: (email: string) => void;
  isSignUp: boolean;
}

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormSchema = z.infer<typeof schema>;

export default function RequestOtpForm({ onSubmitSuccess, isSignUp }: Props) {
  const { supabase } = useSupabase();

  const {
    register,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: FormSchema) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          emailRedirectTo: isSignUp ? '/auth/callback' : undefined,
          shouldCreateUser: isSignUp,
        },
      });

      if (error && error?.status !== 400) {
        return setError('email', {
          type: 'manual',
          message: error.message,
        });
      }

      onSubmitSuccess(formData.email);
    } catch (error: any) {
      if (error.status === 400) {
        // show success message despite error
        // to avoid leaking user emails
        onSubmitSuccess(formData.email);
      } else {
        console.log({ error });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" register={register} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>

        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            fullWidth
          >
            Continue with email
          </Button>
        </div>
      </Stack>
    </form>
  );
}
