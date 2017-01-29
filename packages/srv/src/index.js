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

const staticRoute = require('./routes/static')
const statsRoute = require('./routes/stats')
const voteRoute = require('./routes/vote')

plugins.push({ register: staticRoute.register })
plugins.push({ register: statsRoute.register })
plugins.push({
  register: voteRoute.register,
  options: {
    config: {
      state: {
          parse: true, // parse and store in request.state
          failAction: 'error' // may also be 'ignore' or 'log'
      }
    }
  }
})

plugins.push({
  register: require('good'),
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*', error: '*' }]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
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
