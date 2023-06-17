import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import Card from '@/components/layout/Card';
import CardContent from '@/components/layout/CardContent';
import PropertyLayout from '@/components/layout/PropertyLayout';
import SectionHeading from '@/components/layout/SectionHeading';
import DeletePropertyButton from '@/components/property/DeletePropertyButton';
import PropertyContent from '@/components/property/PropertyContent';
import PropertyDetailsFormContainer from '@/components/property/PropertyDetailsFormContainer';
import Container from '@/components/ui/Container';
import Headline from '@/components/ui/Headline';
import Text from '@/components/ui/Text';
import { RoleIdByName } from '@/constants/constants';

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data } = await supabase
    .from('fact_table')
    .select('role_id')
    .eq('profile_id', session?.user.id)
    .eq('property_id', params.id)
    .single();

  if (data?.role_id !== RoleIdByName.Owner) notFound();

  console.log(data);

  return (
    <PropertyLayout propertyId={params.id} roleId={data?.role_id}>
      <Container>
        <PropertyContent>
          <SectionHeading title="Settings" />

          <Card>
            <CardContent>
              <Headline size="h2" className="mb-3">
                General
              </Headline>

              <PropertyDetailsFormContainer />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Headline size="h2" className="mb-1">
                Danger zone
              </Headline>
              <Text className="mb-8">
                Permanently delete this property and all of its related data.
                This action is not reversible.
              </Text>
              <DeletePropertyButton propertyId={params.id} />
            </CardContent>
          </Card>
        </PropertyContent>
      </Container>
    </PropertyLayout>
  );
}
