import classNames from 'classnames';

export default function CalendarEvent({
  title,
  isPast,
  onClick,
}: {
  title: string;
  isPast: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'mb-px w-full rounded-md bg-pink-50 py-1 text-white ',
        isPast && 'text-pink-300 hover:text-pink-400',
        !isPast && 'text-pink-600 hover:bg-pink-100'
      )}
    >
      <div className="flex items-center">
        <div className={classNames('ml-1 truncate font-semibold ')}>
          {title}
        </div>
      </div>
    </button>
  );
}
