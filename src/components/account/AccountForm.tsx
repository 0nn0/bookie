'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSupabase } from '@/app/supabase-provider';
import useGetProfileQuery from '@/hooks/useGetProfileQuery';
import useUpdateProfileMutation from '@/hooks/useUpdateProfileMutation';

import { DialogContext } from '../dialog/DialogContext';
import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import Headline from '../ui/Headline';
import DeleteAccountDialog from './DeleteAccountDialog';

const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
});

type FormSchema = z.infer<typeof schema>;

export default function AccountForm() {
  const { session } = useSupabase();
  const dialogContext = useContext(DialogContext);
  const queryClient = useQueryClient();

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const { isLoading, data } = useGetProfileQuery();

  useEffect(() => {
    if (data?.first_name && data?.last_name) {
      reset({
        firstName: data.first_name,
        lastName: data.last_name,
      });
    }
  }, [data?.first_name, data?.last_name, reset]);

  const mutation = useUpdateProfileMutation();

  const submit = async (data: FormSchema) => {
    const { firstName, lastName } = data;

    mutation.mutate(
      {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['profile']);
        },
      }
    );
  };

  function handleDeleteButtonClick() {
    dialogContext?.setDialog(<DeleteAccountDialog />);
    dialogContext?.setOpen(true);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <FormInput
              id="email"
              label="Email address"
              value={session?.user.email}
              register={register}
              errors={errors}
              disabled
            />
          </div>
          <div>
            <FormInput
              id="firstName"
              label="First name"
              register={register}
              errors={errors}
              autoComplete="given-name"
            />
          </div>
          <div>
            <FormInput
              id="lastName"
              label="Last name"
              register={register}
              errors={errors}
              autoComplete="family-name"
            />
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              disabled={isSubmitting || mutation.isLoading}
              loading={isSubmitting || mutation.isLoading}
            >
              {isSubmitting ? 'Updating ...' : 'Update'}
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-12 mb-12">
        <hr />
      </div>
      <Headline level={4} className="font-semibold text-gray-900">
        Danger zone
      </Headline>
      <p className="mt-1 mb-4 text-base text-gray-600">
        No longer want to use this sevice? You can delete your account here.
        This action is not reversible. All information related to this account,
        like any properties that you created, will be deleted permanently.
      </p>
      <Button intent="error" onClick={handleDeleteButtonClick}>
        Delete account
      </Button>
    </>
  );
}
