/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            minWidth:{
                25: '25%'
            },

            margin: {
                marginForLeftHeader: '16.666667%'
            },
            colors: {
                'gray': '#404040',
                'lightGray': '#F7F7F7',
                'lighterGray': '#D9D9D9',
                'white': '#FFFFFF',
                'mint': '#1EC1AA',
                'mintExtraLight': '#E8FAF5',
                'custom-turquoise': '#B8E4D8',
                'custom-red': '#E22D21',
                'yellow': '#FFB800',
                'darkRed': '#C21E3C',
                'custom-grey': '#F3F3F3'
              },
              fontFamily: {
                body: ['"Poppins"', '"sans-serif"'],
              },
            },
        },
    plugins: [],
}

