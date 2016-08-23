module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),

        'bower': {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: 'assets/bower_components',
                    cleanTargetDir: false
                }
            }
        },

        'jshint': {
            'beforeconcat': ['src/js/**/*.js'],
        },

        'html2js': {
            dist: {
                src: ['src/views/*.html'],
                dest: 'tmp/templates.js'
            }
        },

        'compass': {
            dist: {
                options: {
                    sassDir: 'src/styles',
                    cssDir: 'app/styles'
                }
            }
        },

        'copy': {
            'dist': {
                files: [
                    //{expand: true, cwd: 'src/styles', src: ['**'], dest: 'app/styles'},
                    {
                        expand: true,
                        cwd: 'libs',
                        src: ['**'],
                        dest: 'app/libs'
                    }, {
                        expand: true,
                        cwd: 'src/js',
                        src: ['**'],
                        dest: 'app/js'
                    }, {
                        expand: true,
                        cwd: 'src/views',
                        src: ['**'],
                        dest: 'app/views'
                    }, {
                        expand: true,
                        cwd: 'src',
                        src: ['index.html'],
                        dest: 'app'
                    }
                ],
            }
        },

        'concat': {
            options: {
                separator: ';'
            },
            'dist': {
                //'src': ['tmp/*.js', 'src/js/**/*.js'],
                'src': ['src/js/**/*.js'],
                'dest': 'app/<%= pkg.name %>.js'
            }
        },

        'uglify': {
            'options': {
                'mangle': false
            },
            'dist': {
                'files': {
                    'app/<%= pkg.name %>.min.js': ['app/<%= pkg.name %>.js']
                }
            }
        },

        'responsive_images': {
            'dist': {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: '100%',
                        name: 'large',
                        suffix: '.x2'
                    }, {
                        width: '66%',
                        name: 'medium',
                        suffix: '.x2'
                    }, {
                        width: '44%',
                        name: 'small',
                        suffix: '.x2'
                    }, {
                        width: '50%',
                        name: 'large'
                    }, {
                        width: '33%',
                        name: 'medium'
                    }, {
                        width: '22%',
                        name: 'small'
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['**/*.{jpg,gif,png}'],
                    dest: 'app/images'
                }]
            }
        },

        'compress': {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    src: ['app/**'],
                    dest: '/'
                }]
            }
        },

        'exec': {
            'webjar': {
                command: './make-webjar'
            }
        },

        'connect': {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9071,
                    base: 'app'
                }
            }
        },

        'express': {
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },

        'watch': {
            'dev': {
                files: ['Gruntfile.js', 'src/**'],
                tasks: ['build'],
                options: {
                    atBegin: true
                }
            },
            'min': {
                files: ['Gruntfile.js', 'src/**'],
                tasks: ['package'],
                options: {
                    atBegin: true
                }
            }
        },

        'clean': {
            temp: {
                src: ['tmp', 'app', 'dist']
            }
        },
    });

    grunt.registerTask('dev', ['bower', 'express:dev', 'watch:dev']);
    grunt.registerTask('minified', ['bower', 'connect:server', 'watch:min']);
    grunt.registerTask('build', ['bower', 'html2js', 'compass', 'copy', 'concat', 'responsive_images']);
    grunt.registerTask('package', ['build', 'uglify', 'compress', 'exec:webjar']);
};
