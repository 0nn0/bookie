import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Tabs = ({ items = [] }) => {
  const { asPath } = useRouter();
  return (
    <nav className="flex flex-1 gap-1 pb-2" aria-label="Tabs">
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
                'flex-1 items-center justify-center rounded-lg py-2 text-xs font-normal focus:bg-gray-200'
              )}
              aria-current={isCurrent ? 'page' : undefined}
            >
              <div className="flex justify-center">
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-2 text-center">{tab.name}</div>
            </a>
          </Link>
        );
      })}
    </nav>
  );
};

export default Tabs;
