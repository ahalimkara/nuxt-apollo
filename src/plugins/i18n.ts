import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'
import { Context } from '@nuxt/types'
import { IncomingMessage } from 'connect'

import config from '../config'

Vue.use(VueI18n)

const { DEFAULT_LOCALE, AVAILABLE_LOCALES } = config
const localeRegExp = new RegExp(`^(/(${AVAILABLE_LOCALES.join('|')}))?(/.*)?$`)

const extractLocale = (req: IncomingMessage) => {
  const localeMatches = req.originalUrl?.match(localeRegExp) || []

  return localeMatches[2] || DEFAULT_LOCALE
}

export default ({ app, store, req }: Context) => {
  if (process.server) {
    const locale = extractLocale(req)

    store.commit('SET_LOCALE', locale)
  }

  const messages: LocaleMessages = {}

  AVAILABLE_LOCALES.forEach((locale) => {
    messages[locale] = require(`../../translations/${locale}.json`)
  })

  app.i18n = new VueI18n({
    locale: store.state.locale || DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages,
  })
}
