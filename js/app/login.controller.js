// main controller
(function(){
	'use strict';

	angular
		.module('handyrides')
		.controller('loginController', controller);

	function controller($scope, $q, $modal){
		var vm = $scope;
		vm.openModal = openModal;

		function openModal() {
			var modalInstance = $modal.open({
				templateUrl: 'material-login-form/index.html',
				controller: 'modalController',
				size: 'lg'
			});
		}

	}
	
})();