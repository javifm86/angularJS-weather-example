(function () {
    'use strict';

    angular
        .module('weatherApp.appData', [])
        .factory('appDataFactory', appDataFactory);

    /*@ngInject*/
    function appDataFactory($rootScope) {

        var city = '';
        var currentPrediction = {};
        var hourlyPrediction = {};

        var service = {
            setCity: setCity,
            getCity: getCity,
            setCurrentPrediction: setCurrentPrediction,
            getCurrentPrediction: getCurrentPrediction,
            setHourlyPrediction: setHourlyPrediction,
            getHourlyPrediction: getHourlyPrediction
        };

        return service;

        ///////////////////////////

        function getCity() {
            return city;
        }

        function setCity(val) {

            if (city === val) {
                return;
            }

            resetPredictions();
            city = val;

            if (city != null && city !== '') {
                $rootScope.$emit('rootScope:citySetted', city);
            }
            else {
                $rootScope.$emit('rootScope:cityUnsetted', city);
            }

        }

        function setCurrentPrediction(obj) {
            currentPrediction = obj;
        }

        function getCurrentPrediction() {
            return currentPrediction;
        }

        function setHourlyPrediction(obj) {
            hourlyPrediction = obj;
        }

        function getHourlyPrediction() {
            return hourlyPrediction;
        }

        function resetPredictions() {
            setCurrentPrediction({});
            setHourlyPrediction({});
        }

    }

})();