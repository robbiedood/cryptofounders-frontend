/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#008c8c",
          '300': 'rgba(0, 140, 140, 0.3)',
          '500': 'rgba(0, 140, 140, 0.5)', 
          '700': 'rgba(0, 140, 140, 0.7)', 
        },
        primary: "#fff",
        secondary: "#041d11",
        'secondary-300': 'rgba(4, 29, 17, 0.74)',
        'secondary-500': 'rgba(4, 29, 17, 0.5)'
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], //先找"Inter", 如果找不到就用預設的 "sans-serif"
      },      
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // ...
  ],
}
