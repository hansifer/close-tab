module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			gruntfile: {
				src: 'Gruntfile.js',
				options: {
					jshintrc: '.jshintrc'
				}
			},
			src: {
				src: ['src/*.js'],
				options: {
					jshintrc: '.jshintrc'
				}
			}
		},
		clean: {
			dist_chrome: ['dist/chrome/*'],
			dist_opera: ['dist/opera/*'],
			manifest_chrome: ['dist/chrome/manifest_*.json'],
			manifest_opera: ['dist/opera/manifest_*.json'],
			options_chrome: ['dist/chrome/options_tab.html'],
			options_opera: ['dist/opera/options_inline.html']
		},
		copy: {
			dist_chrome: {
				expand: true,
				cwd: 'src/',
				src: '**',
				dest: 'dist/chrome',
				timestamp: true
			},
			dist_opera: {
				expand: true,
				cwd: 'src/',
				src: '**',
				dest: 'dist/opera',
				timestamp: true
			},
			manifest_chrome: {
				expand: true,
				cwd: 'dist/chrome',
				src: 'manifest_chrome.json',
				dest: 'dist/chrome/',
				rename: function(dest) {
					return dest + 'manifest.json';
				},
				timestamp: true
			},
			manifest_opera: {
				expand: true,
				cwd: 'dist/opera',
				src: 'manifest_opera.json',
				dest: 'dist/opera/',
				rename: function(dest) {
					return dest + 'manifest.json';
				},
				timestamp: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['jshint', 'chrome', 'opera']);
	grunt.registerTask('chrome', ['jshint', 'clean:dist_chrome', 'copy:dist_chrome', 'copy:manifest_chrome', 'clean:manifest_chrome', 'clean:options_chrome']);
	grunt.registerTask('opera', ['jshint', 'clean:dist_opera', 'copy:dist_opera', 'copy:manifest_opera', 'clean:manifest_opera', 'clean:options_opera']);
};
