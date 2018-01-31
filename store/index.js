import { DEFAULT_LOCALE, AVAILABLE_LOCALES } from '../config'

export const state = () => ({
  viewer: null,
  locale: DEFAULT_LOCALE,
  accessToken: null,
})

export const getters = {
  isAuthenticated(state) {
    return Boolean(state.accessToken)
  },
  isGuest(state) {
    return !state.accessToken
  },
}

export const mutations = {
  SET_LOCALE(state, locale) {
    if (AVAILABLE_LOCALES.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken
  },
}
