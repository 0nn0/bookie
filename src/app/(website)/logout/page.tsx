import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log('signOut error', error);
  }

  redirect('/login');
}
