import { zodResolver } from '@hookform/resolvers/zod';
import {
  Session,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import DeleteAccountButton from './DeleteAccountButton';
import Button from './ui/Button';
import FormInput from './ui/FormInput';

interface Props {
  session: Session;
}

const Account: React.FC<Props> = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);

  const schema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  });

  type FormSchema = z.infer<typeof schema>;

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    if (user === null) {
      throw new Error('User is null');
    }

    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name, last_name`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        reset({
          firstName: data.first_name,
          lastName: data.last_name,
        });
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const submit = async (data: FormSchema) => {
    console.log('onSubmit', data);

    const { firstName, lastName } = data;

    if (user === null) {
      throw new Error('User is null');
    }

    try {
      setLoading(true);

      const updates = {
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              fullWidth
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

export default Account;
