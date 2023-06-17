import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log('signOut error', error);
  }

  redirect('/login');
}
