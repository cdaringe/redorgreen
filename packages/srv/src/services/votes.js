'use strict'
const config = require('../config')
const Pouchy = require('pouchy')
module.exports = new Pouchy({
  conn: {
    protocol: 'http',
    hostname: config.DB_HOST,
    port: config.DB_PORT,
    pathname: 'redorgreen-votes'
  }
})
