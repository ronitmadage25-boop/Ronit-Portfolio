import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#050816",
          deep: "#070B1A",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          bright: "#A855F7",
        },
        ink: {
          DEFAULT: "#FFFFFF",
          muted: "#BFC7D5",
        },
      },
      fontFamily: {
        heading: ["var(--font-clash)", "sans-serif"],
        body: ["var(--font-general)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.18), transparent 60%)",
        "fog-gradient":
          "linear-gradient(180deg, #050816 0%, #070B1A 50%, #050816 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
