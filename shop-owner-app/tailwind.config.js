/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    pink: '#FF6B9D',
                    light: '#FFF0F5',
                },
            },
        },
    },
    plugins: [],
}
