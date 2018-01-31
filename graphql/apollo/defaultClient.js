import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { parse } from 'cookie'

import ApolloLogger from './ApolloLogger'
import { GRAPHQL_API } from '../../config'

export default ctx => {
  const loggerLink = process.env.NODE_ENV !== 'production' ? [new ApolloLogger()] : []

  const httpLink = new HttpLink({
    uri: GRAPHQL_API,
    credentials: 'same-origin',
  })

  const authLink = setContext((_, { headers }) => {
    const token = process.server ? parse(ctx.req.headers.cookie || '').accessToken : window.__NUXT__.state.accessToken
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }
  })

  return {
    link: ApolloLink.from([...loggerLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  }
}
