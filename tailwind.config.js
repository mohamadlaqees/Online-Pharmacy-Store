/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        secondry: "#d7eeff",
        SWord: "#5fb9f7",
        SReg: "#52b0ed",
        SSReg: "#1390e3 ",
        font1: "#4f4f4f",
        font2: "#757575",
        email: "#05536a",
        all: "#f1f5f9",
      },
      height: {
        photo: "753px",
        page: "100vh",
        form: "490px",
        form2: "440px",
        small: "730px",
        load: "39.2px",
      },
      translate: {
        "10%": "10%",
      },
      width: {
        "88%": "88%",
        "12%": "12%",
        custom: "96.5%",
        custom2: "95.5%",
        form: "500px",
        photo: "860px",
        details: "400px",
        job: "410px",
        check: "310px",
      },
      transitionDuration: {
        ".3s": ".3s",
      },
      screens: {
        show: "1200px",
      },
      maxHeight: {
        mInfo: "391px",
        mCont: "420px",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fill, minmax(20rem, 1fr))",
      },
      spacing: {
        custom: "52px",
      },
    },
  },
  plugins: [],
};
