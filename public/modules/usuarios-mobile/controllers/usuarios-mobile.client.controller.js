'use strict';

angular.module('usuarios-mobile').controller('UsuarioMobileController', ['$scope', '$stateParams', '$location', 
	'Authentication', 'UsuariosMobile', 
	'DTOptionsBuilder', 
	'DTColumnDefBuilder', 
	'editableOptions', 
	'editableThemes',
	function($scope, $stateParams, $location, Authentication, UsuariosMobile, 
		DTOptionsBuilder, 
		DTColumnDefBuilder,
		editableOptions, 
		editableThemes) {
		$scope.authentication = Authentication;

		this.dtOptions = DTOptionsBuilder
		.newOptions()
	    .withPaginationType('full_numbers')
	    .withOption('bLengthChange', false)
	    .withOption('bInfo', false)
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
		editableThemes.bs3.buttonsClass = 'btn-sm';
		editableThemes.bs3.submitTpl = '<button type="submit" class="btn btn-success" ng-click="saveItem(item)"><span class="fa fa-check"></span></button>';
		editableThemes.bs3.cancelTpl = '<button type="button" class="btn btn-default" ng-click="$form.$cancel()">'+
		                               '<span class="fa fa-times text-muted"></span>'+
		                             '</button>';

		// Context
		$scope.authentication = Authentication;
		$scope.usuariosMobile = UsuariosMobile.query();

		$scope.addItem = function(item) {
			var novoUsuario = {
				name: null,
				email: null
			};
			$scope.usuariosMobile.unshift(novoUsuario);
		};

		$scope.editItem = function(item) {
			$scope.editEmail.$show();
		};

		$scope.saveItem = function(item) {
			console.log(item);
		};

		$scope.deleteConfirm = function(index) {
			noty({
				modal: true,
		        text: 'Tem certeza que deseja deletar o registro?', 
		        buttons: [
		            { addClass: 'btn btn-primary', text: 'Sim', onClick: function($noty) {
		                    $noty.close();
		                    var caixa = $scope.caixas[index];

							if (caixa) {							
								caixa.$remove( function (response) {
									if (response) {
										$scope.caixas = _.without($scope.caixas, caixa);

										noty({
										    text: response.message,
										    type: response.type
										});
									}
								}, function(errorResponse) {
									$scope.error = errorResponse.data.message;
									noty({
									    text: errorResponse.data.message,
									    type: errorResponse.data.type
									});
								});
							}
		                }
		            },
		            { 
		                addClass: 'btn btn-warning', text: 'Não', onClick: function($noty) {
		                    $noty.close();
		                }
		            }
		        ]
		    }); 
		};
	}
]);