import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
  content: [
    ...defaultConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        "bg-primary": "var(--bg-primary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "accent-honey": "var(--accent-honey)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        manrope: ["var(--font-manrope)"],
        jetbrains: ["var(--font-jetbrains)"],
        // System font aliases for reliability
        system: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Consolas", "Courier New", "monospace"],
      },
      fontSize: {
        // Modular scale with 1.25 ratio (Major Third)
        xs: ["0.64rem", { lineHeight: "1.7" }], // 10.24px
        sm: ["0.8rem", { lineHeight: "1.7" }], // 12.8px
        base: ["1rem", { lineHeight: "1.7" }], // 16px
        lg: ["1.25rem", { lineHeight: "1.6" }], // 20px
        xl: ["1.563rem", { lineHeight: "1.5" }], // 25px
        "2xl": ["1.953rem", { lineHeight: "1.4" }], // 31.25px
        "3xl": ["2.441rem", { lineHeight: "1.3" }], // 39px
        "4xl": ["3.052rem", { lineHeight: "1.2" }], // 48.8px
        "5xl": ["3.815rem", { lineHeight: "1.1" }], // 61px
        "6xl": ["4.768rem", { lineHeight: "1.05" }], // 76.3px
      },
      spacing: {
        "18": "4.5rem", // 72px
        "22": "5.5rem", // 88px
        "26": "6.5rem", // 104px
        "30": "7.5rem", // 120px
        "34": "8.5rem", // 136px
        "38": "9.5rem", // 152px
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.04em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config
