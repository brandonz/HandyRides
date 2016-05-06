(function() {
    'use strict';

    angular
        .module('handyrides')
        .controller('modalController', modalController);


    function modalController($modalInstance, eventObj) {
        var vm = this;

        vm.show = 'main';
        vm.event = eventObj;
        // console.log(vm.event);

        vm.cancel = cancel;
        vm.change = change;


        function cancel () {
            $modalInstance.dismiss();
        }

        function change(view) {
            vm.show = view;
        }

    }

})();