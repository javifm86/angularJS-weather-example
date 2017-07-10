(function () {
    'use strict';

    angular
        .module('weatherApp.component.customTable')
        .component('customTable', {
            templateUrl: 'scripts/components/custom-table/custom-table.html',
            controller: ControllerController,
            bindings: {
                weatherHourly: '=',
                unitTemp: '='
            },
        });

    /*@ngInject*/
    function ControllerController(openweatherFactory) {
        var ctrl = this;

        ////////////////

        ctrl.$onInit = function () { };
        ctrl.$onChanges = function (changesObj) { };
        ctrl.$onDestory = function () { };

        ctrl.getImg = function (icon) {
            return openweatherFactory.getIconUrl(icon);
        };
    }
})();