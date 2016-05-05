// login service

(function(){
	'use strict';

	angular
		.module('login')
		.factory('loginService', service);

	function service($resource, $q) {

		var service = {
			createResource: $resource('https://handyrides-server.herokuapp.com/api/users'),
			loginResource: $resource('https://handyrides-server.herokuapp.com/api/users/:email/:passw'),
			create: create,
			login: login
		};

		return service;

		function create(fname, lname, email, passw) {
			return service.createResource.save({}, {fname: fname, lname:lname, email:email, passw: passw}).$promise;
		}

		function login(userEmail, userPass) {
			return service.loginResource.query({email:userEmail, passw: userPass}).$promise;
		}
	}

})();