module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // jshint: {
    //   files: ['app/**/*.js'],
    //   // configure JSHint (documented at http://www.jshint.com/docs/)
    //   options: {
    //       // more options here if you want to override JSHint defaults
    //     globals: {
    //       FirebaseSimpleLogin: true,
    //       Firebase: true,
    //       angular: true,
    //       _: true,
    //       jQuery: true,
    //       console: true,
    //       module: true
    //     }
    //   }
    // },
    
    concat: {
      dist: {
        dest: 'dist/<%= pkg.name %>.js',
        src: [
          'vendor/angular-route.min.js',
          'vendor/narrator.js',
          'app/app.js',
          'app/providers/**/*.js',
          'app/services/**/*.js',
          'app/modules/**/*.js',
          'app/config.js',
          'app/**/*.js'
        ]
      }
    },
    
    watch: {
      scripts: {
        files: ['app/**/*.js'],
        tasks: ['build']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Tasks
  grunt.registerTask('build', ['concat']);
};