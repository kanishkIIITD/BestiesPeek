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
            pinkMain: "#D8115B",
            peachLight: "#FFC1C1",
            orangeBright: "#FF8C42",
            purpleDeep: "#6A0DAD",
            blueCool: "#1E90FF",
            darkBlackMode: "#121212 ",
        },
    },
    plugins: [],
};
