(function () {

    'use strict';

    angular
        .module('weatherApp')
        .controller('AppCtrl', AppCtrl);

    /*@ngInject*/
    function AppCtrl(appConfig, $rootScope) {

        var vmApp = this;
        vmApp.tabs = angular.copy(appConfig.tabs);

        // Bind to access directive
        vmApp.control = {};

        $rootScope.$on('rootScope:citySetted', function (event, data) {
            vmApp.control.showHiddenLinks();
        });

        $rootScope.$on('rootScope:cityUnsetted', function (event, data) {
            vmApp.tabs = angular.copy(appConfig.tabs);
        });

    }

}());