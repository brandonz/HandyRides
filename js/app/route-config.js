(function(){
	'use strict';

	angular
		.module('handyrides')
		.config(config);

	function config($locationProvider, $routeProvider){
		$locationProvider.html5Mode(true);

		$routeProvider.when('/home',
			{
				templateUrl: '../../templates/index.html'
			}
		);

		$routeProvider.otherwise({redirectTo: '/login.html'});
	}
})();