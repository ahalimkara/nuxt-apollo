import { Context } from '@nuxt/types'
import VueI18n from 'vue-i18n'

import config from '../config'

export default function ({ store, route: { params }, app }: Context) {
  const newLocale = params.locale || config.DEFAULT_LOCALE

  if (newLocale !== store.state.locale) {
    ;(app.i18n as VueI18n).locale = newLocale
    store.commit('SET_LOCALE', newLocale)
  }
}
