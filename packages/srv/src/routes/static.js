'use strict'

const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, isDev ? '../../../ui/build' : '../../static'),
        index: ['index.html']
      }
    }
  })

  next()
}

module.exports.register.attributes = {
  name: 'route-static',
  version: '1.0.0'
}
