import { useRouter } from 'next/router';
import React from 'react';

import Layout from '@/components/Layout';
import PropertyContent from '@/components/PropertyContent';
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
        <PropertyContent>
          <SectionHeading title="Info" />
        </PropertyContent>
      </Container>
    </Layout>
  );
};

export default InfoPage;
