import Link from 'next/link';
import React from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'Profile' },
  { href: '/logout', label: 'Logout' },
];

const Header = () => {
  return (
    <header className="bg-slate-400">
      <nav>
        <ul className="flex items-center justify-between p-4">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>
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
