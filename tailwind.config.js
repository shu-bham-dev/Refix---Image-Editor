/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'shadowBG': '20px 20px 60px #34303c,-20px -20px 60px #464051',
        'shadowBG2': '12px 12px 16px 0 rgba(0, 0, 0, 0.25), 2px 0px 5px 0 rgba(255, 255, 255, 0.3);'
      }
    },
    colors: {
      'bgColor' : '#3d3846',
      'textColor' : '#fff',
    },
    borderRadius: {
      DEFAULT: '50px',
    }
  },
  plugins: [],
}
