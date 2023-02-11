import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import useAddGuestMutation from '@/hooks/useAddGuestMutation';

import Button from './ui/Button';
import FormInput from './ui/FormInput';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type FormSchema = z.infer<typeof schema>;

const InviteGuestForm = ({ propertyId }: { propertyId: string }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const mutation = useAddGuestMutation({ propertyId });

  const onSubmit = async (formData: FormSchema) => {
    mutation.mutate(formData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormInput
          label="Email address"
          id="email"
          type="email"
          register={register}
          errors={errors}
        />
      </div>
      <br />
      <div>
        <div>
          {/* {errors.singleErrorInput && (
              <div className="text-sm text-red-500">
                {errors.singleErrorInput.message}
              </div>
            )} */}
        </div>
        <Button
          type="submit"
          disabled={mutation.isLoading || isSubmitting}
          loading={mutation.isLoading || isSubmitting}
        >
          Send invite
        </Button>
      </div>
    </form>
  );
};

export default InviteGuestForm;
