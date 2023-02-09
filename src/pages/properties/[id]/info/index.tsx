import { useRouter } from 'next/router';
import React from 'react';

import Layout from '@/components/Layout';
import PropertyNav from '@/components/PropertyNav';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/ui/Container';

const InfoPage = () => {
  const { query } = useRouter();
  const propertyId = query?.id as string;

  return (
    <Layout>
      <Container>
        <PropertyNav propertyId={propertyId} />
        <SectionHeading title="Info" />
      </Container>
    </Layout>
  );
};

export default InfoPage;
