/* eslint-disable no-console */
import { ApolloLink, FetchResult, Observable } from 'apollo-boost'
import { GraphQLError } from 'graphql/error/GraphQLError'
import { ZenObservable } from 'zen-observable-ts/lib/types'
import { NextLink, Operation } from 'apollo-link/lib/types'

const options = { onlyErrors: false }

interface LoggerFuncParams {
  operation: Operation
  response?: FetchResult
  graphQLErrors?: ReadonlyArray<GraphQLError>
  networkError?: any
}

const defaultLogger = ({
  operation,
  response,
  graphQLErrors,
  networkError,
}: LoggerFuncParams) => {
  if (graphQLErrors || networkError || (response && !options.onlyErrors)) {
    operation.query.definitions.forEach((definition) => {
      const op = 'operation' in definition ? definition.operation : ''

      console.log(`[Operation] apollo ${op} ${operation.operationName || ''}`)
    })
  }

  if (response && !options.onlyErrors) {
    console.log(`[Operation Result] ${JSON.stringify(response)}`)
  }

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      const locationsStr = JSON.stringify(locations)

      console.error(
        `[GraphQL Error] Message: "${message}", Locations: ${locationsStr}, Path: "${path}"`
      )
    })
  }

  if (networkError) {
    console.error(`[Network Error] "${networkError}"`)
  }
}

type LoggerFunc = typeof defaultLogger | Function

const loggerLink = (logger: LoggerFunc = defaultLogger) => {
  return new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      let sub: ZenObservable.Subscription

      try {
        sub = forward(operation).subscribe({
          next: (result) => {
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
          error: (networkError) => {
            logger({
              operation,
              networkError,
              // Network errors can return GraphQL errors, for example a 403
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
        if (sub) {
          sub.unsubscribe()
        }
      }
    })
  })
}

interface LoggerParams {
  logger?: LoggerFunc
  onlyErrors?: boolean
}

export default class Logger extends ApolloLink {
  link: ApolloLink

  constructor({ logger, onlyErrors }: LoggerParams = {}) {
    super()

    options.onlyErrors = onlyErrors === true
    this.link = loggerLink(logger)
  }

  request(operation: Operation, forward?: NextLink) {
    return this.link.request(operation, forward)
  }
}
