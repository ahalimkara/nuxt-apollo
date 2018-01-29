import { parse } from 'cookie'
import Cookies from 'js-cookie'

export default function ({ store, req }) {
  const accessToken = process.server ? parse(req.headers.cookie || '').accessToken : Cookies.get('accessToken')
  store.commit('SET_ACCESS_TOKEN', accessToken)
}
