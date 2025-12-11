module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      mono: ["Fira Mono", "Menlo", "Monaco", "Consolas", "monospace"],
    },
    extend: {
      colors: {
        background: "#f8f8f8",
        accent: "#111111",
        muted: "#eaeaea",
      },
      letterSpacing: {
        tightest: "-0.06em",
        tighter: "-0.04em",
        tight: "-0.02em",
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 7vw, 6rem)',
      },
      spacing: {
        'section': '8rem',
      },
      borderRadius: {
        'xl': '1.25rem',
      },
      boxShadow: {
        'soft': '0 2px 24px 0 rgba(0,0,0,0.04)',
      },
      screens: {
        'xs': '400px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
