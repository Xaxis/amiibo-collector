module.exports = function(grunt) {
  grunt.initConfig ({

    /**
     * Import project information
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Project details
     */
    project: {
      public: '/app/',
      sass: '<%= project.public %>assets/sass',
      css: [
        '<%= project.public %>css/style.scss'
      ],
      js: [
        '<%= project.public %>js/*.js'
      ]
    },

    /**
     * Set project banner
     */
    tag: {
      banner: '/*!\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.title %>\n' +
      ' * @author <%= pkg.author %>\n' +
      ' * @version <%= pkg.version %>\n' +
      ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
      ' */\n'
    },

    /**
     * Sass task
     */
    sass: {
      dev: {
        options: {
          style: 'expanded',
          banner: '<%= tag.banner %>',
          compass: true
        },
        files: [
          {
            expand: true,
            cwd: 'app/assets/sass',
            src: ['**/main.scss'],
            dest: 'app/assets/css',
            ext: '.css'
          }
        ]
      },
      dist: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: [
          {
            expand: true,
            cwd: 'app/assets/sass',
            src: ['**/main.scss'],
            dest: 'app/assets/css',
            ext: '.css'
          }
        ]
      }
    },

    /**
     * Watch task
     */
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: [
          'app/*.js',
          'js/libs/native/**/*.js'
        ],
        options: {
          spawn: false
        },
        tasks: []
      },
      html: {
        files: [
          '**/*.html'
        ],
        options: {
          spawn: false
        }
      },
      sass: {
        files: 'app/assets/sass/**/*.{scss,sass}',
        tasks: ['sass:dev']
      }
    }
  });

  /**
   * Load grunt plugins
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'sass:dev',
    'watch'
  ]);
};
