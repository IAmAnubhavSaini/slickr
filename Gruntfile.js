module.exports = grunt => {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        eslint: {
            target: ['Gruntfile.js', 'src/Slickr.js']
    	}
    });
    grunt.registerTask('default', []);
};
