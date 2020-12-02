import { ServerResponse } from 'http'
import { CookieSerializeOptions, parse, serialize } from 'cookie'
import Cookies from 'js-cookie'
import { Context } from '@nuxt/types'
import gql from 'graphql-tag'
import { Store } from 'vuex'
import { ApolloClient, InMemoryCache } from 'apollo-boost'

import { State } from '../store'
import Viewer from '../Viewer'

const setAccessTokenCookie = ({
  res,
  accessToken,
  options,
}: {
  res: ServerResponse
  accessToken: string
  options: CookieSerializeOptions
}) => {
  let cookies = res.getHeader('Set-Cookie')

  if (typeof cookies === 'string' || typeof cookies === 'number') {
    cookies = [cookies + '']
  } else if (!cookies) {
    cookies = []
  }

  cookies.push(serialize('accessToken', accessToken, options))

  res.setHeader('Set-Cookie', cookies)
}

export const doLogin = async ({
  store,
  apolloClient,
  accessToken,
  res = null,
  viewer = null,
}: {
  store: Store<State>
  apolloClient: ApolloClient<InMemoryCache>
  accessToken: string
  res?: ServerResponse | null
  viewer?: Viewer | null
}) => {
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)

  if (process.server) {
    res && setAccessTokenCookie({ res, accessToken, options: { expires } })
  } else {
    Cookies.set('accessToken', accessToken, { expires })
  }

  store.commit('SET_VIEWER', viewer)

  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error on cache reset (login)', e.message)
  }
}

export const doLogout = async ({
  store,
  apolloClient,
  res,
  accessToken,
}: {
  store: Store<State>
  apolloClient: ApolloClient<InMemoryCache>
  res?: ServerResponse // optional for client
  accessToken?: string // optional for client
}) => {
  if (process.server) {
    if (res && typeof accessToken !== 'undefined') {
      const expires = new Date(0)

      setAccessTokenCookie({ res, accessToken: '', options: { expires } })
    }
  } else {
    Cookies.remove('accessToken')
  }

  store.commit('SET_ACCESS_TOKEN', null)
  store.commit('SET_VIEWER', null)

  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error on cache reset (logout)', e.message)
  }
}

export default async function ({ store, req, res, app }: Context) {
  let accessToken: string | undefined | null = process.server
    ? parse(req.headers.cookie || '').accessToken
    : Cookies.get('accessToken')

  accessToken = accessToken || null

  if (store.state.accessToken !== accessToken) {
    store.commit('SET_ACCESS_TOKEN', accessToken)
  }

  if (accessToken && !store.state.viewer) {
    const apolloClient = app.apolloProvider!.defaultClient

    try {
      const query = gql`
        query {
          viewer {
            name
          }
        }
      `
      const { data } = await apolloClient.query({ query })

      if (data.viewer) {
        await doLogin({
          store,
          apolloClient,
          res,
          accessToken,
          viewer: data.viewer,
        })
      } else {
        await doLogout({ store, apolloClient, res, accessToken })
      }
    } catch (error) {
      await doLogout({ store, apolloClient, res, accessToken })
    }
  } else if (!accessToken && store.state.viewer) {
    // TODO this causes error on pages with "middleware: 'authenticated'", i.e. profile.vue
    store.commit('SET_VIEWER', null)
  }
}
