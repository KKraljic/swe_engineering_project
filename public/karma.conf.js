module.exports = function( karma ) {
  karma.set( {
    basePath: ".",

    files: [
      "node_modules/angular/angular.js",
      "node_modules/angular-ui-router/release/angular-ui-router.js",
      "node_modules/angular-mocks/angular-mocks.js",

      "frontend_modules/javascript/**/*.js"
    ],

    frameworks: [ "jasmine" ],

    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-spec-reporter"
    ],

    reporters: [
      "spec"
    ],

    specReporter: {
      maxLogLines: 5
    },

    port: 9018,
    runnerPort: 9100,
    urlRoot: "/",

    autoWatch: false,

    browserNoActivityTimeout: 50000,
    browserDisconnectTimeout: 8000,

    browsers: [
      "Chrome"
    ]
  } );
};
