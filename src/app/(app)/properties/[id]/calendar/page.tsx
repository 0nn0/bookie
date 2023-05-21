import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import BookingCalendar from '@/components/calendar/BookingCalendar';
import PropertyLayout from '@/components/layout/PropertyLayout';
import PropertyContent from '@/components/property/PropertyContent';
import Container from '@/components/ui/Container';

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

  return (
    <PropertyLayout propertyId={params.id} roleId={data?.role_id}>
      <Container>
        <PropertyContent>
          <BookingCalendar
            userId={session?.user.id}
            roleId={data?.role_id}
            propertyId={params.id}
          />
        </PropertyContent>
      </Container>
    </PropertyLayout>
  );
}
