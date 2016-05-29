// Project configuration
module.exports = function( grunt ) {
    grunt.initConfig( {
            jshint: {
                all: [ "Gruntfile.js",
                        "javascript/**/*.js", "app.js" ],
                options:{
                    jshintrc: ".jshintrc"
                }
            },
            jscs: {
                all: [ "Gruntfile.js",
                    "javascript/**/*.js", "app.js" ],
                options:{
                    config: ".jscsrc"
                }
            },
            karma: {
                unit: {
                    configFile: "karma.conf.js",
                    singleRun: true
                    }
                },
                concat: {
                    controllers: {
                        src: [ "javascript/Controllers/*.js" ],
                        dest: "javascript/Controllers/controllers.js"
                    },
                    services: {
                        src: [ "javascript/Services/*.js" ],
                        dest: "javascript/Services/services.js"
                    }
                }
     } );

    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-jscs" );
    grunt.loadNpmTasks( "grunt-karma" );
    
    // Default task(s).
    grunt.registerTask( "default", [ "jshint", "jscs", "concat" ] );
};
