import React from 'react';

import useUpdateBookingMutation from '@/hooks/useUpdateBookingMutation';

import BookingForm from './BookingForm';
import { DialogContext } from './DialogContext';
import ReadableDates from './ReadableDates';
import Button from './ui/Button';
import Headline from './ui/Headline';

export default function BookingDetails({
  propertyId,
  bookingId,
  startDate,
  endDate,
}: {
  propertyId: string;
  bookingId: string;
  startDate: Date;
  endDate: Date;
}) {
  const [showForm, setShowForm] = React.useState(false);
  const dialogContext = React.useContext(DialogContext);

  const mutation = useUpdateBookingMutation({
    propertyId,
    bookingId,
  });

  return (
    <div>
      {!showForm && (
        <>
          <Headline level={5}>Booking details</Headline>

          <p>
            Date: <ReadableDates startDate={startDate} endDate={endDate} />
          </p>

          <br />

          <div className="flex gap-4">
            <Button
              fullWidth
              intent="primary"
              onClick={() => {
                setShowForm(true);
              }}
            >
              Change dates
            </Button>
            <Button
              fullWidth
              intent="error"
              onClick={() => {
                window.alert('Not implemented yet');
              }}
            >
              Delete booking
            </Button>
          </div>
        </>
      )}

      {showForm && (
        <BookingForm
          propertyId={propertyId}
          isLoading={mutation.isLoading}
          bookingId={bookingId}
          onSubmit={(formData) => {
            return mutation.mutate(
              {
                startDate: formData.rangeCalendar.start,
                endDate: formData.rangeCalendar.end,
              },
              {
                onSuccess: () => {
                  dialogContext?.setOpen(false);
                },
              }
            );
          }}
          onCancel={() => {
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
