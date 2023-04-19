import { parse, parseISO } from 'date-fns';

export function getMaxAvailableEndDate(startDate: Date, bookings = []) {
  if (!startDate) return null;
  //   console.log('getMaxAvailableEndDate', { startDate, bookings });
  const result = bookings.reduce((acc, booking) => {
    // console.log('-', booking.start_date, startDate);
    const _isAfter =
      parse(booking.start_date, 'yyyy-MM-dd', new Date()) > startDate;
    const _isBefore = parse(booking.start_date, 'yyyy-MM-dd', new Date()) < acc;

    // console.log({
    //   _isAfter,
    //   _isBefore,
    // });

    if (_isAfter && !_isBefore) {
      return parseISO(booking.start_date);
    } else if (_isAfter && _isBefore) {
      return acc;
    }

    return acc;
  }, null);

  //   console.log({ result });

  return result;
}
