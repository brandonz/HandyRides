// event service to show what events a user is in

(function(){
	'use strict';

	angular
		.module('handyrides')
		.factory('eventService', service);

	function service($resource, $q) {

		var service = {
			eventResource: $resource('https://handyrides-server.herokuapp.com/api/events/:email'),
			getEvents: getEvents
		};

		return service;

		function getEvents(userEmail) {
			return service.eventResource.get({email:userEmail}).$promise;
		}
	}

})();