import * as Avatar from '@radix-ui/react-avatar';
import Link from 'next/link';

import Badge from './ui/Badge';

const BookingListItem = ({
  id,
  guestName,
  guestAvatarUrl,
  propertyName,
  startDate,
  endDate,
  status,
}: {
  id: string;
  guestName: string;
  guestAvatarUrl: string;
  propertyName: string;
  startDate: string;
  endDate: string;
  status: string;
}) => {
  const readableStartDate = new Date(startDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  const readableEndDate = new Date(endDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return (
    <Link href={`/bookings/${id}`}>
      <a className="block px-4 py-4 hover:bg-gray-50">
        <div>
          <div className="flex">
            <div className="w-10 pt-1">
              <Avatar.Root>
                <Avatar.Fallback
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-medium leading-none"
                  delayMs={600}
                >
                  OS
                </Avatar.Fallback>
                {guestAvatarUrl && (
                  <Avatar.Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET_NAME}/${guestAvatarUrl}`}
                    className="h-8 w-8 rounded-full"
                    alt="Avatar"
                  />
                )}
              </Avatar.Root>
            </div>
            <div className="flex-1 pl-3">
              <div className="flex  justify-between">
                <div className="inline-flex font-semibold text-gray-700">
                  {guestName}
                </div>
                {status === 'CANCELED' && (
                  <div className="inline-flex">
                    <Badge type="danger">CANCELED</Badge>
                  </div>
                )}
              </div>
              <div className="flex">
                <div className="mr-2 text-sm text-gray-400">{propertyName}</div>
              </div>
              <div className="mt-3 text-sm text-gray-700">
                <time dateTime={startDate}>{readableStartDate}</time> -{' '}
                <time dateTime={endDate}>{readableEndDate}</time>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </a>
    </Link>
  );
};

export default BookingListItem;
