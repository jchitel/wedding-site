module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "marauders-map": "url('/background.jpg')",
            },
            colors: {
                primary: "#203453",
                secondary: "#EDC200",
                background: "#EDD38B",
            },
            fontFamily: {
                "parchment-print": "parchment-print",
                "wizard-hand": "wizard-hand",
            },
        },
    },
    plugins: [],
};
