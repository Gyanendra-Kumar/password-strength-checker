/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: "Poppins",
      },
      colors: {
        "dark-blue": "#0a1930",
        "light-blue": "#1f93ff",
        "color-orange": "#ff7722",
        "color-success": "#28a745",
        "color-primary": "#007bff",
        "color-danger": "",
        orangeRed: "#FF4500",
      },
      boxShadow: {
        "3xl": "0 5px 15px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
