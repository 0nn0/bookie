import { PlusIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

function FloatingActionButton({
  onClick,
  takePropertyNavIntoAccount = false,
}: {
  onClick: () => void;
  takePropertyNavIntoAccount: boolean;
}) {
  return (
    <button
      type="button"
      className={classNames(
        'fixed bottom-10 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-xl border border-transparent bg-indigo-600 text-white drop-shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        takePropertyNavIntoAccount && 'bottom-28'
      )}
      onClick={onClick}
    >
      <PlusIcon className="h-5 w-5" />
    </button>
  );
}

export default FloatingActionButton;
