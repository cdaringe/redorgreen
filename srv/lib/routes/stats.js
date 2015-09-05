'use strict';
var _ = require('lodash');
var boom = require('boom');
var db = require('../../services/pouch-votes');
var locations = require('../../../common/locations.js');

module.exports.register = function(server, options, next) {

    server.route({
        method: 'GET',
        path: '/stats',
        handler: function(request, reply) {
            var counters = _.transform(_.indexBy(locations,'value'),function(r,o,k){r[k]=0});
            var resp = {
                green: 0,
                red: 0,
                locationCount: counters
            };
            db.all().then(function(votes) {
                for (var i = votes.length - 1; i >= 0; i--) {
                    if (votes[i].color === 'red') {
                        ++resp.red;
                    } else if (votes[i].color === 'green') {
                        ++resp.green;
                    } else {
                        throw new Error('color ' + votes[i].color + ' not allowed');
                    }
                    ++resp.locationCount[votes[i].location];
                };
                return reply(resp);
            });
        }
    });

    next();
};

module.exports.register.attributes = {
    name: 'route-stats',
    version: '1.0.0'
};
