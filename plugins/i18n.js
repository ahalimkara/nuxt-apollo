import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { DEFAULT_LOCALE, AVAILABLE_LOCALES } from '../config'

Vue.use(VueI18n)

export default ({ app, store, req }) => {
  if (process.server) {
    const pathRegExp = new RegExp(`^(/(${AVAILABLE_LOCALES.join('|')}))?(/.*)?$`)
    const locale = req.originalUrl.match(pathRegExp)[2] || DEFAULT_LOCALE
    store.commit('SET_LOCALE', locale)
  }

  const messages = {}
  AVAILABLE_LOCALES.forEach(l => {
    messages[l] = require(`../translations/${l}.json`)
  })

  app.i18n = new VueI18n({
    locale: store.state.locale || DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages,
  })
}
