-- SELECT * FROM bookings WHERE (start_date, end_date) OVERLAPS (DATE '2023-01-24' - 1, DATE '2023-01-29' + 1)

CREATE OR REPLACE FUNCTION booking_exists(sdate DATE, edate DATE, propid UUID)
  RETURNS TABLE (property_id UUID, start_date DATE, end_date DATE)
  LANGUAGE plpgsql AS
$func$
#variable_conflict use_column
BEGIN
   RETURN QUERY
   SELECT property_id, start_date, end_date FROM bookings WHERE (start_date, end_date) OVERLAPS (sdate - 1, edate + 1) AND property_id=propid;
END
$func$;