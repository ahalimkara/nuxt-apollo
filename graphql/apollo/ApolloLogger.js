import { ApolloLink, Observable } from 'apollo-link'

const opts = { onlyErrors: false }

const defaultLogger = ({ operation, response, graphQLErrors, networkError }) => {
  const operationType = operation.query.definitions[0].operation

  if (graphQLErrors || networkError || (response && !opts.onlyErrors)) {
    console.log(`[Operation] apollo ${operationType} ${operation.operationName}`)
  }

  if (response && !opts.onlyErrors) {
    console.log(`[Operation Result] ${JSON.stringify(response)}`)
  }

  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(`[GraphQL Error] Message: "${message}", Locations: ${JSON.stringify(locations)}, Path: "${path}"`)
    )
  }

  if (networkError) {
    console.error(`[Network Error] "${networkError}"`)
  }
}

const loggerLink = (logger) => {
  return new ApolloLink((operation, forward) => {
    return new Observable(observer => {
      let sub

      try {
        sub = forward(operation).subscribe({
          next: result => {
            if (result.errors) {
              logger({
                graphQLErrors: result.errors,
                response: result,
                operation,
              })
            } else {
              logger({
                response: result,
                operation,
              })
            }

            observer.next(result)
          },
          error: networkError => {
            logger({
              operation,
              networkError,
              //Network errors can return GraphQL errors on for example a 403
              graphQLErrors: networkError.result && networkError.result.errors,
            })

            observer.error(networkError)
          },
          complete: observer.complete.bind(observer),
        })
      } catch (e) {
        logger({ networkError: e, operation })
        observer.error(e)
      }

      return () => {
        if (sub) sub.unsubscribe()
      }
    })
  })
}

export default class ApolloLogger extends ApolloLink {
  link

  constructor({ logger = null, options = null } = {}) {
    super()
    opts.onlyErrors = (options && options.onlyErrors) === true
    this.link = loggerLink(logger || defaultLogger)
  }

  request(operation, forward) {
    return this.link.request(operation, forward)
  }
}
