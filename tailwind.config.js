/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'hero-sub': 'hsl(var(--hero-sub))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        soft: 'hsl(var(--soft))',
      },
      animation: {
        'logo-marquee': 'logo-marquee 20s linear infinite',
      },
      keyframes: {
        'logo-marquee': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },
      },
    },
  },
  plugins: [],
}
