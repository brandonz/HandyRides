// main search controller
(function(){
    'use strict';

    angular
        .module('handyrides')
        .controller('searchController', controller);

    function controller($scope, searchService){
        var vm = $scope;
        vm.events = null;   //events data from Eventbrite API
        vm.pos = {          //browser position
            lat: 0,
            lng: 0,
            accuracy: 0
        };
        vm.error = "";      //error message
        vm.show = show;     //boolean function
 
        // get user's location and events around them
        getLocation()

        // makes a call to the Eventbrite API through the searchService
        function getEvents(position) {
            searchService.getEvents(position)
                .then(function(data){
                    vm.events = data;
                    // $scope.$apply();
                }, function(error){
                    vm.error = error;
                });
        }

        // basic function to determine if a section should be shown
        // based on if an error message was returned by geolocation
        function show() {
            return vm.error == "";
        };

        // callback function for getLocation()
        // sets position and calls getEvents()
        function showPosition(position) {
            vm.pos.lat = position.coords.latitude;
            vm.pos.lng = position.coords.longitude;
            vm.pos.accuracy = position.coords.accuracy;
            // $scope.$apply();
            getEvents(vm.pos);
        }

        // callback function error for getLocation()
        // sets error message
        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    vm.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    vm.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    vm.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    vm.error = "An unknown error occurred."
                    break;
            }
            // $scope.$apply();
        };

        // calls geolocation.getCurrentPosition
        // uses two callback functions: showPosition and showError
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            }
            else {
                vm.error = "Geolocation is not supported by this browser.";
            }
        };
    }

})();
