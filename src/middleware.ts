import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { Database } from '@/lib/database.types';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const { data, error } = await supabase.auth.getSession();

  console.log('middlware session', data?.session);

  if (error || !data?.session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (
    !data.session.user.user_metadata.first_name ||
    !data.session.user.user_metadata.last_name
  ) {
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/properties/:path*', '/account', '/api/invite', '/api/user'],
};
