import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const BreadCrumbs = () => {
  return (
    <div>
      <nav className="sm:hidden" aria-label="Back">
        <a
          href="#"
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ChevronLeftIcon
            className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          Back
        </a>
      </nav>
      <nav className="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div className="flex">
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Properties
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <a
                href="#"
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Guna en Erik
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <a
                href="#"
                aria-current="page"
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Guests
              </a>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumbs;
