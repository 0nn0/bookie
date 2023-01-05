import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from './ui/Button';
import FormInput from './ui/FormInput';
import Headline from './ui/Headline';

interface Props {
  propertyId: string;
}

const schema = z
  .object({
    startDate: z.string().refine((value) => {
      const date = new Date(value);
      return date.getTime() > new Date().getTime();
    }, 'Start date must be in the future'),
    endDate: z.string().refine((value) => {
      const date = new Date(value);
      return date.getTime() > new Date().getTime();
    }, 'End date must be in the future'),
  })
  .refine(
    ({ startDate, endDate }) => {
      const startDateValue = new Date(startDate);
      const endDateValue = new Date(endDate);
      return endDateValue.getTime() > startDateValue.getTime();
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  );

export type FormSchema = z.infer<typeof schema>;

const BookingForm: React.FC<Props> = ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  console.log({ errors });

  const onSubmit = async (formData: FormSchema) => {
    console.log({ formData });
  };

  return (
    <>
      <div className="mb-4">
        <Headline level={4}>Make a reservation</Headline>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormInput
            label="Start date"
            id="startDate"
            type="date"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <FormInput
            label="End date"
            id="endDate"
            type="date"
            register={register}
            errors={errors}
          />
        </div>
        <br />
        <div>
          <Button
            type="submit"
            // disabled={mutation.isLoading || isSubmitting}
            // loading={mutation.isLoading || isSubmitting}
            fullWidth
          >
            Make reservation
          </Button>
        </div>
      </form>
    </>
  );
};

export default BookingForm;
