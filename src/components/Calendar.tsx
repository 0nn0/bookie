import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import classNames from 'classnames';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isPast,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { Dispatch, SetStateAction } from 'react';

import FloatingActionButton from './FloatingActionButton';
import Spinner from './Spinner';

function checkDateOverlap({
  eventStartDate,
  eventEndDate,
  calendarStartDate,
  calendarEndDate,
}: {
  eventStartDate: Date;
  eventEndDate: Date;
  calendarStartDate: Date;
  calendarEndDate: Date;
}) {
  // Check if the start date of the event is after the end date of the calendar or
  // if the end date of the event is before the start date of the calendar
  if (eventStartDate > calendarEndDate || eventEndDate < calendarStartDate) {
    return false; // No overlap
  }
  return true; // Overlap
}

function createArrayOfWeeks(days) {
  return Array(Math.ceil(days.length / 7))
    .fill(0)
    .map((_, index) => days.slice(index * 7, index * 7 + 7));
}

type CalendarEvent = {
  id: string;
  start_date: string;
  end_date: string;
  first_name: string;
};

function Calendar({
  currentMonth,
  setCurrentMonth,
  events = [],
  isLoading,
}: {
  setCurrentMonth: Dispatch<SetStateAction<string>>;
  currentMonth: string;
  events: CalendarEvent[];
  isLoading: boolean;
}) {
  let firstDayCurrentMonth = parse(currentMonth, 'MM-yyyy', new Date());

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  // Create an array of weeks
  const weeks = createArrayOfWeeks(days);

  const handlePrevMonth = () => {
    let firstDayCurrentMonth = parse(currentMonth, 'MM-yyyy', new Date());
    let firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, 'MM-yyyy'));
  };

  const handleNextMonth = () => {
    let firstDayCurrentMonth = parse(currentMonth, 'MM-yyyy', new Date());
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MM-yyyy'));
  };

  const handleReset = () => {
    setCurrentMonth(format(new Date(), 'MM-yyyy'));
  };

  return (
    <div>
      <header className="flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <div className="flex items-center">
          <h1 className="whitespace-nowrap text-base font-semibold leading-6 text-gray-900">
            {format(firstDayCurrentMonth, 'MMMM yyyy')}
          </h1>
          <div className="ml-4">{isLoading && <Spinner />}</div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              onClick={handlePrevMonth}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
              onClick={handleReset}
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              onClick={handleNextMonth}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="ml-6 hidden h-6 w-px bg-gray-300 sm:block" />
          <button
            type="button"
            className="ml-6 hidden rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:block"
          >
            New booking
          </button>
          <div className="sm:hidden">
            <FloatingActionButton onClick={() => {}} />
          </div>
        </div>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </div>

        <div className="bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          {weeks.map((week, index) => {
            return (
              <div
                key={index}
                className="relative flex border-b border-solid border-b-gray-200"
              >
                {events.map((event, index) => {
                  const eventStartDate = parse(
                    event.start_date,
                    'yyyy-MM-dd',
                    new Date()
                  );

                  const eventEndDate = parse(
                    event.end_date,
                    'yyyy-MM-dd',
                    new Date()
                  );

                  const dateOverlap = checkDateOverlap({
                    eventStartDate,
                    eventEndDate,
                    calendarStartDate: week[0],
                    calendarEndDate: week[6],
                  });

                  if (!dateOverlap) return null;

                  const startColumn =
                    eventStartDate < week[0] ? 1 : eventStartDate.getDay() + 1;

                  const endColumn =
                    eventEndDate > week[6]
                      ? 8
                      : Math.min(eventEndDate.getDay() + 2, 8);

                  return (
                    <div key={event.id} className="absolute z-10 w-full pt-8">
                      <div className="grid grid-cols-7">
                        <button
                          className={classNames(
                            'mx-0.5 mb-px rounded-md bg-pink-50 py-1 text-white hover:bg-pink-100',
                            isPast(eventEndDate) &&
                              'text-pink-300 hover:text-pink-400',
                            !isPast(eventEndDate) && 'text-pink-600',
                            {
                              'col-start-1': startColumn === 1,
                              'col-start-2': startColumn === 2,
                              'col-start-3': startColumn === 3,
                              'col-start-4': startColumn === 4,
                              'col-start-5': startColumn === 5,
                              'col-start-6': startColumn === 6,
                              'col-start-7': startColumn === 7,
                              'col-end-2': endColumn === 2,
                              'col-end-3': endColumn === 3,
                              'col-end-4': endColumn === 4,
                              'col-end-5': endColumn === 5,
                              'col-end-6': endColumn === 6,
                              'col-end-7': endColumn === 7,
                              'col-end-8': endColumn === 8,
                            }
                          )}
                        >
                          <div className="flex items-center">
                            {/* <Avatar
                        size={20}
                        avatarUrl="67ca44d9-e6e9-442e-b0e3-3db579da3760/avatar.jpg"
                      /> */}
                            <div
                              className={classNames(
                                'ml-1 truncate font-semibold '
                              )}
                            >
                              {event.fact_table.profiles.first_name}
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {week.map((date, index) => {
                  return (
                    <div
                      key={index}
                      className={classNames(
                        'h-20 flex-1  border-r-gray-200 bg-white py-1 px-2',
                        {
                          // 'bg-white': isCurrentMonth,
                          // 'bg-gray-100': !isCurrentMonth,
                          'border-r': index !== 6,
                        }
                      )}
                    >
                      <time
                        dateTime={date.toISOString().split('T')[0]}
                        className={classNames(
                          isPast(date) && !isToday(date) && 'text-gray-300',
                          !isPast(date) &&
                            !isToday(date) &&
                            isSameMonth(date, firstDayCurrentMonth) &&
                            'text-gray-800',
                          !isPast(date) &&
                            !isToday(date) &&
                            !isSameMonth(date, firstDayCurrentMonth) &&
                            'text-gray-300',
                          isToday(date) &&
                            '-ml-1 rounded-md bg-gray-700 px-2 py-1 font-semibold text-white'
                        )}
                      >
                        {isSameMonth(date, firstDayCurrentMonth)
                          ? date.getDate()
                          : ''}
                      </time>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;

/*
const datesInMonth = Array(numDaysInMonth)
    .fill(0)
    .map((_, index) => new Date(year, month, index + 1));

  // Determine the day of the week for the first day of the month
  // const firstDayOfWeek = datesInMonth[0].getDay(); // OLD
  let firstDayOfWeek = datesInMonth[0].getDay();
  if (firstDayOfWeek < 0) {
    firstDayOfWeek += 7;
  }

  // Add empty days at the beginning and end of the array to fill out the first and last weeks
  // const prevMonth = new Date(year, month + monthOffset - 1);
  const prevMonth = new Date(year, month - 1);
  const prevMonthNumDays = new Date(
    prevMonth.getFullYear(),
    prevMonth.getMonth() + 1,
    0
  ).getDate();
  const nextMonth = new Date(year, month + 1);
  // const emptyDaysStart = Array((firstDayOfWeek - 1 + 7) % 7)
  const emptyDaysStart = Array((firstDayOfWeek + 7) % 7)
    .fill(0)
    .map(
      (_, index) =>
        new Date(
          prevMonth.getFullYear(),
          prevMonth.getMonth(),
          prevMonthNumDays - (firstDayOfWeek - 1 - index)
        )
    );

  // console.log({ numDaysInMonth, datesInMonth, firstDayOfWeek, emptyDaysStart });
  const emptyDaysEnd = Array(6 - datesInMonth[datesInMonth.length - 1].getDay())
    .fill(0)
    .map(
      (_, index) =>
        new Date(nextMonth.getFullYear(), nextMonth.getMonth(), index + 1)
    );
  const days = emptyDaysStart.concat(datesInMonth, emptyDaysEnd);


// const newMonth = (month + 12) % 12;
  // const newYear = year + Math.floor(month / 12);

  // Render the calendar month

  */
