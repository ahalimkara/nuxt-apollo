import { ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import { parse } from 'cookie'
import Cookies from 'js-cookie'
import { Context } from '@nuxt/types'

import config from '../../config'
import Logger from './Logger'

export default (ctx: Context) => {
  const loggerLink = process.env.NODE_ENV !== 'production' ? [new Logger()] : []

  const httpLink = new HttpLink({
    uri: config.GRAPHQL_API,
    credentials: 'same-origin',
  })

  const authLink = setContext((_, { headers }) => {
    const token = process.server
      ? parse(ctx.req.headers.cookie || '').accessToken
      : Cookies.get('accessToken')

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }
  })

  return {
    link: ApolloLink.from([...loggerLink, authLink, httpLink]),
    defaultHttpLink: false,
    cache: new InMemoryCache(),
  }
}
