import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { Database } from '@/lib/database.types';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });
  const { data, error } = await supabase.auth.getSession();

  if (!data?.session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/properties/:path*',
};
