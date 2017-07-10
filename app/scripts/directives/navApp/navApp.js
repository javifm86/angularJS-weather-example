(function () {

    'use strict';

    angular
        .module('weatherApp')
        .directive('navApp', navApp);

    function navApp() {

        var directive = {
            restrict: 'E',
            templateUrl: 'scripts/directives/navApp/navApp.html',
            scope: {
                tabs: '=',
                control: '='
            },
            link: linkFunc,
            controller: NavController,
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

            // Make possible accesing directive scope from external controller
            scope.internalControl = scope.vm.control || {};

            /**
             * Link to controller function, we need bind for showHiddenLinks accessing to scope
             * although bindToController property. isPath method used internally gets correct scope
             * for example.
             */
            scope.internalControl.showHiddenLinks = ctrl.showHiddenLinks.bind(scope.vm);

        }
    }

    /*@ngInject*/ /* jshint validthis: true */
    function NavController($location) {

        return {
            isPath: isPath,
            showHiddenLinks: showHiddenLinks
        };

        function isPath(path) {
            return $location.path() === path;
        }

        
        function showHiddenLinks() {
            
            /* jshint validthis: true */
            var vm = this;

            vm.tabs.map(function (e) {
                e.show = true;
                return e;
            });

        }

    }

}());