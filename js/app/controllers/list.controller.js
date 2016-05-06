(function() {
    'use strict';

    angular
        .module('handyrides')
        .controller('listController', modalController);


    function modalController($modalInstance, $resource, eventid, status) {
        var vm = this;

        vm.status = status;
        vm.id = eventid.id;
        vm.users = [];

        vm.cancel = cancel;

        populate();

        function cancel () {
            $modalInstance.dismiss();
        }

        function populate() {
            $resource("https://handyrides-server.herokuapp.com/api/events/:eventid").query({eventid: eventid}).$promise
                .then(function(result){
                    var usersData = result[0].users;
                    angular.forEach(usersData, function(user){
                        if (user.status!=status)
                            vm.users.push(user);
                    });
                });
        }

    }

})();