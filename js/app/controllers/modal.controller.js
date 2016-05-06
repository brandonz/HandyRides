(function() {
    'use strict';

    angular
        .module('handyrides')
        .controller('modalController', modalController);


    function modalController($modalInstance, $resource, eventObj, user) {
        var vm = this;

        vm.show = 'main';
        vm.event = eventObj;
        vm.user = user;
        // console.log(vm.event);

        vm.cancel = cancel;
        vm.change = change;
        vm.registerDriver = registerDriver;
        vm.registerRider = registerRider;


        function cancel () {
            $modalInstance.dismiss();
        }

        function change(view) {
            vm.show = view;
        }

        function registerDriver(seats, date, time, address) {
            $resource('https://handyrides-server.herokuapp.com/api/events/')
                .save({}, {email: vm.user.email, userstatus: "driver", eventid: vm.event.id, seats: seats, date: date, time: time, address: address}).$promise
                .then(function(res){
                    vm.cancel();
                });
            // console.log(seats + date + time + address + vm.user.email + vm.event.id);
        }

        function registerRider(email, eventid) {
            $resource('https://handyrides-server.herokuapp.com/api/events/')
                .save({}, {email: vm.user.email, userstatus: "rider", eventid: vm.event.id}).$promise
                .then(function(res){
                    vm.cancel();
                });

        }

    }

})();