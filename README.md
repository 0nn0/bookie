# Bookie

## Getting Started

1. Create project in Supabase
2. Setup structure
3. Run SQL statements so changes in users gets applied to profiles
4. Insert roles `OWNER` and `GUEST` in roles table
5. Change email template to using code

- Run `npm run dev` to start the development server, and open [http://localhost:3000](http://localhost:3000) with your browser
- You need to re-run the `prisma generate` command after every change that's made to your Prisma schema to update the generated Prisma Client code.

## Todo

Must-have

- [ ] Merge PropertyForm (new) and PropertyDetailsForm (update)
- [ ] Fix avatar image
- [ ] Change getBookingsQuery arguments to object
- [ ] Create constant for filters
- [ ] Improve styling of guests list
- [ ] Add ability to change booking dates
- [ ] Improve loading of avatar
- [ ] Remove bookings, avatar image when deleting account
- [ ] Add description to a property

Nice-to-have

- Add upcoming bookings for all properties to overview
- Suggest guests based on other properties
