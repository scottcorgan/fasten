module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      scripts: {
        dest: 'dist/scripts/app.js',
        src: [
          'vendor/ui-bootstrap-0.6.0.js',
          'vendor/angular-route.js',
          'vendor/angular-sanitize.js',
          'vendor/angular-cookies.js',
          'vendor/narrator.js',
          'app/app.js',
          '.tmp/templates.js',
          'app/providers/**/*.js',
          'app/services/**/*.js',
          'app/modules/**/*.js',
          'app/config.js',
          'app/**/*.js'
        ]
      },
      css: {
        dest: 'dist/styles/app.css',
        src: [
          'styles/molten.css',
          'styles/ionicons.min.css',
          'styles/app.css'
        ]
      }
    },
    
    uglify: {
      scripts: {
        options:{
          mangle: false
        },
        files: {
          'dist/scripts/app.js': 'dist/scripts/app.js'
        }
      },
      fasten: {
        files: {
          'fasten.js': 'fasten.dev.js'
        }
      }
    },
    
    cssmin: {
      styles: {
        files: {
          'dist/styles/app.css': 'dist/styles/app.css'
        }
      }
    },
    
    copy: {
      html: {
        src: '*.html',
        dest: 'dist/'
      },
      scripts: {
        src: 'scripts/*',
        dest: 'dist/'
      },
      styles: {
        src: 'styles/home.css',
        dest: 'dist/'
      },
      fonts: {
        src: 'fonts/*',
        dest: 'dist/'
      },
      images: {
        expand: true,
        src: 'img/**',
        dest: 'dist/'
      },
      fasten: {
        src: 'fasten.js',
        dest: 'dist/'
      }
    },
    
    clean: {
      dist: {
        src: 'dist/'
      },
      tmp: {
        src: '.tmp/'
      }
    },
    
    divshot: {
      server: {
        options: {
          port: 9999
        }
      }
    },
    
    ngtemplates:  {
      Fasten: {
        options: {
          prefix: '/'
        },
        src:      'templates/**/*.html',
        dest:     '.tmp/templates.js'
      }
    },
    
    watch: {
      scripts: {
        files: [
          'app/**/*.js',
          'templates/**',
          'styles/**',
          'scripts/**',
          'vendor/**',
          'img/**',
          'fonts/**',
          '*.html'
        ],
        tasks: ['build']
      }
    }
  });
  
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-divshot');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  // Tasks
  grunt.registerTask('build', [
    'clean:dist',
    'ngtemplates',
    'concat',
    'copy',
    'uglify',
    'cssmin',
    'clean:tmp'
  ]);
  
  grunt.registerTask('server', [
    'divshot:server',
    'watch'
  ]);
  
  grunt.registerTask('deploy',[
    'build',
    'divshot:push:production'
  ]);
};