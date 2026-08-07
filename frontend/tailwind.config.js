export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        surface: "#f6f8fb",
        brand: { DEFAULT: "#0f766e", dark: "#115e59", light: "#ccfbf1" },
        warn: "#b45309",
        danger: "#b91c1c",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
