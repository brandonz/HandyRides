(function() {
    'use strict';

    angular
        .module('handyrides')
        .directive('search', search);

    function search(){
        var directive =
        {
            restrict:'E',
            templateUrl:'./js/app/directives/search.directive.html'
        };

        return directive;
    }

})();