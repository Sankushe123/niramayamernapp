module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sublinks: "#BD4A8E",
        headtextColor: "#de3e9efa",
        smtext: "#2ecc71",
        xsmtext: "#e74c3c",
        btnprimary: "#f5f5f5",
        btnsecondary: "#f5f5f5",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "Roboto", "sans-serif"], 
        heading: ["Poppins", "sans-serif"], 
        body: ["Inter", "sans-serif"], 
        marketingText: []
      },
    },
  },
  plugins: [],
};
