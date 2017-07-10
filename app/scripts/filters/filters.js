(function () {

    'use strict';

    angular
        .module('weatherApp.core')
        .filter('percentage', function () {
            return percentage;
        })
        .filter('speed', function () {
            return speed;
        })
        .filter('pressure', function () {
            return pressure;
        })
        .filter('rain', function () {
            return rain;
        })
        .filter('capitalize', function () {
            return capitalize;
        })
        .filter('temperature', function () {
            return temperature;
        });

    var degreesSymbol = '\u00B0';

    function percentage(input) {
        return input + '%';
    }

    function speed(input) {
        return input + 'm/s';
    }

    function pressure(input) {
        return input + 'hpa';
    }

    function rain(input) {
        return input + 'mm';
    }

    function capitalize(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }

    function temperature(input, format = 'C', usedUnit = 'C') {

        format = String(format.toUpperCase());

        var convertedValue;

        if (isNaN(input) || (format !== 'C' && format !== 'F')) {
            return input;
        }

        if (format === usedUnit) {
            convertedValue = input;
        }
        else if (format === 'F') {
            convertedValue = convertCelsiusToFahrenheit(input);
        }
        else {
            convertedValue = convertFahrenheitToCelsius(input);
        }

        return addDegreesSymbol(convertedValue, format);
    }

    function convertCelsiusToFahrenheit(value) {
        return Math.round(value * 9.0 / 5.0 + 32);
    }

    function convertFahrenheitToCelsius(value) {
        return Math.round((value - 32) * 5.0 / 9.0);
    }

    function addDegreesSymbol(value, format) {
        return Math.round(value) + degreesSymbol + format;
    }

})();
