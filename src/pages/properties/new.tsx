import { NextPage } from 'next';

import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import Layout from '@/components/Layout';
import PropertyForm from '@/components/PropertyForm';
import Container from '@/components/ui/Container';
import Headline from '@/components/ui/Headline';

const NewProperty: NextPage = () => {
  return (
    <Layout title="Create property">
      <Container>
        <div className="mb-8">
          <Headline level={1}>Create property</Headline>
        </div>
        <Card>
          <CardContent>
            <PropertyForm />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default NewProperty;
