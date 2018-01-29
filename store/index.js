export const state = () => ({
  viewer: null,
  locale: null,
  accessToken: null,
  locales: ['en', 'zh'],
})

export const getters = {
  isAuth(state) {
    return Boolean(state.accessToken)
  },
  isGuest(state) {
    return !state.accessToken
  },
}

export const mutations = {
  SET_LOCALE(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken
  },
}
