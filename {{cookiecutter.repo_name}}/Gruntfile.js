module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'webpack*.js', '__tests__/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                },
                esversion: 6,

            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        clean: [
            '{{cookiecutter.repo_name}}/build',
            'entry_point',
            'entry_point*.json',
        ],
        shell: {
            options: {
                stderr: false,
            },
            'genEntryPoints': {
                command: (process.env.PYTHON_EXE || 'python') + ' -m heptet_app.process_views2 production.ini -o entry_points.json',
            },
            'processViews': {
                command: 'process_views -c production.ini',
            },

        },
        webpack: {
            myConfig: function () {
                let webpackConfig;
                if (process.env.NODE_ENV !== 'production') {
                    webpackConfig = require('./webpack.dev');
                } else {
                    webpackConfig = require('./webpack.common');
                }
                return webpackConfig;
            },
        }
    });

    grunt.registerTask('default', ['jshint', 'shell:processViews', 'shell:genEntryPoints', 'webpack']);

};
