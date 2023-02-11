import { NextPage } from 'next';
import { useRouter } from 'next/router';

import BackLink from '@/components/BackButton';
import BookingForm from '@/components/BookingForm';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/ui/Container';

const New: NextPage = () => {
  const { query } = useRouter();
  const propertyId = query.id as string;

  return (
    <Layout title="New booking">
      <Container>
        <div className="mb-4">
          <BackLink href={`/properties/${propertyId}/calendar`}>Back</BackLink>
        </div>
        <SectionHeading title="New booking" />

        <Card>
          <CardContent>
            <BookingForm propertyId={propertyId} />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default New;
