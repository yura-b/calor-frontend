/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'gray': '#404040',
                'lightGray': '#F7F7F7',
                'lighterGray': '#D9D9D9',
                'white': '#FFFFFF',
                'mint': '#1EC1AA',
                'custom-turquoise': '#B8E4D8',
                'custom-red': '#E22D21',
                'yellow': '#FFB800'
              },
              fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
              },
            },
        },
    plugins: [],
}

