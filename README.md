# Nuxt Apollo
[WIP] Vue, Nuxt.js, GraphQL, Apollo Client starter kit.

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

GraphQL Api: https://api.graph.cool/simple/v1/cjca0zkoj0fp301974g00ofxy

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Features
- Authentication
- Internationalization
- Server side rendering
- Code splitting
- File Upload (WIP)
- SEO Friendly
- Hot Module Replacement (HMR)
- [Element UI](http://element.eleme.io/)

## Debug

### Chrome DevTools (55+)
node v8.5.0+

`yarn inspect`

Go to: `chrome://inspect/`

### WebStorm (2017.2+)

`Run -> Edit Configurations...`

`Add New Configuration (cmd+N)` and `Select Node.js`

- Working Directory: select project path
- JavaScript File: server.js

Add breakpoints and hit the debug button.

## Code Design
- Keep it simple
- Use stateless components as much as possible
