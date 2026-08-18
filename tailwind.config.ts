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
        // Small-print colour. Darkened from #8A7A66, which measured 3.63:1 on
        // porcelain and failed WCAG AA for the 10–14px text it is used on.
        // #756652 clears 4.5:1 on porcelain (4.86), ivory (4.95) and bone (4.59).
        taupe: "#756652",
        umber: "#57462F",
        ink: "#241C12",
        noir: "#181310",
        // `dark` is the text-safe brass. Darkened from #8A6F45, which measured
        // 4.13:1 on porcelain / 3.91 on bone / 3.54 on sand and failed WCAG AA
        // for the 11–20px eyebrows, prices and star rows it is used on.
        // #785E3A clears 4.5:1 on all four light grounds (5.30 / 5.67 / 5.02 /
        // 4.55). DEFAULT and `light` stay as-is: they are for rules, borders and
        // light-on-noir text, never small text on a light ground.
        // DEFAULT matches the fountain in the logo artwork exactly (#AC8D6B) so
        // the mark and the UI accent are the same metal. `dark` is the
        // text-safe brass — darkened from #8A6F45, which measured 4.13:1 on
        // porcelain / 3.91 on bone / 3.54 on sand and failed WCAG AA for the
        // 11–20px eyebrows, prices and star rows it is used on. #785E3A clears
        // 4.5:1 on all four light grounds (5.30 / 5.67 / 5.02 / 4.55).
        // DEFAULT and `light` are for rules, the mark, and light-on-noir text —
        // never small text on a light ground.
        brass: { DEFAULT: "#AC8D6B", light: "#C9AE7E", dark: "#785E3A" },
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "Georgia", "Times New Roman", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
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
