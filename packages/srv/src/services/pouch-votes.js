var PouchW = require('pouchdb-wrapper')
module.exports = new PouchW({
  name: 'redorgreen-votes',
  conn: {
    protocol: 'http',
    hostname: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5984,
    pathname: 'redorgreen-votes'
  }
})
