import { useRouter } from 'next/router';
import React from 'react';

import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/ui/Container';
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
      <Container>
        <SectionHeading title="Booking" />

        <div>ID: {id}</div>
      </Container>
    </Layout>
  );
};

export default Booking;
