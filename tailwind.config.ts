import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: "#F4EFE7",
        ivory: "#FAF7F1",
        sand: "#E7DECE",
        bone: "#EFE9DC",
        taupe: "#8A7A66",
        umber: "#57462F",
        ink: "#241C12",
        noir: "#181310",
        brass: { DEFAULT: "#A98B5F", light: "#C9AE7E", dark: "#8A6F45" },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-figtree)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        kicker: "0.28em",
        wideish: "0.12em",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      borderRadius: {
        arch: "999px 999px 0 0",
      },
      maxWidth: {
        content: "72rem",
        prose2: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;
