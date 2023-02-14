import {
  CalendarDate,
  getDayOfWeek,
  isSameDay,
  isSameMonth,
} from '@internationalized/date';
import { useRef } from 'react';
import {
  mergeProps,
  useCalendarCell,
  useFocusRing,
  useLocale,
} from 'react-aria';

function CalendarCell({ state, date, currentMonth }) {
  let ref = useRef();
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  let isOutsideMonth = !isSameMonth(currentMonth, date);

  // The start and end date of the selected range will have
  // an emphasized appearance.
  let isSelectionStart = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.start)
    : isSelected;
  let isSelectionEnd = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.end)
    : isSelected;

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  let { locale } = useLocale();
  let dayOfWeek = getDayOfWeek(date, locale);

  let nowDate = new Date();
  let today = new CalendarDate(
    nowDate.getFullYear(),
    nowDate.getMonth() + 1,
    nowDate.getDate()
  );

  let isToday = isSameDay(date, today);

  let isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  let isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date));

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={`relative py-0.5 ${isFocusVisible ? 'z-10' : 'z-0'}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className={`group h-10   outline-none ${
          isRoundedLeft ? 'rounded-l-lg' : ''
        } ${isRoundedRight ? 'rounded-r-lg' : ''} ${
          isSelected ? 'bg-slate-300' : ''
        } ${isDisabled ? 'disabled' : ''}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-lg ${
            isDisabled ? 'text-slate-300 line-through' : ''
          } ${
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible
              ? 'group-focus:z-2 ring-2 ring-slate-600 ring-offset-2'
              : ''
          } ${
            // Darker selection background for the start and end.
            isSelectionStart || isSelectionEnd
              ? 'bg-slate-600 text-white hover:bg-slate-700'
              : ''
          } ${
            // Hover state for cells in the middle of the range.
            isSelected && !(isSelectionStart || isSelectionEnd)
              ? 'hover:bg-slate-400'
              : ''
          } ${isToday ? 'font-bold' : ''} ${
            // Hover state for cells in the middle of the range.
            isUnavailable ? 'text-gray-300 line-through' : ''
          } ${
            // Hover state for non-selected cells.
            !isSelected && !isDisabled ? 'hover:bg-slate-200' : ''
          } cursor-default`}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
}

export default CalendarCell;
