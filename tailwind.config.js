/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Tokyo Night color scheme (legacy support)
        'tokyo': {
          // Dark theme colors
          'bg': 'var(--theme-bg, #1a1b26)',
          'bg-highlight': 'var(--theme-bg-highlight, #292e42)',
          'terminal-black': 'var(--theme-terminal-black, #414868)',
          'fg': 'var(--theme-fg, #a9b1d6)',
          'fg-dark': 'var(--theme-fg-dark, #565f89)',
          'fg-gutter': 'var(--theme-fg-gutter, #3b4261)',
          'comment': 'var(--theme-comment, #565f89)',
          'blue': 'var(--theme-blue, #7aa2f7)',
          'cyan': 'var(--theme-cyan, #7dcfff)',
          'green': 'var(--theme-green, #9ece6a)',
          'magenta': 'var(--theme-magenta, #bb9af7)',
          'purple': 'var(--theme-purple, #9d7cd8)',
          'red': 'var(--theme-red, #f7768e)',
          'orange': 'var(--theme-orange, #ff9e64)',
          'yellow': 'var(--theme-yellow, #e0af68)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}