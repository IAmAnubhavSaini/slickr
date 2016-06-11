module.exports = grunt => {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        eslint: {
    		target: ['src/*.js']
    	}
    });
    grunt.registerTask('default', []);
};
