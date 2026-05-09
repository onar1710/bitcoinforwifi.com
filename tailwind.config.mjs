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
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E5E7EB'
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
