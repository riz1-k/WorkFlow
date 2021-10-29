module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      opacity: ['disabled'],
      gridTemplateColumns: {
        blog: '256px auto',
      },
      gridTemplateRows: {
        blog_detail: 'auto 139px 40px',
        blog_extra_detail: '34px auto 40px',
        mobile_blog: '30px 256px 44px',
        mobile_blog_expanded: '30px 256px auto',
      },
      fontFamily: {
        poster: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        work: ['Work Sans', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
