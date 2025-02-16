/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      fontFamily: {
        'Cinzel': ["Cinzel", 'serif'],
        'Poppins': ["Poppins", "serif"]
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

