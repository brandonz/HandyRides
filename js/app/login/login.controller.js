// main controller
(function(){
	'use strict';

	angular
		.module('login')
		.controller('loginController', controller);

	function controller($scope, $q, $cookies, loginService, $window, $location, $anchorScroll){
		var vm = $scope;
		vm.login = login;
		vm.create = create;
		vm.text = "";

		function create(fname, lname, email, passw, passw2) {
			if (passw != passw2) {
				vm.test="pass don't match";
			}
			else {
				loginService.create(fname, lname, email, passw)
					.then(function(result){
						if (result.message == "User already exists!") {
							vm.test = "user exists";
						}
						else {
							$cookies.email = email;
							$cookies.passw = passw;
							vm.test = "user created!"
							$window.location.href = "https://brandonz.mycpanel2.princeton.edu/HandyRides/index.html";
						}
					});
			}
		}

		function login(email, passw) {
			loginService.login(email, passw)
				.then(function(result){
					if (result.length == 0) {
						vm.text = "Invalid Username or Password!"
						$location.hash('templatemo-top');

					    // call $anchorScroll()
					    $anchorScroll();
					}
					else {
						$cookies.email = email;
						$cookies.passw = passw;
						$window.location.href = "https://brandonz.mycpanel2.princeton.edu/HandyRides/index.html";
					}
				});
		}

		function test() {
			console.log($cookies.email);
			console.log($cookies.passw);
			console.log("---------");
		}
	}
	
})();