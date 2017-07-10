(function () {

    'use strict';

    angular
        .module('weatherApp')
        .factory('weatherService', weatherService);

    /*@ngInject*/
    function weatherService($http, $q, openweatherFactory, appConfig) {

        return {
            getCurrent: getCurrent,
            getDaily: getDaily,
            getHourly: getHourly
        };

        function getCurrent(cityName) {
            return getWeather('weather', cityName);
        }

        function getHourly(cityName) {
            return getWeather('forecast', cityName);
        }

        function getDaily(cityName) {
            return getWeather('daily', cityName);
        }

        function getWeather(strService, cityName) {

            var config = {
                'params': {
                    'q': cityName, // 'Madrid',
                    'lang': 'sp',
                    'units': 'metric',
                    'appid': appConfig.openWeatherToken
                }
            };

            var urlBase = openweatherFactory.getUrlBase();

            return $http.get(urlBase + strService, config)
                .then(getCurrentComplete)
                .catch(getCurrentFailed);

            function getCurrentComplete(response) {

                if (response.status !== 200) {
                    return $q.reject(response);
                }

                return response.data;
            }

            function getCurrentFailed(error) {
                return $q.reject(error);
            }
        }

    }

}());