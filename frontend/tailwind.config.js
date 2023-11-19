/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dyte-blue": "#2160FD",
        "dyte-black": "#111B29",
        "dyte-grey": "#344054",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "plus-jakarta-sans": ["Plus Jakarta Sans", "serif"],
      },
    },
  },
  plugins: [],
};
