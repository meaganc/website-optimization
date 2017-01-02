module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-inline');

	grunt.initConfig({
		watch: {
			sass: {
				files: 'src/sass' + "**/*.scss",
				tasks: ["sass"]
			},
		},
    inline: {
      dist: {
        options:{
          cssmin: true,
          tag: ''
        },
        src: 'unminified-index.html',
        dest: 'index.html'
      }
    }
	});

	grunt.registerTask('default', [
		'watch',
    'inline'
	]);
};
