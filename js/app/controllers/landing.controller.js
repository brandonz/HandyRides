// main search controller
(function(){
    'use strict';

    angular
        .module('handyrides')
        .controller('landingController', controller);

    function controller($scope, eventService){
        var vm = $scope;
        vm.events = null;   //events data from server
        vm.show = show;     //boolean function
        vm.error = '';

        // makes a call to the Eventbrite API through the searchService
        function getEvents(email) {
            eventService.getEvents(email)
                .then(function(data){
                    vm.events = data;
                    $scope.$apply();
                }, function(error){
                    vm.error = "Could not get events.";
                });
        }

        // basic function to determine if a section should be shown
        // based on if an error message was returned by geolocation
        function show() {
            return vm.error == "";
        };

        getEvents(email);

    }

})();
