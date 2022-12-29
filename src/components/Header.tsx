import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  const user = useUser();
  return (
    <header className="bg-slate-400">
      <nav>
        <Link href="/">Home</Link> <Link href="/profile">Profile</Link>{' '}
        <Link href="/logout">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;
