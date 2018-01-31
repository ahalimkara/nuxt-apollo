const webpack = require('webpack')
const config = require('./config')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-apollo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  plugins: [
    '@/plugins/i18n',
    '@/plugins/element-ui',
    // {src: '@/plugins/clipboard', ssr: false},
  ],

  modules: [['@nuxtjs/apollo', {
    clientConfigs: {
      default: '~/graphql/apollo/defaultClient.js',
    },
  }]],

  router: {
    middleware: 'check-auth',
    extendRoutes (routes, resolve) {
      const locale = `/:locale(${config.AVAILABLE_LOCALES.join('|')})?`

      routes.forEach(r => {
        r.path = locale + r.path
      })
    },
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#1890ff' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },

    babel: {
      plugins: ["transform-class-properties"],
    },

    plugins: [
      new webpack.NormalModuleReplacementPlugin(/element-ui[/\\]lib[/\\]locale[/\\]lang[/\\]zh-CN/, 'element-ui/lib/locale/lang/en'),
    ],

    vendor: [
      'apollo-link-context',
      'element-ui',
      'vue-i18n',
    ],
  },

  css: [
    '@/assets/vendor/element/theme/index.css',
    { src: '@/assets/styles/index.scss', lang: 'scss' },
  ],
}
