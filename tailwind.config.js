/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                white: "#fff",
                pink: {
                    300: "#ec6a9a",
                    500: "#d8125b",
                    600: "#d8115b",
                },
                darkgrey: {
                    100: "#dcdde5",
                    500: "#2c2e39",
                },
                red: {
                    500: "#ff4f57",
                    700: "#ff0000",
                    800: "#ff101c",
                },
                pinkMain: "#D8115B",
                peachLight: "#FFC1C1",
                orangeBright: "#FF8C42",
                purpleDeep: "#6A0DAD",
                blueCool: "#1E90FF",
                darkBlackMode: "#121212 ",
                lightgrey: "#B3B3B3",
                buttonGrey: "#2A2A2A",
                cardDark1: "#3A3A3A",
                cardDark2: "#2A2A2A",
                cardLight1: "#ccc",
                cardLight2: "#f2f2f2",
                darkBlue: "#000080",
                darkBlue1: "#0000ff",
                darkgrey2: "#555555",
                lightblue1: "#5B8DEF",
                lightblue2: "#87CEEB",
            },
        },
    },
    plugins: [],
};
