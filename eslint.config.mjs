import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    // These two React Compiler rules flag patterns the motion code uses on
    // purpose: a "latest value" ref written during render so a rAF loop can
    // read the current scroll progress without re-subscribing, and state set
    // once on mount from sessionStorage / matchMedia, which are not readable
    // during SSR. The site does not run the React Compiler, so neither is a
    // correctness bug here. Kept visible as warnings rather than switched off,
    // so new code still hears about them.
    rules: {
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  { ignores: [".next/**", "node_modules/**", "public/**", "next-env.d.ts"] },
];

export default config;
