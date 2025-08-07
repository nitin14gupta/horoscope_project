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
         * Horoscope Mystical Theme – Dark Purple & Gold
         */
        primary: "#BB86FC", // mystical purple
        secondary: "#FFD700", // golden accent
        tertiary: "#FF5252", // error/warning red
        charcoal: "#0D0D0D", // pure dark background
        muted: "#CCCCCC", // soft gray text
        hover: "#1F1F1F", // button hover state
        textMain: "#FFFFFF", // main text
        textSoft: "#CCCCCC", // soft text
      },

      /**
       * Expose CSS variable driven font families so we can swap fonts via next/font
       */
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
      },

      /**
       * Utility shadows for mystical glow effects
       */
      dropShadow: {
        mystical: "0 0 8px #BB86FC, 0 0 16px #BB86FC",
        golden: "0 0 8px #FFD700, 0 0 16px #FFD700",
      },

      /**
       * Custom gradients for mystical backgrounds
       */
      backgroundImage: {
        'mystical-gradient': 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
        'purple-glow': 'radial-gradient(circle at 50% 50%, rgba(187, 134, 252, 0.15), transparent 70%)',
        'golden-glow': 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.15), transparent 70%)',
      },
    },
  },
  plugins: [scrollbar],
} satisfies Config;
