/** @type {import('tailwindcss').Config} */
module.exports = {
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
                'grayLight': '#E2E0E0',
                'grayExtraLight': '#F6F6F6',
                'lightGray': '#F7F7F7',
                'lighterGray': '#D9D9D9',
                'white': '#FFFFFF',
                'mint': '#1EC1AA',
                'mintLight': '#1EE6C9',
                'mintExtraLight': '#E8FAF5',
                'custom-turquoise': '#B8E4D8',
                'custom-red': '#E22D21',
                'yellow': '#FFB800',
                'darkRed': '#C21E3C',
                'custom-grey': '#EFEFEF',
                'flash-white': '#F3F2F7'
              },
              fontFamily: {
                poppins: ['Poppins', 'sans-serif']
              },
              dropShadow: {
                '2md': '0 4px 4px rgba(0, 0, 0, 0.25)',
              }
            },
        },
    plugins: [],
}

