module.exports = {
  mode: 'jit',
  content: ["./src/pages/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
  theme: {
    extend: {
      colors: {
        gradientOne: '#BBF7D0',
        gradientTwo: '#7DD3FC',
        gradientThree: '#C084FC',
        bgBlue: '#111827',
        bgGrey: '#374151'
      }
    },
  },
}