import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import useAddGuestMutation from '@/hooks/useAddGuestMutation';

const schema = z.object({
  name: z.string().min(3, 'Please enter a valid name'),
});

export type FormSchema = z.infer<typeof schema>;

const PropertyForm: React.FC = () => {
  const addGuestMutation = useAddGuestMutation();

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
    addGuestMutation.mutate({ name: formData.name });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormInput label="Name" id="name" register={register} errors={errors} />
      </div>

      <div>
        <Button
          type="submit"
          disabled={addGuestMutation.isLoading || isSubmitting}
          loading={addGuestMutation.isLoading || isSubmitting}
          fullWidth
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
