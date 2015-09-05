'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('usuarios-mobile').factory('UsuariosMobile', ['$resource',
	function($resource) {
		return $resource('usuarios-mobile/:usuarioMobileId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);