'use strict'
var _ = require('lodash')
var bfinger = require('browser_fingerprint')
var PouchW = require('pouchdb-wrapper')
var boom = require('boom')
var db = require('../../services/pouch-votes')
var locations = require('../../../common/locations.js')
var locationValues = _.pluck(locations, 'value')

module.exports.register = function (server, options, next) {
  server.state('bfp', {
    ttl: 1e13,
    strictHeader: true // don't allow violations of RFC 6265
  })

  server.route({
    method: 'POST',
    path: '/vote',
    handler: function (request, reply) {
      console.log(request.payload)
      if (!request.payload.color || !_.contains(['red', 'green'], request.payload.color)) {
        return reply(boom.wrap(new ReferenceError('invalid vote color, ' + request.payload.color)))
      }
      if (!request.payload.location || !_.contains(locationValues, request.payload.location)) {
        return reply(boom.wrap(new ReferenceError('invalid location, ' + request.payload.location)))
      }
      return generateFingerprint(request, reply, server)
    },
    config: {
      description: 'cast red or green vote!',
      notes: 'enables user voting of favorite chile',
      tags: ['api', 'vote'],
      state: {
        parse: true, // parse and store in request.state
        failAction: 'error' // may also be 'ignore' or 'log'
      }
    }
  })

  next()
}

var generateFingerprint = function (request, reply, server) {
  var options = {
    cookieKey: 'bfp',
    toSetCookie: true,
    onlyStaticElements: false,
    settings: {
      path: '/'
    }
  }
  var existingBfp

    // detect if fingerprint cookie already present. if so, test for existing
  if (request.state && request.state.bfp) {
    existingBfp = request.state.bfp
    console.log('existing fingerprint found: ', request.state.bfp)
    return reply({}).state('bfp', existingBfp).code(409)
  }
    // else, get fingerprint

  bfinger.fingerprint(request, options, function (fingerprint, elementHash, cookieHash) {
    var resp = ''
    var bfp = existingBfp || fingerprint
        // cookieHash['Content-Type'] = 'text/plain';
        // cookieHash['Cache-Control'] = 'public';
        // show me. in the browser.
    resp += 'Your Browser Fingerprint: ' + fingerprint + '\r\n\r\n'
        // for(var i in elementHash){
        //     resp += "Element " + i + ": " + elementHash[i] + "\r\n";
        // }
        // resp += JSON.stringify(request.headers, null, 2) + "\r\n";
        // console.log('request from ' + request.info.remoteAddress + ', fingerprint -> ' + fingerprint);

    db.get(bfp).then(function (r) {
      reply(resp).state('bfp', bfp).code(409)
      return {_replied: true}
    }).catch(function (err) {
      if (err.status === 404) {
        return db.put({
          _id: fingerprint,
          color: request.payload.color,
          location: request.payload.location,
          headers: request.headers
        })
      }
      throw err
    }).then(function (r) {
      if (r._replied) {
        return false
      }
      reply(resp).state('bfp', bfp).code(200)
    }).catch(function (err) {
      console.dir(err) // TODO log this formally
      reply(boom.wrap(err)).code(500)
    })
  })
}

module.exports.register.attributes = {
  name: 'route-vote',
  version: '1.0.0'
}
