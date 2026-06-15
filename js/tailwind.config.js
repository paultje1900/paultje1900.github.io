/* Tailwind Play CDN config — Mantelzorgmakelaar Anneke
   Hospital-grade calm palette: single teal accent + slate neutrals.
   Restrained radii for a professional, clinical feel. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef6f5",
          100: "#d7ebe8",
          200: "#b0d8d2",
          300: "#80bdb5",
          400: "#509e96",
          500: "#34827a",
          600: "#256b64",
          700: "#1e554f",
          800: "#1a433f",
          900: "#11302d",
        },
        ink: "#17211f",
        accent: {
          50:  "#fbf3ec",
          100: "#f7e6d4",
          200: "#eecba6",
          300: "#e3ab74",
          400: "#d98f4d",
          500: "#c9763a",
          600: "#a85f2e",
          700: "#874c27",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
        md: "5px",
        lg: "6px",
        xl: "8px",
        "2xl": "8px",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(17, 48, 45, 0.07)",
        card: "0 1px 3px rgba(17, 48, 45, 0.08), 0 1px 2px rgba(17, 48, 45, 0.04)",
        lift: "0 16px 40px rgba(17, 48, 45, 0.12)",
      },
      maxWidth: {
        site: "1240px",
      },
    },
  },
};
