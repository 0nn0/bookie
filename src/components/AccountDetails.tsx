import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import useGetProfileQuery from '@/hooks/useGetProfileQuery';
import useUpdateProfileMutation from '@/hooks/useUpdateProfileMutation';

import Avatar from './AvatarInput';
import DeleteAccountButton from './DeleteAccountButton';
import Button from './ui/Button';
import FormInput from './ui/FormInput';

interface Props {
  session: Session;
}

const AccountDetails = ({ session }: Props) => {
  const userId = session.user.id;
  const schema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    avatarUrl: z.string().optional(),
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
        avatarUrl: data.avatar_url,
      });
    }
  }, [data, reset]);

  const mutation = useUpdateProfileMutation();

  const submit = async (data: FormSchema) => {
    const { firstName, lastName, avatarUrl } = data;
    console.log({ data });
    mutation.mutate({
      first_name: firstName,
      last_name: lastName,
      avatar_url: avatarUrl,
    });
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

          <Avatar
            uid={userId}
            url={data?.avatar_url}
            size={64}
            onUpload={(url) => {
              setValue('avatarUrl', url);
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
