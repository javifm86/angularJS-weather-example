'use strict';

// Gulp tasks setup:
module.exports = {

    pug: {
        srcIndex: 'app/index.pug',
        destIndex: '.tmp',
        distDestIndex: 'dist',
        src: [
            'app/**/*.pug',
            '!app/index.pug'
        ],
        distDest: 'dist',
        dest: '.tmp'
    },

    js: {
        src: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-i18n/angular-locale_es-es.js',
            'app/**/*.module.js',
            'app/**/*.js'
        ],
        distDest: 'dist/js',
        dest: '.tmp/js'
    },

    sass: {
        src: 'app/css/main.scss',
        distDest: 'dist/css',
        dest: '.tmp/css'
    },

    purifyCss: {
        target: [
            'app/**/*.js',
            'app/**/*.pug'
        ],
        options: {
            minify: true,
            info: true
        }
    },

    htmlmin: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeOptionalTags: true
    }

};