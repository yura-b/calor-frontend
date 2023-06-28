/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        minWidth:{
            25: '25%'
        },
        extend: {
            colors: {
                'custom-turquoise': '#B8E4D8',
                'mint': '#1EC1AA',
                'custom-red': '#E22D21'
            },
        },
    },
    plugins: [],
}

