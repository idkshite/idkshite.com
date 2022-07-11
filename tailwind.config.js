module.exports = {
  safelist: ["!mb-0", "md:w-1/2", "md:mx-auto", "mb-0"],
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,css}",
    "./public/**/*.{html,js,jsx,ts,tsx,css}",
    "./content/posts/*.{mdx}", // doesn't work reliably. currently safe-listing classes directly used in mdx files
  ],
  theme: {
    fontFamily: {
      display: ["Jost", "sans-serif"],
      body: ["Jost", "sans-serif"],
    },
    spacing: {
      small: "4px",
      0: "0px",
      1: "8px",
      2: "16px",
      3: "24px",
      4: "32px",
      5: "40px",
      6: "48px",
      7: "56px",
      8: "64px",
      9: "72px",
      10: "80px",
      11: "88px",
      12: "96px",
      13: "104px",
      14: "112px",
    },
    extend: {
      colors: {
        "default-text": "#232323",
        "default-title": "#4B4A4A",
        "subtle-label": "#CDCDCD",
        "very-subtle-label": "#ededed",
      },
    },
  },
  plugins: [],
};
