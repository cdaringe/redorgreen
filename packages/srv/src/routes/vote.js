'use strict'

const _ = require('lodash')
const bb = require('bluebird')
const boom = require('boom')
const bfp = require('browser_fingerprint')
const db = require('../services/votes')
const locations = require('common').locations
const locationValues = _.pluck(locations, 'value')

const FINGERPRINT_OPTIONS = {
  cookieKey: 'bfp',
  toSetCookie: true,
  onlyStaticElements: false,
  settings: {
    path: '/'
  }
}

module.exports.register = function (server, options, next) {
  server.state('bfp', {
    ttl: 1e13,
    strictHeader: true // don't allow violations of RFC 6265
  })

  server.route({
    method: 'POST',
    path: '/vote',
    handler: function (request, reply) {
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
  // detect if fingerprint cookie already present. if so, test for existing
  if (request.state && request.state.bfp) {
    console.log('existing fingerprint found: ', request.state.bfp)
    return reply({}).state('bfp', request.state.bfp).code(409)
  }

  // else, get fingerprint
  // BFP callback signature sucks: https://github.com/evantahler/browser_fingerprint/issues/9
  return bfp.fingerprint(request, FINGERPRINT_OPTIONS, function (bfp, elementHash, cookieHash) {
    var resp = ''
    resp += 'Your Browser Fingerprint: ' + bfp + '\r\n\r\n'
    return db.get(bfp)
    .then(() => reply(resp).state('bfp', bfp).code(409))
    .catch(function (err) {
      if (err.status !== 404) throw err
      return db.put({
        _id: bfp,
        color: request.payload.color,
        location: request.payload.location,
        headers: request.headers
      })
      .then(() => reply(resp).state('bfp', bfp).code(200))
    })
  })
}

module.exports.register.attributes = {
  name: 'route-vote',
  version: '1.0.0'
}
