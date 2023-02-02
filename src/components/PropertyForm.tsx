import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import useAddPropertyMutation from '@/hooks/useAddPropertyMutation';

const schema = z.object({
  name: z.string().min(3, 'Please enter a valid name'),
});

export type FormSchema = z.infer<typeof schema>;

const PropertyForm = () => {
  const addPropertyMutation = useAddPropertyMutation();
  const router = useRouter();

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
    addPropertyMutation.mutate({ name: formData.name });

    router.push('/');
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormInput label="Name" id="name" register={register} errors={errors} />
      </div>

      <div>
        <Button
          type="submit"
          disabled={addPropertyMutation.isLoading || isSubmitting}
          loading={addPropertyMutation.isLoading || isSubmitting}
        >
          Create property
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
