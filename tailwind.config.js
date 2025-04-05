/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Tokyo Night color scheme
        'tokyo': {
          // Dark theme colors
          'bg': '#1a1b26',
          'bg-highlight': '#292e42',
          'terminal-black': '#414868',
          'fg': '#a9b1d6',
          'fg-dark': '#565f89',
          'fg-gutter': '#3b4261',
          'comment': '#565f89',
          'blue': '#7aa2f7',
          'cyan': '#7dcfff',
          'green': '#9ece6a',
          'magenta': '#bb9af7',
          'purple': '#9d7cd8',
          'red': '#f7768e',
          'orange': '#ff9e64',
          'yellow': '#e0af68',
        },
      },
    },
  },
  plugins: [],
}