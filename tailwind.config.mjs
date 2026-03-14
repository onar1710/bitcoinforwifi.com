import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bitcoin: {
          orange: '#F7931A',
          dark: '#4A4A4A',
          light: '#FFD700'
        },
        dark: {
          DEFAULT: '#0A0A0A',
          card: '#1A1A1A',
          border: '#2A2A2A'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [typography],
  darkMode: 'class'
}
