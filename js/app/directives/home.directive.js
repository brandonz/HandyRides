(function() {
    'use strict';

    angular
        .module('handyrides')
        .directive('landing', landing);

    function landing(){
        var directive =
        {
            restrict:'E',
            templateUrl:'./js/app/directives/landing.directive.html'
        };

        return directive;
    }

})();