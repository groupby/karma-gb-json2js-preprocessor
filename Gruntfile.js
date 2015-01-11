'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        eslint: {
            all: {
                src: [
                    '*.js',
                    'lib',
                    'test'
                ]
            }
        },

        jscs: {
            all: {
                src: [
                    '*.js',
                    'lib/**/*.js',
                    'test/**/*.js'
                ],
                options: {
                    config: '.jscsrc'
                }
            }
        },

        jsonlint: {
            all: {
                src: [
                    '.jshintrc',
                    '{lib,test}/**/*.json'
                ]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: false
            }
        }
    });

    // Load all grunt tasks matching the `grunt-*` pattern.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('lint', [
        'eslint',
        'jscs',
        'jsonlint'
    ]);

    grunt.registerTask('test', [
        'lint',
        'karma:unit'
    ]);

    grunt.registerTask('default', ['test']);
};
