# Bookie

App that allows you to

## Getting Started

- Run `npm i` to install depencies
- Run `npm run dev` to start the development server, and open [http://localhost:3000](http://localhost:3000) with your browser
- You need to re-run the `prisma generate` command after every change that's made to your Prisma schema to update the generated Prisma Client code.

## Todo

High priority

- [ ] Fix invalidate keys propertyId vs propertyIds vs with filter etc.
- [ ] Fix property-nav being on top of dialog
- [ ] Fix side-padding dialog
- [ ] Add ability to change booking dates
- [ ] Return to guests page after successfully submitting invite form

Medium priority

- [ ] Reveal all bookings from Upcoming bookings in overview
- [ ] Merge PropertyForm (new) and PropertyDetailsForm (update)
- [ ] Create constant for filters
- [ ] Remove bookings, avatar image when deleting account
