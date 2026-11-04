import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // The palette is the brochure's: warm paper, sand panels, cocoa ink,
        // and gold taken from the fountain mark. Token names predate it and
        // are kept so every page inherits the new values.
        //
        // Contrast, measured: taupe #6E6052 is 5.46:1 on porcelain, 4.92 on
        // sand, 5.73 on ivory. umber #5E5044 is 6.97 / 6.28. ink 12.79 / 11.53.
        porcelain: "#F7F2EC", // paper — the page
        ivory: "#FBF8F3", // card
        sand: "#EFE6DA", // panels
        bone: "#EFE6DA",
        taupe: "#6E6052", // small text
        umber: "#5E5044", // body text
        ink: "#35281F", // cocoa — headings, rules, the booking bar
        noir: "#35281F",
        line: { DEFAULT: "#DDD0BE", soft: "#E4D9C9", sand: "#CDBDA6", dots: "#B5A38A" },
        // `dark` is the only gold for text on a light ground (#7E6440 measured
        // 4.49:1 on sand and failed). DEFAULT is for marks and rules; `light`
        // is for text on cocoa.
        brass: { DEFAULT: "#AC8D5F", light: "#CDB898", dark: "#785E3A" },
      },
      fontFamily: {
        // Gilda Display: headings, names and prices. Marcellus: the logotype
        // and section numbers only. Jost: everything else.
        display: ["var(--font-gilda)", "Georgia", "Times New Roman", "serif"],
        mark: ["var(--font-marcellus)", "Georgia", "serif"],
        body: ["var(--font-jost)", "system-ui", "sans-serif"],
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
        content: "74rem",
        prose2: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;
