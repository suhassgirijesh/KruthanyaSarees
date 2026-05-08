module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
  'royal-green': '#014421',
  'royal-green-light': '#1c5c3c',
  'royal-green-dark': '#012d16',

  'gold': '#d4af37',
  'gold-soft': '#f2d27b',
  'gold-dark': '#9c7c21',

  'cream': '#f8f5ee',
  'soft-white': '#fffdf8',

  'charcoal': '#1a1a1a',
  'dark-text': '#f5f5f5'
},
      fontFamily: {
        'luxury': ['Playfair Display', 'serif'],
        'body': ['Lato', 'sans-serif']
      }
    }
  },
  plugins: []
}
