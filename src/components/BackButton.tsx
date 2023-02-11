import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React from 'react';

const BackLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href}>
      <a className="-mx-3 inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
        <ChevronLeftIcon className="-ml-0.5 mr-2 h-4 w-4 text-gray-400" />{' '}
        {children}
      </a>
    </Link>
  );
};

export default BackLink;
