import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Tabs = ({ items = [] }) => {
  const { asPath } = useRouter();
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {items.map((tab) => {
          const isCurrent = asPath.startsWith(tab.href);

          return (
            <Link key={tab.name} href={tab.href}>
              <a
                className={classNames(
                  isCurrent
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                )}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {tab.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;
