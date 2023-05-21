import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import AccountForm from '@/components/account/AccountForm';
import Card from '@/components/layout/Card';
import CardContent from '@/components/layout/CardContent';
import SectionHeading from '@/components/layout/SectionHeading';
import PropertyContent from '@/components/property/PropertyContent';
import Container from '@/components/ui/Container';

export default async function Page() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  return (
    <Container>
      <SectionHeading title="Account" />
      <PropertyContent>
        <Card>
          <CardContent>
            <AccountForm />
          </CardContent>
        </Card>
      </PropertyContent>
    </Container>
  );
}
