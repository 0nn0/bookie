import { zodResolver } from '@hookform/resolvers/zod';
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import useGetProfileQuery from '@/hooks/useGetProfileQuery';
import useUpdateProfileMutation from '@/hooks/useUpdateProfileMutation';
import { Database } from '@/lib/database.types';

import AvatarInput from './AvatarInput';
import DeleteAccountButton from './DeleteAccountButton';
import Button from './ui/Button';
import FormInput from './ui/FormInput';

const STORAGE_BUCKET = 'media';
interface Props {
  session: Session;
}

const AccountDetails = ({ session }: Props) => {
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
          console.log('success');
          // invalidate query
          queryClient.invalidateQueries(['profile']);

          // reset({
          //   firstName,
          //   lastName,
          //   avatarFile: undefined,
          // });
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
          <br />

          <AvatarInput
            url={`${data?.avatar_url}?${data?.updated_at}`}
            onUpload={(file) => {
              setValue('avatarFile', file);
            }}
          />
          <br />
          <div>
            <Button
              type="submit"
              disabled={isSubmitting || mutation.isLoading}
              loading={isSubmitting || mutation.isLoading}
            >
              {isSubmitting ? 'Updating ...' : 'Update'}
            </Button>
          </div>
          <br />
          <br />
          <br />
        </div>
      </form>

      <DeleteAccountButton />
    </>
  );
};

export default AccountDetails;

// async function downloadImage(path: string) {
//   try {
//     const { data, error } = await supabase.storage
//       .from(STORAGE_BUCKET)
//       .download(path);
//     if (error) {
//       throw error;
//     }
//     const url = URL.createObjectURL(data);
//     setAvatarUrl(url);
//   } catch (error) {
//     console.log('Error downloading image: ', error);
//   }
// }

// const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
//   event
// ) => {
//   try {
//     setUploading(true);

//     if (!event.target.files || event.target.files.length === 0) {
//       throw new Error('You must select an image to upload.');
//     }

//     const file = event.target.files[0];
//     const fileExt = file.name.split('.').pop();
//     const fileName = `avatar.${fileExt}`;
//     const filePath = `${uid}/${fileName}`;

//     console.log({ filePath, file, fileExt, fileName });

//     let { error: uploadError } = await supabase.storage
//       .from(STORAGE_BUCKET)
//       .upload(filePath, file, { upsert: true });

//     if (uploadError) {
//       throw uploadError;
//     }

//     onUpload(filePath);
//   } catch (error) {
//     alert('Error uploading avatar!');
//     console.log(error);
//   } finally {
//     setUploading(false);
//   }
// };
