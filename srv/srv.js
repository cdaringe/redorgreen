'use strict';
var Hapi = require('hapi');
var path = require('path');
var server = new Hapi.Server({
    connections: {
        routes: {
            cors: {
                credentials: true // allows cookie sending and setting from client
            }
        }
    }
});
var port = 8081;
server.connection({ port: port });
var glob = require('glob');
var plugins = [];

glob.sync(__dirname + '/lib/routes/*.js').forEach(function(file) {
    plugins.push({
        register: require(file),
        options: {}
    });
});

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
});

server.register(require('inert'), function (err) {
    if (err) {
        console.error('Failed to load plugin:', err);
    }
    console.info('inert loaded');
});

server.register(plugins, function(err) {
    if (err) {
        console.log('Error registering plugins', err);
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

module.exports = server;
