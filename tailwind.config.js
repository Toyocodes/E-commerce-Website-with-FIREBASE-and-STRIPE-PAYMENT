/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'card-bg-01': '#fdefe6',
        'card-bg-02': '#d6e5fb',
        'card-bg-03': '#ceebe9',
        'card-bg-04': '#e2f2b2',
        'primary-color': '#0a1d37',
        'hero-bg': '#d6e5fb',
        'small-text-color': '#999',
        'heading-text-color': '#0a1d37',
      },
      fontSize: {
        'heading-fontSize': '2rem',
      },
      screens: {
        xs: '450px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
