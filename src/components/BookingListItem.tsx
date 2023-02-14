import * as Avatar from '@radix-ui/react-avatar';
import Link from 'next/link';

import useCancelBookingMutation from '@/hooks/useCancelBookingMutation';

import ReadableDates from './ReadableDates';
import Badge from './ui/Badge';

const ChangeButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Link href="#">
      <a
        onClick={(e) => {
          e.preventDefault();
          alert('Not implemented yet');
        }}
        className="text-indigo-600 hover:text-indigo-900"
      >
        {children}
      </a>
    </Link>
  );
};

const CancelButton = ({
  children,
  bookingId,
  propertyId,
}: {
  children: React.ReactNode;
  bookingId: string;
  propertyId: string;
}) => {
  const mutation = useCancelBookingMutation(bookingId, propertyId);

  return (
    <Link href="#">
      <a
        onClick={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        className="text-red-600 hover:text-red-900"
      >
        {mutation.isLoading || mutation.isSuccess ? 'Loading' : children}
      </a>
    </Link>
  );
};

const BookingListItem = ({
  id,
  guestName,
  guestAvatarUrl,
  propertyId,
  propertyName,
  startDate,
  endDate,
  status,
}: {
  id: string;
  guestName: string;
  guestAvatarUrl: string;
  propertyId: string;
  propertyName: string;
  startDate: string;
  endDate: string;
  status: string;
}) => {
  const isPast = new Date(endDate) < new Date();

  return (
    <div className="block px-4 py-4 hover:bg-gray-50">
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
            </div>
            <div className="flex">
              <div className="mr-2 text-sm text-gray-400">{propertyName}</div>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <ReadableDates startDate={startDate} endDate={endDate} />
            </div>
            {!isPast && status === 'BOOKED' && (
              <div className="mt-3 flex gap-4">
                <ChangeButton>Change</ChangeButton>
                <CancelButton propertyId={propertyId} bookingId={id}>
                  Cancel
                </CancelButton>
              </div>
            )}
            {status === 'CANCELED' && (
              <div className="mt-3 inline-flex">
                <Badge type="danger">CANCELED</Badge>
              </div>
            )}
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default BookingListItem;
