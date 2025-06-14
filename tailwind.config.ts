import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Monochromatic palette
        background: {
          DEFAULT: '#18181b', // dark neutral
          light: '#f4f4f5', // light neutral
        },
        foreground: {
          DEFAULT: '#fafafa', // main text
          subtle: '#a1a1aa', // subtle text
        },
        // Signature accent color (e.g., blue-violet)
        accent: {
          DEFAULT: '#7c3aed', // signature accent
          light: '#a78bfa',
          dark: '#4c1d95',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Satoshi', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
export default config 