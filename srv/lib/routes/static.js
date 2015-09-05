'use strict';
var _ = require('lodash');
var path = require('path');

module.exports.register = function(server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            console.dir(path.join(process.cwd(), '../', 'index.html'));
            return reply.file(path.join(process.cwd(), '../', 'index.html'));
        }
    });

    // server.route({
    //     method: 'GET',
    //     path: '/{filename}',
    //     handler: function (request, reply) {
    //         console.dir(request.url);
    //         return reply.file(path.join('../', request.params.filename));
    //     }
    // });
    //
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: path.join(process.cwd(), '../')
            }
        }
    });

    next();
};

module.exports.register.attributes = {
    name: 'route-static',
    version: '1.0.0'
};
