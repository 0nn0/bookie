import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Header = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/account', label: 'Account' },
  ];
  return (
    <header className="bg-slate-400">
      <nav>
        <ul className="flex items-center justify-between p-4">
          {links.map(({ label, ...rest }) => (
            <li key={label}>
              <Link {...rest}>
                <a className="text-white">{label}</a>
              </Link>
            </li>
          ))}
          <li>
            <Link href="#">
              <a
                className="text-white"
                onClick={(e) => {
                  e.preventDefault();
                  supabaseClient.auth.signOut();
                  router.push('/logout');
                }}
              >
                Logout
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
