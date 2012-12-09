/*global module:false*/
module.exports = function(grunt) {
  // Load testacular tasks
  grunt.loadNpmTasks('grunt-testacular');
  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>',
          '<file_strip_banner:lib/angular-d3.js>',
          '<file_strip_banner:lib/directives/d3.js>'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
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
        browser: true
      },
      globals: {}
    },
    uglify: {},
    testacularServer: {
      unit: {
        configFile: 'config/testacular.conf.js'
      },
      once: {
        configFile: 'config/testacular.conf.js',
        singleRun: true,
        options: {
          keepalive: true
        }
      }
    },
    testacularRun: {
      unit: {}
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min');
  grunt.registerTask('test', 'testacularServer:once');
  grunt.registerTask('testWatch', 'testacularServer:unit watch');
};
