const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', flowbite.content()],
  plugins: [flowbite.plugin()],
  theme: {
    extend: {
      width: {
        120: '30rem'
      }
    }
  }
};
