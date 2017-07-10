(function () {

    'use strict';

    var config = {
        openWeatherToken: '613c67d122bcea0620f7e94d83efa1db',
        temperatureUnit: 'C',
        tabs: [
            {
                name: 'Inicio',
                path: '/',
                show: true
            },
            {
                name: 'Por horas',
                path: '/hourly',
                show: false
            },
            {
                name: 'Otra vista',
                path: '/otra',
                show: false
            }
        ]

    };

    angular
        .module('weatherApp')
        .constant('appConfig', config);


}());