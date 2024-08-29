/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        colors: {
            white: "#fff",
            pink: {
                300: "#ec6a9a",
                500: "#d8125b",
            },
            darkgrey: {
                100: "#dcdde5",
                500: "#2c2e39",
            },
            red: {
                500: "#ff4f57",
                800: "#ff101c",
            },
        },
    },
    plugins: [],
};
