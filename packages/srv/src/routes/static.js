'use strict'

const path = require('path')

module.exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, '../../../ui/build'),
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