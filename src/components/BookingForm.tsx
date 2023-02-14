import { zodResolver } from '@hookform/resolvers/zod';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import useAddBookingMutation from '@/hooks/useAddBookingMutation';
import useGetBookingsQuery from '@/hooks/useGetBookingsQuery';
import { Role } from '@/pages/api/user';

import RangeCalendar from './RangeCalendar';
import Button from './ui/Button';
import FormErrorMessage from './ui/FormErrorMessage';

const dateSchema = z.object({
  calendar: z.object({ identifier: z.string() }),
  day: z.number().int().min(1).max(31),
  month: z.number().min(1).max(12),
  year: z.number().min(new Date().getFullYear()),
  era: z.string().optional(),
});

const schema = z
  .object({
    rangeCalendar: z.object(
      {
        start: dateSchema,
        end: dateSchema,
      },
      { required_error: 'Please select a date range' }
    ),
  })
  .refine(
    ({ rangeCalendar }) => {
      const { start, end } = rangeCalendar;
      const startDateValue = new Date(
        `${start.year}-${start.month}-${start.day}`
      );
      const endDateValue = new Date(`${end.year}-${end.month}-${end.day}`);
      return endDateValue.getTime() > startDateValue.getTime();
    },
    {
      message: 'End date must be after start date',
      path: ['rangeCalendar'],
    }
  );

export type FormSchema = z.infer<typeof schema>;

const BookingForm = ({ propertyId }: { propertyId: string }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { isLoading, data, error } = useGetBookingsQuery({
    propertyId,
    guestsOwnersId: '',
    roleId: Role.OWNER,
    filter: 'UPCOMING',
  });

  const {
    control,
    handleSubmit,
    // setValue,
    // getValues,
    // reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const rangeCalendar = watch('rangeCalendar');

  const mutation = useAddBookingMutation({ propertyId });

  const onSubmit = async (formData: FormSchema) => {
    const { start, end } = formData.rangeCalendar;
    const startDate = `${start.year}-${start.month}-${start.day}`;
    const endDate = `${end.year}-${end.month}-${end.day}`;

    let { data, error } = await supabaseClient.rpc('booking_exists', {
      sdate: startDate,
      edate: endDate,
      propid: propertyId,
    });

    if (error) console.log(error);

    if (data?.length === 0) {
      mutation.mutate({
        startDate: startDate,
        endDate: endDate,
      });

      // reset form
      // setValue('rangeCalendar', undefined);
      // reset();

      router.push(`/properties/${propertyId}/calendar`);
    } else {
      window.alert('Booking already exists');
    }
  };

  // let now = today(getLocalTimeZone());
  // let disabledRanges = [
  //   [now, now.add({ days: 5 })],
  //   [now.add({ days: 14 }), now.add({ days: 16 })],
  //   [now.add({ days: 23 }), now.add({ days: 24 })],
  // ];

  const disabledRanges = data?.map((item) => {
    return [parseDate(item.start_date), parseDate(item.end_date)];
  });

  // let { locale } = useLocale();
  const isDateUnavailable = (date: any) => {
    return disabledRanges?.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="rangeCalendar"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RangeCalendar
                aria-label="Trip dates"
                minValue={today(getLocalTimeZone())}
                isDateUnavailable={isDateUnavailable}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        {/* {rangeCalendar?.start && rangeCalendar?.end && (
          <div className="mt-4 text-center">
            <ReadableDates
              startDate={`${rangeCalendar.start.year}-${rangeCalendar.start.month}-${rangeCalendar.start.day}`}
              endDate={`${rangeCalendar.end.year}-${rangeCalendar.end.month}-${rangeCalendar.end.day}`}
            />
          </div>
        )} */}
        {errors?.rangeCalendar && (
          <FormErrorMessage>{errors?.rangeCalendar.message}</FormErrorMessage>
        )}
        <br />
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
    </>
  );
};

export default BookingForm;
