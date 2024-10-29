module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'flowing-color': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'flowing-color': 'flowing-color 3s linear infinite',
      },
      backgroundImage: {
        'color-gradient':
          'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
      },
    },
  },
  plugins: [],
};
