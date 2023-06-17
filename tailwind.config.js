/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['Inter var', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
