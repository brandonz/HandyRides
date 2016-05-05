(function() {
    'use strict';

    angular
        .module('handyrides')
        .controller('modalController', modalController);


    function modalController($modalInstance, eventObj) {
        var vm = this;
        vm.cancel = cancel;
        vm.event = eventObj;
        // console.log(vm.event);


        function cancel () {
            $modalInstance.dismiss();
        }

    }

})();