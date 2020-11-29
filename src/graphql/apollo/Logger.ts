/* eslint-disable no-console */
import { ApolloLink, FetchResult, Observable } from 'apollo-boost'
import { GraphQLError } from 'graphql/error/GraphQLError'
import { ZenObservable } from 'zen-observable-ts/lib/types'
import { NextLink, Operation } from 'apollo-link/lib/types'

const options = { onlyErrors: false }

interface LoggerFuncParams {
  operation: any
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
  const operationType = operation.query.definitions[0].operation

  if (graphQLErrors || networkError || (response && !options.onlyErrors)) {
    console.log(
      `[Operation] apollo ${operationType} ${operation.operationName}`
    )
  }

  if (response && !options.onlyErrors) {
    console.log(`[Operation Result] ${JSON.stringify(response)}`)
  }

  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL Error] Message: "${message}", Locations: ${JSON.stringify(
          locations
        )}, Path: "${path}"`
      )
    )
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
