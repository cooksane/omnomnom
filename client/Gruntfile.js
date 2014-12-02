var path = require("path");
var fs = require("fs");
var hb = require("handlebars");
var underscore = require("underscore");

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            dev: {
                options: {
                    install: false,
                    layout: "byComponent",
                    cleanTargetDir: true,
                    targetDir: "static/lib"
                }
            }
        },

        // Compile less files
        less: {
            dev: {
                files: {
                    'static/css/main.css': 'less/main.less'
                }
            }
        },

        handlebars: {
            dev: {
                files: {
                    "static/templates.js": ["templates/**/*.hbs"]
                },
                options: {
                    namespace: 'nom.templates',
                    processName: function(filePath) {
                        var pieces = filePath.split("/");
                        return pieces[pieces.length - 1].replace('.hbs', ''); 
                    }
                }
            }
        },
        /*
        requirejs: {
            compile: {
                options: {
                    name: 'main',
                    baseUrl: 'app/js/',
                    mainConfigFile: 'app/js/main.js',
                    out: 'prod/js/main.js'
                }
            }
        },
        */
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['static/lib/**/*.js']
            },
            grunt: ['./Gruntfile.js'],
            src: ['static/js/**/*.js']
        },

        connect: {
            dev: {
                options: {
                    port: 8080,
                    base: 'static/'
                }
            }
        },

        watch: {
            options: {
                // Trigger a live reload when watch targets are triggered. Requires
                // a script tag in your HTML.
                // https://github.com/gruntjs/grunt-contrib-watch#enabling-live-reload-in-your-html
                livereload: true
            },
            html: {
                files: ['static/index.html']
            },

            // When less files are changed, just run less compilation
            less: {
                files: ['less/**/*.less'],
                tasks: ['less:dev'],
                options: {
                    event: ['changed']
                }
            },

            js: {
                files: ['static/js/**/*.js'],
                tasks: ['jshint']
            },

            handlebars: {
                files: ['templates/**/*.hbs'],
                tasks: ['handlebars']
            }

        }

    });
    
    grunt.registerTask('build', ['bower:dev', 'handlebars', 'less:dev', 'jshint']);
    grunt.registerTask('default', ['build', 'connect:dev', 'watch']);
    
};
