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

- Make work on mobile
- Owner can delete a booking
- Owner can change dates of a booking
- Display bookings in calendar layout
- Remove bookings when deleting account

Nice-to-have

- Suggest guests based on other properties
