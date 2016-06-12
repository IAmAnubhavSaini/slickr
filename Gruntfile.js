module.exports = grunt => {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eslint: {
      target: ['Gruntfile.js', 'src/Slickr.js']
    },
    uncss: {
      dist: {
        files: {
          'build/css/Slickr.css': ['src/index.html']
        }
      }
    }
  });
  grunt.registerTask('default', ['eslint', 'uncss']);
};
