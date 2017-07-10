# angularJS-weather-example
Dummy app developed just for learning AngularJS framework. The modularity present in this simple app would not be neccessary in real scenario and perhaps the scaffolding could be improved.

## Requirements ##
- Develop environment based on Gulp Tasks.
- Node version: `6.10.3`
- Gulp version: `3.9.1`
- Register for free and get your token in [OpenWeatherMap](https://openweathermap.org/api).

## Instalation ##
Edit the following info in `app/scripts/core/appConfig.js`.  

- Put your openweather token in `openWeatherToken`.  

Install dependencies:  

    npm install 

## Gulp ##
Main tasks used in development:
- `gulp default` or just `gulp`: Build app for development in `.tmp` folder. Delete `.tmp` folder if exists, pass babel compiler and concatenate JS files into `main.js`. Compile SASS and pug files and finally create web server connected with BrowserSync with livereload ([http://localhost:3000/](http://localhost:3000)).
- `gulp build`: Create bundle for app on `dist` folder running same tasks than default task, adding uglify for JS, minify for HTML, and purify for CSS.
- `gulp launch`: Run build task and create web server for testing app bundle on local.
- There are watchers while developing that compile and concat JS, SASS  and pug files and reload automatically local web server.

## Libraries and tools used ##
- AngularJS 1.6.4 with Angular Router.
- Bootstrap 3 for some CSS styling.
- Pug as template engine for HTML.
