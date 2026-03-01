/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        node: {
          input: '#10b981',
          output: '#f59e0b',
          control: '#8b5cf6',
          data: '#06b6d4',
        }
      }
    },
  },
  plugins: [],
}
