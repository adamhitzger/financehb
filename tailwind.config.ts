import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "sm": "540",
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        'lg': '4px 4px 4px rgba(0, 0, 0, 0.3)',
        'xl': '6px 6px 4px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        primary: {
          DEFAULT: "#ffffff",
          foreground: "#f6f6f6",
        },
        secondary: {
          DEFAULT: "#0A1a49",
        },
        destructive: {
          DEFAULT: "#db1548",
          foreground:  "#db1548",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config