import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import GuestsDetails from '@/components/guests/guests-details';
import PropertyLayout from '@/components/layout/PropertyLayout';
import PropertyContent from '@/components/property/PropertyContent';
import Container from '@/components/ui/Container';
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

  const propertyId = params?.id;

  return (
    <PropertyLayout propertyId={params.id} roleId={data?.role_id}>
      <Container>
        <PropertyContent>
          <GuestsDetails propertyId={propertyId} />
        </PropertyContent>
      </Container>
    </PropertyLayout>
  );
}
