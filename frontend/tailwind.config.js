module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'olive-dark': '#3b5d3b',
        'olive': '#506b56',
        'beige': '#e8d8c3',
        'cream': '#f5f1eb',
        'dark-text': '#2d2d2d'
      },
      fontFamily: {
        'luxury': ['Playfair Display', 'serif'],
        'body': ['Lato', 'sans-serif']
      }
    }
  },
  plugins: []
}
