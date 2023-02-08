import Badge from './ui/Badge';

const BookingListItem = ({
  id,
  guestName,
  propertyName,
  startDate,
  endDate,
  status,
}: {
  id: string;
  guestName: string;
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
    <a href={`/bookings/${id}`} className="block px-4 py-4 hover:bg-gray-50">
      <div>
        <div>
          <div className="flex justify-between">
            <div className="inline-flex font-semibold text-gray-700">
              {guestName}
            </div>
            <div>
              <Badge type={status === 'BOOKED' ? 'success' : 'danger'}>
                {status}
              </Badge>
            </div>
          </div>
          <div className="flex">
            <div className="mr-2 text-sm text-gray-400">{propertyName}</div>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            {readableStartDate} - {readableEndDate}
          </div>
        </div>

        <div></div>
      </div>
    </a>
  );
};

export default BookingListItem;
