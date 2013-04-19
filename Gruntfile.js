/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
          ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %\n */\n'
      },
      dist: {
        src: ['lib/**/*.js'],
        dest: 'dist/angular-d3.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/angular-d3.min.js': 'dist/angular-d3.js'
        }
      }
    },
    watch: {
      all: {
        files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
        tasks: ['default']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          angular: true,
          d3: true
        }
      }
    },
    karma: {
      unit: {
        configFile: 'config/karma.conf.js',
        background: true,
        options: {
          keepalive: true
        }
      },
      continuous: {
        configFile: 'config/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'karma:continuous', 'concat',
    'uglify']);
  grunt.registerTask('test', 'karma:continuous');
  grunt.registerTask('testWatch', ['karma:unit', 'watch']);
};
