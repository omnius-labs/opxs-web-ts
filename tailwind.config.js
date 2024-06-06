const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', flowbite.content()],
  plugins: [flowbite.content()],
  theme: {
    extend: {
      width: {
        120: '30rem'
      }
    }
  }
};
