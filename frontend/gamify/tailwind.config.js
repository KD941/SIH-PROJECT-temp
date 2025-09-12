/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#22f3a2',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          yellow: '#facc15',
        },
        dark: {
          900: '#0b1020',
          800: '#0f1530',
          700: '#141a3a'
        }
      },
      boxShadow: {
        glow: '0 0 20px rgba(139, 92, 246, 0.4)',
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(1200px 600px at 10% 10%, rgba(139,92,246,.15), transparent), radial-gradient(900px 500px at 90% 20%, rgba(59,130,246,.12), transparent), radial-gradient(800px 600px at 50% 100%, rgba(34,243,162,.10), transparent)'
      }
    },
  },
  plugins: [],
}

