(function () {

    'use strict';

    angular
        .module('weatherApp.init')
        .controller('initCtrl', initCtrl);

    /*@ngInject*/ /* jshint validthis: true */
    function initCtrl(weatherService, appDataFactory, appConfig, openweatherFactory, $timeout) {

        var vm = this;
        var currentPrediction = appDataFactory.getCurrentPrediction();

        vm.search = search;
        vm.getAlertClasses = getAlertClasses;

        vm.unitTempUsed = appConfig.temperatureUnit;
        vm.error = null;
        vm.prediction = null;
        vm.loading = false;
        vm.city = appDataFactory.getCity();
        vm.citySaved = appDataFactory.getCity();

        if (!angular.equals({}, currentPrediction) && currentPrediction != null) {
            saveResponse(currentPrediction);
        }

        ///////////////////////////

        function search() {

            // Don´t show loader till 300ms elapsed
            vm.timeout = $timeout(function () {
                vm.loading = true;
            }, 300);

            weatherService.getCurrent(vm.city).then(getCurrentComplete, getCurrentFailed);

            function getCurrentComplete(data) {

                // Hide loader
                $timeout.cancel(vm.timeout);
                vm.loading = false;

                vm.citySaved = vm.city;
                appDataFactory.setCity(vm.city);
                vm.prediction = data;
                appDataFactory.setCurrentPrediction(data);
                vm.error = null;
                saveResponse(data);
            }

            function getCurrentFailed(error) {

                // Hide loader
                $timeout.cancel(vm.timeout);
                vm.loading = false;

                vm.error = `Ciudad no encontrada: ${vm.city}`;
                resetSearch();
            }

        }

        function saveResponse(data) {

            vm.description = data.weather[0].description;
            vm.img = openweatherFactory.getIconUrl(data.weather[0].icon);
            vm.temperature = data.main.temp;
            vm.wind = data.wind.speed;
            vm.pressure = data.main.pressure;
            vm.humidity = data.main.humidity;
            vm.sunrise = data.sys.sunrise * 1000;
            vm.sunset = data.sys.sunset * 1000;
            vm.googleMaps = `http://www.google.com/maps/place/${data.coord.lat},${data.coord.lon}`;

        }

        function resetSearch() {
            vm.citySaved = '';
            appDataFactory.setCity(vm.citySaved);
            vm.city = '';
        }

        function getAlertClasses() {

            return {
                'alert-warning': vm.error !== null
            };

        }

    }

}());