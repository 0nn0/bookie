'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';
import useUpdatePropertyMutation from '@/hooks/useUpdatePropertyMutation';

import Stack from '../layout/Stack';

const schema = z.object({
  name: z.string().min(3, 'Please enter a valid name'),
});

export type FormSchema = z.infer<typeof schema>;

const PropertyDetailsForm = ({ name }: { name: string }) => {
  const params = useParams();
  const propertyId = params.id;

  const updatePropertyMutation = useUpdatePropertyMutation({ propertyId });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = async (formData: FormSchema) => {
    updatePropertyMutation.mutate({
      name: formData.name,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" register={register} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </div>

        <div>
          <Button
            fullWidth
            type="submit"
            disabled={updatePropertyMutation.isLoading || isSubmitting}
            loading={updatePropertyMutation.isLoading || isSubmitting}
          >
            Update
          </Button>
        </div>
      </Stack>
    </form>
  );
};

export default PropertyDetailsForm;
