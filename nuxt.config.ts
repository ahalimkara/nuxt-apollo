import { Context } from '@nuxt/types'

import config from './src/config'

const locale = `/:locale(${config.AVAILABLE_LOCALES.join('|')})?`

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Nuxt Apollo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  loading: { color: '#1890ff' },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/src/plugins/i18n'],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      '@nuxtjs/apollo',
      {
        clientConfigs: {
          default: '~/src/graphql/apollo/defaultClient.ts',
        },
      },
    ],
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['ant-design-vue'],
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es',
            style: 'css',
          },
        ],
      ],
    },
    extend(config: any, ctx: Context) {
      if (ctx.isDev) {
        config.devtool = 'source-map'
      }
    },
  },

  router: {
    middleware: 'check-auth',
    extendRoutes(routes: any[]) {
      routes.forEach((route: any) => {
        route.path = `${locale}${route.path}`
      })
    },
  },

  dir: {
    layouts: 'src/layouts',
    middleware: 'src/middleware',
    pages: 'src/pages',
    store: 'src/store',
  },
}
