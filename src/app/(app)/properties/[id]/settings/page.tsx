import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import Card from '@/components/layout/Card';
import CardContent from '@/components/layout/CardContent';
import PropertyLayout from '@/components/layout/PropertyLayout';
import SectionHeading from '@/components/layout/SectionHeading';
import PropertyContent from '@/components/property/PropertyContent';
import Container from '@/components/ui/Container';
import { RoleIdByName } from '@/constants/constants';

import PropertyDetails from './property-details';

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createServerComponentSupabaseClient({
    headers,
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

  return (
    <PropertyLayout propertyId={params.id} roleId={data?.role_id}>
      <Container>
        <PropertyContent>
          <div className="mb-6">
            <SectionHeading title="Settings" />
          </div>
          <Card>
            <CardContent>
              <PropertyDetails propertyId={params.id} />
            </CardContent>
          </Card>
        </PropertyContent>
      </Container>
    </PropertyLayout>
  );
}
