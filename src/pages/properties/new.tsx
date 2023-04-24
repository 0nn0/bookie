import { NextPage } from 'next';

import AuthLayout from '@/components/AuthLayout';
import BackLink from '@/components/BackLink';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import Layout from '@/components/Layout';
import PropertyForm from '@/components/PropertyForm';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/ui/Container';

const NewProperty: NextPage = () => {
  return (
    <AuthLayout title="Create property">
      <Container>
        <div className="mb-4">
          <BackLink href={`/`}>Back</BackLink>
        </div>
        <SectionHeading title="Add property" />

        <Card>
          <CardContent>
            <PropertyForm />
          </CardContent>
        </Card>
      </Container>
    </AuthLayout>
  );
};

export default NewProperty;
