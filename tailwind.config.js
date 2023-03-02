/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // 원하는 색 지정하기
      colors: {
        brand: "#ff0000",
      },
    },
  },
  plugins: [],
};
