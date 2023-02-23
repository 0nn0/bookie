# Bookie

App that allows you to

## Getting Started

- Run `npm i` to install depencies
- Run `npm run dev` to start the development server, and open [http://localhost:3000](http://localhost:3000) with your browser
- You need to re-run the `prisma generate` command after every change that's made to your Prisma schema to update the generated Prisma Client code.

## Todo

High priority

- [ ] Fix invalidate keys propertyId vs propertyIds vs with filter etc.
- [ ] Add ability to change booking dates

Medium priority

- [ ] Merge PropertyForm (new) and PropertyDetailsForm (update)
- [ ] Design list items in Guests (currently placeholder for avatar and empty line for name)
- [ ] Create constant for filters
- [ ] Remove bookings, avatar image when deleting account
