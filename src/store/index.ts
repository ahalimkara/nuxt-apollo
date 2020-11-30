import config, { Locales } from '../config'

export const state = () => ({
  viewer: null,
  locale: config.DEFAULT_LOCALE,
  accessToken: null,
})

interface State {
  viewer: null
  locale: Locales
  accessToken: null | string
}

export const getters = {
  isAuthenticated(state: State) {
    return Boolean(state.accessToken)
  },
  isGuest(state: State) {
    return !state.accessToken
  },
}

export const mutations = {
  SET_LOCALE(state: State, locale: Locales) {
    if (config.AVAILABLE_LOCALES.includes(locale)) {
      state.locale = locale
    }
  },
  SET_ACCESS_TOKEN(state: State, accessToken: string | null) {
    state.accessToken = accessToken
  },
}
