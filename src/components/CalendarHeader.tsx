import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useDateFormatter } from '@react-aria/i18n';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useRef } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';

function Button(props) {
  // console.log({ props });
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);
  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`rounded-full p-2 ${props.isDisabled ? 'text-gray-400' : ''} ${
        !props.isDisabled ? 'hover:bg-violet-100 active:bg-violet-200' : ''
      } outline-none ${
        isFocusVisible ? 'ring-2 ring-purple-600 ring-offset-2' : ''
      }`}
    >
      {props.children}
    </button>
  );
}

function CalendarHeader({
  state,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
}) {
  let monthDateFormatter = useDateFormatter({
    month: 'long',
    year: 'numeric',
    timeZone: state.timeZone,
  });

  return (
    <div className="flex items-center py-4">
      {/* Add a screen reader only description of the entire visible range rather than
       * a separate heading above each month grid. This is placed first in the DOM order
       * so that it is the first thing a touch screen reader user encounters.
       * In addition, VoiceOver on iOS does not announce the aria-label of the grid
       * elements, so the aria-label of the Calendar is included here as well. */}
      <VisuallyHidden>
        <h2>{calendarProps['aria-label']}</h2>
      </VisuallyHidden>
      <Button intent="fullRound" {...prevButtonProps}>
        <ChevronLeftIcon className="h-6 w-6" />
      </Button>
      <h2
        // We have a visually hidden heading describing the entire visible range,
        // and the calendar itself describes the individual month
        // so we don't need to repeat that here for screen reader users.
        aria-hidden
        className="align-center flex-1 text-center text-xl font-bold"
      >
        {monthDateFormatter.format(
          state.visibleRange.start.toDate(state.timeZone)
        )}
      </h2>
      {/* <h2
        aria-hidden
        className="align-center flex-1 text-center text-xl font-bold"
      >
        {monthDateFormatter.format(
          state.visibleRange.start.add({ months: 1 }).toDate(state.timeZone)
        )}
      </h2> */}
      <Button intent="fullRound" {...nextButtonProps}>
        <ChevronRightIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}

export default CalendarHeader;
