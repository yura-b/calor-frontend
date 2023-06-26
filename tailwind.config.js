/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'darkGray': '#404040',
                'lightGray': '#F7F7F7',
                'white': '#FFFFFF',
                'lightGreen': '#B8E4D8',
                'green': '#1EC1AA',
                'red': '#E22D21',
                'custom-turquoise': '#B8E4D8',
                'custom-red': '#E22D21'
              },
              fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
              },
              inset: {
                '-2': '-8px',
              },
            },
        },
    plugins: [],
}

