module.exports = grunt => {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eslint: {
      target: ['Gruntfile.js', 'App/scripts/app.js']
    },

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        expand: true,
        cwd: 'App/public/scripts/',
        src: '*.js',
        dest: 'Dist/public/scripts/',
        ext: '.min.js',
        extDot: 'last'
      }
    },

    clean: {
      dist: ["Dist/*"]
    },

    /* I want sass to take care of SCSS and SASS files. */
    sass: {
      self: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'App/public/styles/',
          src: ['*.scss'],
          dest: 'Dist/public/styles/',
          ext: '.min.css'
        }]
      }
    },

    copy: {
      html: {
        files: [{
          expand: true,
          cwd: 'App/',
          src: ['*.html'],
          dest: 'Dist/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: 'App/public/fonts/',
          src: ['*'],
          dest: 'Dist/public/fonts/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'App/public/images',
          src: ['*'],
          dest: 'Dist/public/images/'
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'App/public/styles/',
          src: ['*.css', '!*.min.css', '!*.scss'],
          dest: 'Dist/public/styles/',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.registerTask('default', [
    'eslint',
    'clean:dist',
    'uglify',
    'sass:self',
    'copy:html',
    'copy:fonts',
    'copy:images',
    'cssmin'
  ]);
  /* sass:self gotta come before cssmin */
};
