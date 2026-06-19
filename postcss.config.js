// Autoprefixer runs over the compiled CSS (Bootstrap's recommended toolchain).
// Browser targets come from the "browserslist" field in package.json.
module.exports = {
  plugins: [require('autoprefixer')],
};
