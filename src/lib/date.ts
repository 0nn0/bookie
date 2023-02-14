export function getReadableDates(startDate: string, endDate: string) {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // if same month then don't include name of month twice

  // example
  // same month: 25 - 28 jan.
  // different month: 25 jan. - 3 feb. 2021

  const monthOption =
    startDateObj.getMonth() !== endDateObj.getMonth() ? { month: 'short' } : {};

  const readableStartDate = startDateObj.toLocaleDateString('nl-NL', {
    day: 'numeric',
    ...monthOption,
  });

  const readableEndDate = endDateObj.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return {
    readableStartDate,
    readableEndDate,
  };
}
