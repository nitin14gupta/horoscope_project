import type { Config } from "tailwindcss";
import scrollbar from 'tailwind-scrollbar';

export default {
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
        /**
         * JILZO brand palette – Neon Cyber-Club Pastel
         */
        primary: "#FF5FA2", // neon pink
        secondary: "#F2E8F5", // pastel lilac
        tertiary: "#58FFE3", // neon mint/cyan
        honeyLight: "#FFF8D8", // lighter honey top
        honeyMid: "#FFE8A2",
        honeyDeep: "#F6BA54",
        charcoal: "#0A0A0A", // deep charcoal
        muted: "#AAAAAA", // subtle sub-text grey
      },

      /**
       * Expose CSS variable driven font families so we can swap fonts via next/font
       */
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
      },

      /**
       * Utility shadows for neon glow effects
       */
      dropShadow: {
        neon: "0 0 8px #FF5FA2, 0 0 16px #FF5FA2",
      },
    },
  },
  plugins: [scrollbar],
} satisfies Config;
