(function () {

    'use strict';

    var moduleDependencies = [

        'ngRoute',

        // Core
        'weatherApp.core',

        // Factory
        'weatherApp.appData',
        'weatherApp.openweather',

        // Components
        'weatherApp.component',

        // Mods
        'weatherApp.init',
        'weatherApp.hourly',
        'weatherApp.otra'

    ];

    angular.module('weatherApp', moduleDependencies);

}());