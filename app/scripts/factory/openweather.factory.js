(function () {
    'use strict';

    angular
        .module('weatherApp.openweather', [])
        .factory('openweatherFactory', openweatherFactory);

    /*@ngInject*/
    function openweatherFactory() {

        var factory = {
            getIconUrl: getIconUrl,
            getUrlBase: getUrlBase,
        };

        return factory;

        ///////////////////////////

        function getIconUrl(icon) {
            return `http://openweathermap.org/img/w/${icon}.png`;
        }

        function getUrlBase() {
            return 'http://api.openweathermap.org/data/2.5/';
        }

    }

})();