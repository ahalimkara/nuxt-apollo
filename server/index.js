import express from 'express'
import { Nuxt, Builder } from 'nuxt'

const app = express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// when inspecting (--inspect) don't know why it always call /json and /json/version url???
if (config.dev) {
  app.use('/json', (req, res) => {
    res.sendStatus(204)
    res.end()
  })
}

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port)
