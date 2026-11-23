/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        teal: {
          50: '#ECFAFA', 100: '#D2F2F2', 200: '#A7E4E5', 300: '#6ACFD2', 400: '#2DB1B6',
          500: '#0F959B', 600: '#087E83', 700: '#09676B', 800: '#0D5357', 900: '#0F4548', 950: '#032A2D',
        },
        brand: { blue: '#2563EB', 'blue-dark': '#1D4ED8' },
        navy: { 900: '#172554', 800: '#1E3170', 700: '#334376', 600: '#475785', 500: '#5B6B94' },
        surface: '#F8FAFC',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2rem, 1.3rem + 3vw, 3.625rem)', { lineHeight: '1.06', letterSpacing: '-0.035em' }],
        h2: ['clamp(1.75rem, 1.3rem + 1.9vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        h3: ['clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)', { lineHeight: '1.7' }],
      },
      borderRadius: { xl: '0.75rem', '2xl': '1rem', '3xl': '1.25rem' },
      boxShadow: {
        soft: '0 1px 2px rgba(23,37,84,.04), 0 8px 24px -12px rgba(23,37,84,.12)',
        lift: '0 2px 4px rgba(23,37,84,.04), 0 24px 48px -20px rgba(23,37,84,.22)',
        glow: '0 12px 32px -12px rgba(8,126,131,.55)',
      },
      maxWidth: { content: '78rem' },
    },
  },
  plugins: [],
}
