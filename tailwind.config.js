/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Open Sauce One"', 'sans-serif'],
      },
      colors: {
        primary: '#00AA5B',
        second: '#E4EBF5'
      }
    },
  },
  plugins: [],
}

