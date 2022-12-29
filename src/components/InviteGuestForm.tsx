import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from './ui/Button';
import FormInput from './ui/FormInput';
import Headline from './ui/Headline';

interface Props {
  propertyId: string;
}

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type FormSchema = z.infer<typeof schema>;

const InviteGuestForm: React.FC<Props> = ({ propertyId }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  console.log({ errors });

  const mutation = useMutation({
    mutationFn: async (formData: { email: string }) => {
      try {
        const result = await fetch('/api/invite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            propertyId: propertyId,
          }),
        });

        const body = await result.json();

        if (result.status === 409) {
          // console.log('body.message', body.message);
          setError('singleErrorInput', {
            type: 'custom',
            message: body.error,
          });
        }

        return body;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['guests', propertyId]);
    },
  });

  const onSubmit = async (formData: FormSchema) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <div className="mb-4">
        <Headline level={4}>Invite a guest</Headline>
      </div>

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
            {errors.singleErrorInput && (
              <div className="text-sm text-red-500">
                {errors.singleErrorInput.message}
              </div>
            )}
          </div>
          <Button
            type="submit"
            disabled={mutation.isLoading || isSubmitting}
            loading={mutation.isLoading || isSubmitting}
            fullWidth
          >
            Send invite
          </Button>
        </div>
      </form>
    </>
  );
};

export default InviteGuestForm;
