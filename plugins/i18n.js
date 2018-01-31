import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Negotiator from 'negotiator'

Vue.use(VueI18n)

export default ({ app, store, req }) => {
  if (process.server) {
    const negotiator = new Negotiator(req)
    const locale = negotiator.language(store.state.locales)
    store.commit('SET_LOCALE', locale || 'en')
  }

  app.i18n = new VueI18n({
    locale: store.state.locale || 'en',
    fallbackLocale: 'en',
    messages: {
      en: require('../translations/en.json'),
      zh: require('../translations/zh.json'),
    },
  })
}
