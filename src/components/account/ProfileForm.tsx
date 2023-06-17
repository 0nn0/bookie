'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSupabase } from '@/app/supabase-provider';
import Stack from '@/components/layout/Stack';
import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import useUpdateProfileMutation from '@/hooks/useUpdateProfileMutation';

const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
});

type FormSchema = z.infer<typeof schema>;

export default function ProfileForm({
  submitButtonLabel,
  onSuccess,
}: {
  submitButtonLabel: string;
  onSuccess?: () => void;
}) {
  const { session } = useSupabase();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: session?.user.user_metadata.first_name,
      lastName: session?.user.user_metadata.last_name,
    },
  });

  const mutation = useUpdateProfileMutation();

  const submit = async (data: FormSchema) => {
    const { firstName, lastName } = data;

    mutation.mutate(
      {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      },
      {
        onSuccess,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack>
        <div>
          <Label htmlFor="">First name</Label>
          <Input id="firstName" register={register} autoComplete="given-name" />
          <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
        </div>
        <div>
          <Label htmlFor="">Last name</Label>
          <Input id="lastName" register={register} autoComplete="family-name" />
          <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
        </div>
        <div className="mt-2">
          <Button
            type="submit"
            disabled={isSubmitting || mutation.isLoading}
            loading={isSubmitting || mutation.isLoading}
            fullWidth
          >
            {submitButtonLabel}
          </Button>
        </div>
      </Stack>
    </form>
  );
}
