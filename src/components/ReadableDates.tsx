import { getReadableDates } from '@/lib/date';

const ReadableDates = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const dates = getReadableDates(startDate, endDate);

  return (
    <>
      <time dateTime={startDate}>{dates.readableStartDate}</time>
      {' - '}
      <time dateTime={endDate}>{dates.readableEndDate}</time>
    </>
  );
};

export default ReadableDates;
