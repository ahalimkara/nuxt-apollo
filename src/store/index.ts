import config, { Locales } from '../config'

import Viewer from '../Viewer'

export interface State {
  viewer: Viewer | null
  locale: Locales
  accessToken: null | string
}

export const state = (): State => ({
  viewer: null,
  locale: config.DEFAULT_LOCALE,
  accessToken: null,
})

export const getters = {
  isAuthenticated(state: State) {
    return Boolean(state.viewer)
  },
}

export const mutations = {
  SET_LOCALE(state: State, locale: Locales) {
    if (config.AVAILABLE_LOCALES.includes(locale)) {
      state.locale = locale
    }
  },
  SET_VIEWER(state: State, viewer: Viewer | null) {
    state.viewer = viewer
  },
  SET_ACCESS_TOKEN(state: State, accessToken: string | null) {
    state.accessToken = accessToken || null
  },
}
