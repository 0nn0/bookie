<h2 align="center">Bookie</h1>
<p align="center">
    Manage your shared holiday home<br />
    <a href="https://bookie-twentytwo.vercel.app/">View app</a>
</p>

---

A small web application that allows you to manage your shared holiday home through a calendar.

It is built with the following technologies:

- [ReactJS](https://react.dev/)
- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) - Used for Postgres database, authentication and file-storage.

## Getting Started

### Prerequisites

- Node.js (version 18.2.0)
- npm

## Development

### Setup

- Run `npm i` to install depencies
- Copy `.example.env` and rename it to `.env`
- Add the various Supabase keys to the `.env` file

### Development mode

- Run `npm run dev` to start the development server, and open [http://localhost:3000](http://localhost:3000) with your browser

### Deployment

The app is hosted on [Vercel](https://vercel.com/). Every commit pushed to the `main` branch will trigger a Production Deployment.

## Dates

Dates in the Postgres database are stored in the the ISO 8601 format (YYYY-MM-DD). There is no time information stored.
When working with dates in the front-end, a date is parsed to a Date object using date-fns.

## Todo

### High priority

- Add ability to change booking dates

### Medium priority

- Add Supabase setup to readme
- Add preview to readme
- Merge PropertyForm (new) and PropertyDetailsForm (update)
- Design list items in Guests (currently placeholder for avatar and empty line for name)
- Create constant for filters
- Remove bookings, avatar image when deleting account
