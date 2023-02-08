import { useRouter } from 'next/router';
import React from 'react';

import Layout from '@/components/Layout';
import useCancelBookingMutation from '@/hooks/useCancelBookingMutation';

const CancelButton = ({
  children,
  bookingId,
}: {
  children: React.ReactNode;
  bookingId: string;
}) => {
  const mutation = useCancelBookingMutation();

  return (
    <button
      className="text-red-600 hover:text-red-900"
      onClick={() => {
        mutation.mutate(bookingId);
      }}
    >
      {mutation.isLoading || mutation.isSuccess ? 'Loading' : children}
    </button>
  );
};

const Booking = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title="Booking">
      <div>Booking {id}</div>{' '}
    </Layout>
  );
};

export default Booking;
