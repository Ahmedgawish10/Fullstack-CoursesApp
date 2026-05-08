import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#08D9D6",
        cde: {
          background: "#f8f9ff",
          surface: "#f8f9ff",
          "on-background": "#0b1c30",
          "on-surface": "#0b1c30",
          "on-surface-variant": "#3d4a42",
          primary: "#006948",
          "on-primary": "#ffffff",
          "primary-container": "#00855d",
          "on-primary-container": "#f5fff7",
          tertiary: "#825100",
          "tertiary-container": "#a36700",
          "on-tertiary-container": "#fffbff",
          "secondary-container": "#dae2fd",
          "on-secondary-container": "#5c647a",
          outline: "#6d7a72",
          "outline-variant": "#bccac0",
          error: "#ba1a1a",
          "surface-container": "#e5eeff",
        },
      },
      spacing: {
        "cde-gutter": "24px",
        "cde-section": "80px",
      },
      fontSize: {
        "cde-display-xl": [
          "2.5rem",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "cde-headline-lg": ["2rem", { lineHeight: "1.3", fontWeight: "700" }],
        "cde-headline-mobile": ["1.5rem", { lineHeight: "1.3", fontWeight: "700" }],
        "cde-title-md": ["1.125rem", { lineHeight: "1.5", fontWeight: "600" }],
        "cde-body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "cde-label-sm": [
          "0.875rem",
          { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" },
        ],
      },
      boxShadow: {
        'bottom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      screens: {
        'custom-md': '700px', // Custom breakpoint at 650px
      },
    },
  },
  plugins: [],
};
export default config;
