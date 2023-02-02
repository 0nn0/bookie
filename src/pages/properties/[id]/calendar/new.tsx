import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import BackLink from '@/components/BackButton';
import BookingForm from '@/components/BookingForm';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import Layout from '@/components/Layout';
import Container from '@/components/ui/Container';
import Headline from '@/components/ui/Headline';

const New: NextPage = () => {
  const { query } = useRouter();
  const propertyId = query.id as string;

  return (
    <Layout title="New booking">
      <Container>
        <BackLink href={`/properties/${propertyId}/calendar`}>Back</BackLink>

        <div className="mb-4">
          <Headline level={4}>Make a booking</Headline>
        </div>
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
