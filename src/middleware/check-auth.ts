import { parse } from 'cookie'
import Cookies from 'js-cookie'
import { Context } from '@nuxt/types'

export default function ({ store, req }: Context) {
  const accessToken = process.server
    ? parse(req.headers.cookie || '').accessToken
    : Cookies.get('accessToken')

  store.commit('SET_ACCESS_TOKEN', accessToken)
}
