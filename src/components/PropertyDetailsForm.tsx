import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import useUpdatePropertyMutation from '@/hooks/useUpdatePropertyMutation';

import FormTextArea from './ui/FormTextArea';

const schema = z.object({
  name: z.string().min(3, 'Please enter a valid name'),
  description: z.string().optional(),
});

export type FormSchema = z.infer<typeof schema>;

const PropertyDetailsForm = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  const updatePropertyMutation = useUpdatePropertyMutation({ propertyId });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name,
      description,
    },
  });

  const onSubmit = async (formData: FormSchema) => {
    updatePropertyMutation.mutate({
      name: formData.name,
      description: formData.description,
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormInput label="Name" id="name" register={register} errors={errors} />
      </div>
      <div>
        <FormTextArea
          label="Description"
          id="description"
          register={register}
          errors={errors}
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={updatePropertyMutation.isLoading || isSubmitting}
          loading={updatePropertyMutation.isLoading || isSubmitting}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default PropertyDetailsForm;
