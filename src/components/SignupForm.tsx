import { zodResolver } from '@hookform/resolvers/zod';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from './ui/Button';
import FormInput from './ui/FormInput';

interface Props {}

const SignUpForm: React.FC<Props> = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const schema = z.object({
    email: z.string().email('Please enter a valid email address'),
  });

  type FormSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const submit = async (formData: FormSchema) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
      });

      if (error) {
        console.log({ data, error });
      }

      router.push('/');
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submit)}>
      <div>
        <FormInput
          label="Email address"
          id="email"
          type="email"
          disabled
          register={register}
          errors={errors}
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          fullWidth
        >
          Create account
        </Button>
      </div>
      {/* <div>
        {errorMessage && (
          <div className="text-sm text-red-500">{errorMessage}</div>
        )}
      </div> */}
    </form>
  );
};

export default SignUpForm;
