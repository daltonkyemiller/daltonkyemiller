module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                'brand': 'IvyMode'
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
};
