'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	usuariosMobile = require('../../app/controllers/usuarios-mobile.server.controller');

module.exports = function(app) {
	app.route('/api/usuarios-mobile')
		.get(users.requiresLogin, usuariosMobile.list)
		.post(users.requiresLogin, usuariosMobile.create);

	app.route('/api/usuarios-mobile/:usuarioMobileId')
		.get(users.requiresLogin, usuariosMobile.read)
		.put(users.requiresLogin, usuariosMobile.hasAuthorization, usuariosMobile.update)
		.delete(users.requiresLogin, usuariosMobile.hasAuthorization, usuariosMobile.delete);

	// Finish by binding the article middleware
	app.param('usuarioMobileId', usuariosMobile.usuarioMobileByID);
};