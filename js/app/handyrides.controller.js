// main controller
(function(){
	'use strict';

	angular
		.module('handyrides')
		.controller('hrController', controller);

	function controller($scope, $q, $cookies, $window, $resource, $modal){
		var vm = $scope;
		vm.show = 'home';
		vm.loading = true;
		vm.change = change;
		vm.openModal = openModal;
		vm.openRegisterModal = openRegisterModal;
		vm.refresh = refresh();

		vm.user = {fname: ""};
		vm.email = $cookies.email;
		vm.passw = $cookies.passw;
		vm.userEvents = [];

		vm.logout = logout;

		// if both cookies don't exist
		if (!(vm.email && vm.passw))
			$window.location.href = "http://brandonz.mycpanel2.princeton.edu/HandyRides/login.html";
		// else get user data
		else {
			refresh();
		}

		function refresh() {
			vm.loading = true;
			$resource('https://handyrides-server.herokuapp.com/api/users/:email/:passw').query({email:vm.email, passw: vm.passw}).$promise
				.then(function(result){
						if (result.length == 0)
							$window.location.href = "https://brandonz.mycpanel2.princeton.edu/HandyRides/login.html";
						else
							vm.user = result[0];
							angular.forEach(vm.user.events, function(eventObj){
								$resource("https://www.eventbriteapi.com/v3/events/"+eventObj.id+"/?token=YYAA4KPR2XGASFRF6JIH").get({}).$promise
									.then(function(eventRes){
										// console.log(eventRes);
										var neventObj = eventRes;
										neventObj.userStatus = eventObj.status;
										vm.userEvents.push(eventRes);
									});
							});
							vm.loading = false;
					});
		}

		function change(view) {
			if (view == 'home')
				refresh();
			vm.show = view;
		}

		function logout() {
			delete $cookies.email;
			delete $cookies.passw;
			$window.location.href = "https://brandonz.mycpanel2.princeton.edu/HandyRides/login.html";
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
					},
					user: function() {
						return vm.user;
					}
				}
			});
		}
	}
	
})();