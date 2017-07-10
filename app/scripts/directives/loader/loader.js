(function () {

    'use strict';

    angular
        .module('weatherApp')
        .directive('customLoader', customLoader);

    function customLoader() {

        var directive = {
            restrict: 'E',
            templateUrl: 'scripts/directives/loader/loader.html',
            scope: {},
            link: linkFunc,
            controller: LoaderController,
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    /*@ngInject*/ /* jshint validthis: true */
    function LoaderController() {

    }

}());