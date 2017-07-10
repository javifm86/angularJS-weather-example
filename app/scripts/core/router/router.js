(function () {

    'use strict';

    angular
        .module('weatherApp.core.router', ['ngRoute'])
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.hashPrefix('');
        }])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'initCtrl',
                    controllerAs: 'vm',
                    templateUrl: 'scripts/mods/init/init.html'
                })
                .when('/hourly', {
                    controller: 'hourlyCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        factory: checkRouting
                    },
                    templateUrl: 'scripts/mods/hourly/hourly.html'
                })
                .when('/otra', {
                    controller: 'otraCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        factory: checkRouting
                    },
                    templateUrl: 'scripts/mods/otra/otra.html'
                });
        });

    /*@ngInject*/
    function checkRouting(appDataFactory, $location) {

        var city = appDataFactory.getCity();
        if (city === '' || city == null) {
            $location.path('/');
        }
        else {
            return true;
        }

    }

})();