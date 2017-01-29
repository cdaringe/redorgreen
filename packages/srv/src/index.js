'use strict'

require('perish')
const { PORT, DB_HOST, DB_PORT } = require('./config')
const Hapi = require('hapi')
const path = require('path')
const server = new Hapi.Server({
  connections: {
    routes: {
      cors: {
        credentials: true // allows cookie sending and setting from client
      }
    }
  }
})
server.connection({ port: PORT })
const glob = require('glob')
const plugins = []

glob.sync(path.join(__dirname, 'routes/*.js')).forEach(function registerRoutes (file) {
  plugins.push({
    register: require(file),
    options: {}
  })
})

plugins.push({
  register: require('good'),
  options: {
    opsInterval: 1000,
    reporters: [{
      reporter: require('good-console'),
      events: { log: '*', response: '*' }
    }, {
      reporter: require('good-file'),
      events: { log: '*', error: '*' },
      config: './chile.log'
    }]
  }
})

server.register(require('inert'), err => {
  if (err) throw err
})

server.register(plugins, err => {
  if (err) throw err
})

server.start(() => {
  console.log('Server running at:', server.info.uri)
  console.log(`\tusing DB @: ${DB_HOST}:${DB_PORT}`)
})

module.exports = server
