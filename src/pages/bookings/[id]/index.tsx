import { useRouter } from 'next/router';
import React from 'react';

import Card from '@/components/Card';
import ErrorState from '@/components/ErrorState';
import Layout from '@/components/Layout';
import LoadingState from '@/components/LoadingState';
import ReadableDates from '@/components/ReadableDates';
import SectionHeading from '@/components/SectionHeading';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import useCancelBookingMutation from '@/hooks/useCancelBookingMutation';
import useGetBookingQuery from '@/hooks/useGetBookingQuery';

const ChangeButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button intent="primary" onClick={() => {}}>
      {children}
    </Button>
  );
};

const CancelButton = ({
  children,
  bookingId,
}: {
  children: React.ReactNode;
  bookingId: string;
}) => {
  const mutation = useCancelBookingMutation(bookingId);

  return (
    <Button
      intent="error"
      onClick={() => {
        mutation.mutate();
      }}
    >
      {mutation.isLoading || mutation.isSuccess ? 'Loading' : children}
    </Button>
  );
};

const Booking = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, isError } = useGetBookingQuery({
    bookingId: id,
  });

  console.log({ data });

  return (
    <Layout title="Booking">
      <Container>
        <SectionHeading title="Booking" />

        {isLoading && <LoadingState />}
        {isError && <ErrorState>{JSON.stringify(error, null, 2)}</ErrorState>}
        {data && (
          <Card>
            <div className="p-4">
              <div className="font-bold ">{data.properties.name}</div>

              <div className="mb-8 text-sm">
                <ReadableDates
                  startDate={data.start_date}
                  endDate={data.end_date}
                />
              </div>

              {data.status === 'BOOKED' && (
                <div className="flex gap-2">
                  <ChangeButton>Change</ChangeButton>
                  <CancelButton bookingId={id}>Cancel</CancelButton>
                </div>
              )}

              {data.status === 'CANCELED' && (
                <div className="inline-flex">
                  <Badge type="danger">CANCELED</Badge>
                </div>
              )}
            </div>
          </Card>
        )}
      </Container>
    </Layout>
  );
};

export default Booking;
