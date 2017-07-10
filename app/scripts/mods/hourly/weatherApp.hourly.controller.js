(function () {

    'use strict';

    angular
        .module('weatherApp.hourly')
        .controller('hourlyCtrl', hourlyCtrl);

    /*@ngInject*/ /* jshint validthis: true */
    function hourlyCtrl(appDataFactory, weatherService, $filter, appConfig, $timeout) {

        var vm = this;
        var prediction = appDataFactory.getHourlyPrediction();

        vm.city = appDataFactory.getCity();
        vm.loading = false;
        vm.componentList = null;
        vm.unitTempUsed = appConfig.temperatureUnit;

        if (angular.equals({}, prediction) || prediction == null) {

            // Don´t show loader till 300ms elapsed
            vm.timeout = $timeout(function () {
                vm.loading = true;
            }, 300);
            weatherService.getHourly(vm.city).then(getHourlyComplete, getHourlyFailed);
        }
        else {
            getHourlyComplete(prediction);
        }

        ///////////////////////////

        function getHourlyComplete(data) {

            // Hide loader
            $timeout.cancel(vm.timeout);
            vm.loading = false;

            appDataFactory.setHourlyPrediction(data);
            vm.componentList = {};

            for (var i = 0; i < data.list.length; i++) {
                var filtered = $filter('date')(data.list[i].dt * 1000, 'd MMMM yyyy');
                if (vm.componentList[filtered] == null) {
                    vm.componentList[filtered] = [];
                }

                var elem = data.list[i];
                vm.componentList[filtered].push({
                    date: elem.dt * 1000,
                    icon: elem.weather[0].icon,
                    temp: elem.main.temp,
                    description: elem.weather[0].description,
                    rain: elem.rain != null ? elem.rain['3h'] : null,
                    windSpeed: elem.wind.speed,
                    clouds: elem.clouds.all
                });
            }

        }

        function getHourlyFailed(error) {

            // Hide loader
            $timeout.cancel(vm.timeout);
            vm.loading = false;
            console.error(error);
        }

    }

}());