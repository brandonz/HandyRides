(function() {
    'use strict';

    angular
        .module('handyrides')
        .controller('listController', modalController);


    function modalController($modalInstance, $resource, eventid, status, $window) {
        var vm = this;

        vm.status = status;
        vm.id = eventid.id;
        vm.users = [];


        vm.cancel = cancel;
        vm.sendemail = sendemail;

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

        function sendemail(email, fname) {
            console.log('test');
            var link = "mailto:"+ email
             + "?subject=HandyRides"
             + "&body=" + escape("Hello "+fname+", I would like to request a ride with you!")

            $window.location.href = link;
            // $window.open("mailto:"+ email + "?subject=HandyRides&body=Hello "+fname+", I would like to request to ride with you!","_self");
        }
    }

})();