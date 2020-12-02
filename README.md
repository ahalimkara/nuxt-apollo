# Nuxt Apollo
[WIP] Vue, Nuxt.js, GraphQL, Apollo Client, TypeScript, Ant Design starter kit.

GraphQL Api: [https://gql-a.herokuapp.com/graphql](https://gql-a.herokuapp.com/graphql) \
Online demo: [https://n-a.herokuapp.com](https://n-a.herokuapp.com)

## Build Setup

``` bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Features
- Authentication
- Internationalization
- Server Side Rendering
- Code splitting
- File Upload (WIP)
- SEO Friendly
- Hot Module Replacement (HMR)
- [Ant Design Vue](https://www.antdv.com/)

## Middlewares
### `auth.ts`
This is a Router middleware, it will be called for every route change. If `accessToken` exists then user data will be loaded and added to Vuex store.

### `authenticated.ts`
This middleware checks for `viewr` state, if it doesn't exit it will redirect to login page.

### `guest.ts`
This middleware does the opposite of `authenticated.ts`, if the `viewer` exits it will redirect to homepage.

## Debug

### Chrome DevTools (55+)
node v8.5.0+

`yarn dev --inspect`

Go to: `chrome://inspect/`

### WebStorm (2017.2+)

`Run -> Edit Configurations...`

`Add New Configuration (cmd+N)` and `Select Node.js`

- Working Directory: select project path
- JavaScript File: server.js

Add breakpoints and hit the debug button.

## Code Design
- Keep it simple
- Functional components
