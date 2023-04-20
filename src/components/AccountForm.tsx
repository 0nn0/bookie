import { zodResolver } from '@hookform/resolvers/zod';
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { STORAGE_BUCKET } from '@/constants/constants';
import useGetProfileQuery from '@/hooks/useGetProfileQuery';
import useUpdateProfileMutation from '@/hooks/useUpdateProfileMutation';
import { Database } from '@/lib/database.types';

import AvatarInput from './AvatarInput';
import DeleteAccountButton from './DeleteAccountButton';
import Button from './ui/Button';
import FormInput from './ui/FormInput';

interface Props {
  session: Session;
}

const AccountForm = ({ session }: Props) => {
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const userId = session.user.id;
  const schema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    avatarFile: z.custom<File>(),
  });

  type FormSchema = z.infer<typeof schema>;

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const { isLoading, data } = useGetProfileQuery();

  useEffect(() => {
    if (data) {
      reset({
        firstName: data.first_name,
        lastName: data.last_name,
        avatarFile: undefined,
      });
    }
  }, [data, reset]);

  const mutation = useUpdateProfileMutation();

  async function uploadFile(
    filePath: string,
    file: File,
    fileName: string,
    fileExt?: string
  ) {
    try {
      let { data, error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  }

  const submit = async (data: FormSchema) => {
    const { firstName, lastName, avatarFile } = data;
    let props = {};

    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `avatar.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      await uploadFile(filePath, avatarFile, fileName, fileExt);

      props = { avatar_url: filePath };
    }

    mutation.mutate(
      {
        first_name: firstName,
        last_name: lastName,
        ...props,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['profile']);
        },
      }
    );
  };

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
              value={session.user.email}
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
          <div>
            <AvatarInput
              url={`${data?.avatar_url}?${data?.updated_at}`}
              onUpload={(file) => {
                setValue('avatarFile', file);
              }}
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
      <h3 className="text-base font-semibold">Delete account</h3>
      <p className="mb-4 text-base text-gray-500">
        No longer want to use this sevice? You can delete your account here.
        This action is not reversible. All information related to this account,
        like any properties that you created, will be deleted permanently.
      </p>
      <DeleteAccountButton />
    </>
  );
};

export default AccountForm;
