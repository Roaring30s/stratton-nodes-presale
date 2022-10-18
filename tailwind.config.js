module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "discord-purple": "#5454D4",
        primary: "#2F2F86",
        secondary: "#7676DD",
        "stratton-blue": "#021132",
        "presale-blue": "#4646B2",
        "presale-purple": "#7676E3",
        "lime": "#CBFB01",
        "landing-black": "#19191B",
      },
      backgroundImage: {
        countdown:
          "linear-gradient(to bottom, #391c77, transparent, #301474), linear-gradient(to left, #301474, transparent, #301474), url('/countdown-background.svg')",
      },
      backgroundSize: {
        hero: "100% 100%",
        footer: "43rem",
      },
      backgroundPosition: {
        "footer-pos": "bottom -25rem right -2rem",
      },
      spacing: {
        128: "37rem",
        community: "4.5rem",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1238px",
      // => @media (min-width: 1024px) { ... }

      xl: "1311px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1280px) { ... }

      "3xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
//Top: #401c74
//Bottom: #301474