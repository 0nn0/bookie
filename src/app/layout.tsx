import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import { DialogProvider } from '@/components/dialog/DialogContext';

import '../styles/globals.css';
import ReactQueryProvider from './react-query-provider';
import SupabaseProvider from './supabase-provider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" className="h-full bg-gray-100">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <body className="h-full">
        <SupabaseProvider session={session}>
          <ReactQueryProvider>
            <DialogProvider>{children}</DialogProvider>
          </ReactQueryProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
