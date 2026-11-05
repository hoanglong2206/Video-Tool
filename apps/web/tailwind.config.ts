import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        studio: {
          bg: "#0B0F17",
          sidebar: "#080B11",
          card: "#121722",
          "card-subtle": "#0F141F",
          border: "#1E2638",
          "border-highlight": "#2E3B54",
          muted: "#8E9BAE",
          accent: "#2563EB",
          "accent-hover": "#3B82F6",
          amber: "#F59E0B",
          emerald: "#10B981",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
