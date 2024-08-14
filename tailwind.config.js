/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        main: [" Roboto, sans-serif"]
      },
      boxShadow: {
        shadow: ["17px 13px 0px 0px  rgb(249 ,115 ,22)"]
      },
    
    },
  },
  plugins: [],
}