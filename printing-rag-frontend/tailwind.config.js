/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#003049",      // deep blue
          secondary: "#1c3a4f",    // slightly lighter blue-teal
          accent: "#6e1c24",       // ruby red
          bg: "#F9FAFB",
          surface: "#FFFFFF",
        },
        text: {
          primary: "#111827",
          secondary: "#6B7280",
        },
        status: {
          success: "#10B981",
          error: "#EF4444",
        },
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};