import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Tabs = ({ items = [] }) => {
  const { asPath } = useRouter();
  return (
    <div className="flex flex-1 border-b border-gray-200">
      <nav className="flex flex-1" aria-label="Tabs">
        {items.map((tab) => {
          const isCurrent = asPath.startsWith(tab.href);
          const { Icon } = tab;

          return (
            <Link key={tab.name} href={tab.href}>
              <a
                className={classNames(
                  isCurrent
                    ? ' text-indigo-600'
                    : 'text-gray-500  hover:text-gray-700',
                  'flex-column flex-1 items-center justify-center whitespace-nowrap py-4 text-sm font-medium'
                )}
                aria-current={isCurrent ? 'page' : undefined}
              >
                <div className="flex justify-center">
                  <Icon />
                </div>
                <div className="flex justify-center">
                  <span>{tab.name}</span>
                </div>
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;
