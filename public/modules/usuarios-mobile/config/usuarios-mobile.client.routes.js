'use strict';

// Setting up route
angular.module('usuarios-mobile').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('app.listUsuariosMobile', {
			url: '/usuarios-mobile',
			title: 'Listar Usuários Mobile',
			templateUrl: 'modules/usuarios-mobile/views/list-usuarios-mobile.client.view.html'
		});
	}
]);