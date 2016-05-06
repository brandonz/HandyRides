// main search service

(function(){
	'use strict';

	angular
		.module('handyrides')
		.factory('searchService', service);

	function service($resource, $q) {
		// OAuth token
		var token = "YYAA4KPR2XGASFRF6JIH";

		// returned resources and function to make requests to the eventResource
		var service = {
			eventResource: $resource('https://www.eventbriteapi.com/v3/events/search/'),
			testResource1: $resource('http://ip-api.com/json'),
			testResource2: $resource('https://api.ipify.org/'),
			getEvents: getEvents
		};

		return service;

		// makes a call to the eventResource with the users position
		function getEvents(position) {
			// return service.testResource1.get().$promise;
			// return service.testResource2.get({format:'json'}).$promise;
			return $resource('https://www.eventbriteapi.com/v3/events/search/' + '?token=' + token).get({'location.latitude': position.lat, 'location.longitude': position.lng}).$promise;
		}
	}

})();