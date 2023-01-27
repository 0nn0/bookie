import { createCalendar } from '@internationalized/date';
import { useRef } from 'react';
import { useLocale, useRangeCalendar } from 'react-aria';
import { useRangeCalendarState } from 'react-stately';

import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';

function RangeCalendar(props) {
  let { locale } = useLocale();
  let state = useRangeCalendarState({
    ...props,
    // visibleDuration: { months: 2 },
    locale,
    createCalendar,
  });

  let ref = useRef();
  let { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, state, ref);

  return (
    <div {...calendarProps} ref={ref} className="inline-block text-gray-800">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid state={state} />
        {/* <CalendarGrid state={state} offset={{ months: 1 }} /> */}
      </div>
    </div>
  );
}

export default RangeCalendar;
