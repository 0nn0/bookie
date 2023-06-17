'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import useAddPropertyMutation from '@/hooks/useAddPropertyMutation';

import Stack from '../layout/Stack';

const schema = z.object({
  name: z.string().min(3, 'Please enter a valid name'),
});

export type FormSchema = z.infer<typeof schema>;

const PropertyForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const addPropertyMutation = useAddPropertyMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (formData: FormSchema) => {
    addPropertyMutation.mutate(
      {
        name: formData.name,
      },
      {
        onSuccess,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" register={register} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <Button
            type="submit"
            fullWidth
            disabled={addPropertyMutation.isLoading || isSubmitting}
            loading={addPropertyMutation.isLoading || isSubmitting}
          >
            Add
          </Button>
        </div>
      </Stack>
    </form>
  );
};

export default PropertyForm;
