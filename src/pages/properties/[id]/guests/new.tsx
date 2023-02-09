import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import InviteGuestForm from '@/components/InviteGuestForm';
import Layout from '@/components/Layout';
import Container from '@/components/ui/Container';
import Headline from '@/components/ui/Headline';

const New: NextPage = () => {
  const { query } = useRouter();
  const propertyId = query.id as string;

  return (
    <Layout title="Invite guest">
      <Container>
        <div className="mb-4">
          <Headline level={4}>Invite a guest</Headline>
        </div>
        <Card>
          <CardContent>
            <InviteGuestForm propertyId={propertyId} />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default New;
