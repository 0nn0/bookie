import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Header = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/profile', label: 'Profile' },
    {
      href: '/logout',
      // onClick: (e: MouseEvent) => {
      //   e.preventDefault();
      //   supabaseClient.auth.signOut();
      //   router.push('/logout');
      // },
      label: 'Logout',
    },
  ];
  return (
    <header className="bg-slate-400">
      <nav>
        <button
          onClick={() => {
            supabaseClient.auth.signOut();
            router.push('/logout');
          }}
        >
          Logout
        </button>
        <ul className="flex items-center justify-between p-4">
          {links.map(({ label, ...rest }) => (
            <li key={label}>
              <Link {...rest}>
                <a className="text-white">{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
