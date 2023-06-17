import Link from 'next/link';

import Container from '@/components/ui/Container';
import Headline from '@/components/ui/Headline';

export default function Page() {
  console.log('renders server only');
  return (
    <Container>
      <Headline size="h1">
        Effortlessly manage your vacation home with Bookie
      </Headline>
      <p className="mt-6">
        Bookie is a user-friendly platform designed to assist families and
        friends in managing their jointly owned vacation homes. With Bookie, you
        no longer have to worry about manually coordinating who can stay at the
        property and when. Your family and friends can easily make their own
        reservations based on your predetermined configuration, simplifying the
        entire booking process.
      </p>
      <p></p>
      <div className="mt-12">
        <Headline size="h2">Benefits</Headline>
        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          <div>
            <Headline size="h4">Easy scheduling</Headline>
            <p>
              Bookie makes it easy for family and friends to schedule stays at
              the vacation home without a central coordinator.
            </p>
          </div>

          <div>
            <Headline size="h4">Organized reservations</Headline>
            <p>
              Keep track of who has booked the property and when to prevent
              double bookings and ensure everyone has a fair opportunity to use
              it.
            </p>
          </div>

          <div>
            <Headline size="h4">Reduced stress</Headline>
            <p>
              Simplifying the booking process and eliminating the need for a
              central coordinator can help reduce stress and potential
              conflicts.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}