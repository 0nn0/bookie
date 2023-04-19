import { zodResolver } from '@hookform/resolvers/zod';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { StatusIdByName } from '@/constants/constants';
import useAddBookingMutation from '@/hooks/useAddBookingMutation';
import useGetUpcomingBookingsQuery from '@/hooks/useGetUpcomingBookingsQuery';

import DateRangePicker from './DateRangePicker';
import Button from './ui/Button';
import FormErrorMessage from './ui/FormErrorMessage';

const schema = z
  .object({
    rangeCalendar: z.object(
      {
        start: z.date(),
        end: z.date(),
      },
      { required_error: 'Please select a date range' }
    ),
  })
  .refine(
    ({ rangeCalendar }) => {
      return rangeCalendar.end.getTime() > rangeCalendar.start.getTime();
    },
    {
      message: 'End date must be after start date',
      path: ['rangeCalendar'],
    }
  );

export type FormSchema = z.infer<typeof schema>;

const BookingForm = ({
  propertyId,
  startDate,
  endDate,
}: {
  propertyId: string;
  startDate?: Date;
  endDate?: Date;
}) => {
  const supabaseClient = useSupabaseClient();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isLoading, data, error, isError } = useGetUpcomingBookingsQuery({
    propertyId,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      rangeCalendar: {
        start: startDate,
        end: endDate,
      },
    },
  });

  const mutation = useAddBookingMutation({ propertyId });

  const onSubmit = async (formData: FormSchema) => {
    const { start, end } = formData.rangeCalendar;
    const startDate = format(start, 'yyyy-MM-dd');
    const endDate = format(end, 'yyyy-MM-dd');

    let { data, error } = await supabaseClient.rpc('booking_exists', {
      sdate: startDate,
      edate: endDate,
      propid: propertyId,
      statusid: StatusIdByName.Booked,
    });

    if (error) console.log(error);

    if (data?.length === 0) {
      console.log('SUCCESS');

      return;
      mutation.mutate(
        {
          startDate: startDate,
          endDate: endDate,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['bookings', propertyId]);
            router.push(`/properties/${propertyId}/calendar`);
          },
        }
      );

      // reset form
      // setValue('rangeCalendar', undefined);
      // reset();

      router.push(`/properties/${propertyId}/calendar`);
    } else {
      window.alert('Booking already exists');
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Fixed height to avoid jumping UI when switching between months of 4 to 5 weeks */}
      <div className="h-[370px]">
        <Controller
          name="rangeCalendar"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DateRangePicker
              propertyId={propertyId}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div>
        {errors?.rangeCalendar && (
          <FormErrorMessage>{errors?.rangeCalendar.message}</FormErrorMessage>
        )}
      </div>

      <div>
        <Button
          type="submit"
          disabled={mutation.isLoading || isSubmitting}
          loading={mutation.isLoading || isSubmitting}
          fullWidth
        >
          Book
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
