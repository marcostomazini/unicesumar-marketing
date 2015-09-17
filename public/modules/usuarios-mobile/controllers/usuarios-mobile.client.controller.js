'use strict';

angular.module('usuarios-mobile').controller('UsuarioMobileController', [
	'$scope', 
	'$interval',
	'$stateParams', 
	'$location', 
	'Authentication', 'UsuariosMobile', 
	'DTOptionsBuilder', 
	'DTColumnDefBuilder', 
	'editableOptions', 
	'editableThemes',
	'SweetAlert',
	'$modal',
	function($scope, 
		$interval,
		$stateParams, 
		$location, 
		Authentication, 
		UsuariosMobile, 
		DTOptionsBuilder, 
		DTColumnDefBuilder,
		editableOptions, 
		editableThemes,
		SweetAlert,
		$modal) {		

		$scope.authentication = Authentication;

		this.dtOptions = DTOptionsBuilder
		.newOptions()
	    .withPaginationType('full_numbers')
	    .withOption('bLengthChange', false)
	    .withOption('bInfo', false)
	    .withLanguageSource('/server/pt-br.json')
	    .withBootstrap();
	
		this.dtColumnDefs = [
			DTColumnDefBuilder
				.newColumnDef(0)
				.withOption('bSearchable', false)
				.notVisible()
				.notSortable(),
	        DTColumnDefBuilder
	        	.newColumnDef(1)
	        	.notSortable()
		];	

		$scope.urlBase = '/#!/usuarios-mobile';

		editableOptions.theme = 'bs3';
		editableThemes.bs3.inputClass = 'input-sm';

		// Context
		$scope.authentication = Authentication;
		$scope.usuariosMobile = UsuariosMobile.query();

		ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];
          function ModalInstanceCtrl($scope, $modalInstance) {

            $scope.ok = function () {
              $modalInstance.close('closed');
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          }

		$scope.addItem = function(item) {
			// var novoUsuario = {
			// 	name: null,
			// 	email: null
			// };
			// $scope.usuariosMobile.unshift(novoUsuario);				
			var modalInstance = $modal.open({
            	templateUrl: 'modalInserir.html',
            	controller: ModalInstanceCtrl,
            	//size: size
            });

            var state = $('#modal-state');
            modalInstance.result.then(function () {
            	state.text('Modal dismissed with OK status');
            }, function () {
            	state.text('Modal dismissed with Cancel status');
            });
		};

		$scope.editItem = function(item) {
			$scope.editEmail.$show();
		};

		$scope.saveItem = function(item) {
			console.log(item);

		};		

		$scope.deleteConfirm = function(index) {			
			SweetAlert.swal({   
				title: 'Você tem certeza?',   
				text: 'Após deletado não vai ser mais possível acessar o registro!',   
				type: 'warning',   
				showCancelButton: true,   
				confirmButtonColor: '#DD6B55',   
				confirmButtonText: 'Sim',   
				cancelButtonText: 'Não',
				closeOnConfirm: false,   
				closeOnCancel: false 
			}, function(isConfirm){  
				if (isConfirm) {
					var usuarioMobile = $scope.usuariosMobile[index];
					if (usuarioMobile) {							
						usuarioMobile.$remove( function (response) {
							if (response) {
								$scope.usuariosMobile = _.without($scope.usuariosMobile, usuarioMobile);

								SweetAlert.swal('Deletado!', 'O registro foi deletado.', 'success');
							}
						}, function(errorResponse) {
							$scope.error = errorResponse.data.message;
							SweetAlert.swal('Erro!', errorResponse.data.message, errorResponse.data.type);
						});
					}

				} else {     
					SweetAlert.swal('Cancelado', 'O registro não foi removido :)', 'error');   
				} 
            });
		};
	}
]);