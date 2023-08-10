/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  buildOptions: {
    sourcemap: true,
    baseUrl: 'https://joselacruz.github.io/lazy-loading-vanila-js',
  },
}
