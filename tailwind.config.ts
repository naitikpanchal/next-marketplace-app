import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#06b6d4",
          secondary: "#fde047",
          accent: "#fed7aa",
          neutral: "#282721",
          "base-100": "#fffbf5",
          info: "#93c5fd",
          success: "#4ade80",
          warning: "#ef7000",
          error: "#f30047",
          body:{
            "bg-color": "#374151", // for bg color dark theme
          }
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
