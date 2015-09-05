var PouchW = require('pouchdb-wrapper');
module.exports = new PouchW({
    name: 'redorgreen-votes',
    conn: {
        protocol: 'http',
        hostname: 'localhost',
        port: 5984,
        pathname: 'redorgreen-votes'
    }
});
