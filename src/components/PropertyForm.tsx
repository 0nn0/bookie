import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';

interface Props {
  onSubmit: (data: any) => void;
  submitDisabled?: boolean;
}

const schema = z.object({
  name: z.string().min(3, 'Please enter a valid name'),
});

export type FormSchema = z.infer<typeof schema>;

const PropertyForm: React.FC<Props> = ({ onSubmit, submitDisabled }) => {
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

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormInput label="Name" id="name" register={register} errors={errors} />
      </div>

      <div>
        <Button
          type="submit"
          disabled={submitDisabled || isSubmitting}
          loading={submitDisabled || isSubmitting}
          fullWidth
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
