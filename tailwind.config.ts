import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#b794f6',
          500: '#9b7bd5',
          600: '#805ac3',
          700: '#6b46a8',
          800: '#5a3d8a',
          900: '#4a3270',
          950: '#3b0764',
        },
      },
    },
  },
  plugins: [],
};

export default config;
