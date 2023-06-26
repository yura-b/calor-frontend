/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'custom-turquoise': '#B8E4D8',
                'custom-red': '#E22D21'
            },
        },
    },
    plugins: [],
}

