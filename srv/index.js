'use strict'

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
const port = 8081
server.connection({ port: port })
const glob = require('glob')
const plugins = []

glob.sync(path.join(__dirname, 'lib/routes/*.js')).forEach(function registerRoutes (file) {
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

server.register(require('inert'), function (err) {
  if (err) throw err
  console.info('inert loaded')
})

server.register(plugins, err => {
  if (err) throw err
})

server.start(() => console.log('Server running at:', server.info.uri))

module.exports = server
