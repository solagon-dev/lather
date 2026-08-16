const config = {
  // autoprefixer is a devDependency but was never wired in, so nothing was
  // getting vendor prefixes (backdrop-filter, mask, etc. on older Safari).
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
export default config;
