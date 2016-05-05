// main controller
(function(){
	'use strict';

	angular
		.module('handyrides')
		.controller('hrController', controller);

	function controller($scope, $q, $cookies, $window, $resource, $modal){
		var vm = $scope;
		vm.show = 'home';
		vm.change = change;
		vm.openModal = openModal;

		vm.user = {fname: ""};
		vm.email = $cookies.email;
		vm.passw = $cookies.passw;

		vm.logout = logout;

		// if both cookies don't exist
		if (!(vm.email && vm.passw))
			$window.location.href = "http://brandonz.mycpanel2.princeton.edu/public/login.html";
		// else get user data
		else {
			$resource('https://handyrides-server.herokuapp.com/api/users/:email/:passw').query({email:vm.email, passw: vm.passw}).$promise
				.then(function(result){
						if (result.length == 0)
							$window.location.href = "https://brandonz.mycpanel2.princeton.edu/public/login.html";
						else
							vm.user = result[0];
					});
		}

		function change(view) {
			vm.show = view;
		}

		function logout() {
			delete $cookies.email;
			delete $cookies.passw;
			$window.location.href = "https://brandonz.mycpanel2.princeton.edu/public/login.html";
		}

		function openModal(eventData) {
			var modalInstance = $modal.open({
				templateUrl: 'js/app/directives/info.directive.html',
				controller: 'modalController as mc',
				size: 'lg',
				resolve: {
					eventObj: function() {
						return eventData;
					}
				}
			});
		}

		function openRegisterModal(eventData) {
			var modalInstance = $modal.open({
				templateUrl: 'js/app/directives/register.directive.html',
				controller: 'modalController as mc',
				size: 'lg',
				resolve: {
					eventObj: function() {
						return eventData;
					}
				}
			});
		}
	}
	
})();