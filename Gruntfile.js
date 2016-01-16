module.exports = function (grunt) {

  'use strict';

  var opts = {

    pkg: grunt.file.readJSON('package.json'),

    simplemocha: {
      options: {
        globals: ['expect', 'should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: { src: ['test/*.js'] }
    },

    jshint: {
      options: {
        laxcomma: true,
        expr: true
      },
      all: ['Gruntfile.js', 'src/**/*.js', 'test/*.js']
    }

  };

  grunt.initConfig( opts );

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', 'Test the FRESH-JRS Converter.',
    function( config ) { grunt.task.run( ['jshint','simplemocha:all'] ); });
  grunt.registerTask('default', [ 'test' ]);

};
