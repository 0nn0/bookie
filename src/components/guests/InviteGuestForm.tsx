'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import useAddGuestMutation from '@/hooks/useAddGuestMutation';

import Stack from '../layout/Stack';

const schema = z.object({
  firstName: z.string().min(2, 'Please enter a valid first name'),
  lastName: z.string().min(2, 'Please enter a valid last name'),
  email: z.string().email('Please enter a valid email address'),
});

export type FormSchema = z.infer<typeof schema>;

const InviteGuestForm = ({
  propertyId,
  onSuccess,
}: {
  propertyId: string;
  onSuccess: () => void;
}) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const mutation = useAddGuestMutation({ propertyId });

  const onSubmit = async (formData: FormSchema) => {
    mutation.mutate(formData, {
      onSuccess,
      onError: () => {
        setError('email', {
          type: 'manual',
          message:
            'Unforunately something went wrong. If the issue persists, please contact owner.',
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" register={register} />
          <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" register={register} />
          <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" register={register} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>

        <div>
          <Button
            fullWidth
            type="submit"
            disabled={mutation.isLoading || isSubmitting}
            loading={mutation.isLoading || isSubmitting}
          >
            Invite guest
          </Button>
        </div>
      </Stack>
    </form>
  );
};

export default InviteGuestForm;
