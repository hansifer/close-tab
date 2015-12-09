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
			pre_chrome: ['dist/chrome/*'],
			pre_opera: ['dist/opera/*'],
			post_chrome: ['dist/chrome/manifest_*.json', 'dist/chrome/options_tab.html', 'dist/chrome/img/logo16_opera.png', 'dist/chrome/img/logo19_opera.png', 'dist/chrome/img/logo38_opera.png'],
			post_opera: ['dist/opera/manifest_*.json', 'dist/opera/options_inline.html', 'dist/opera/img/logo16.png', 'dist/opera/img/logo19.png', 'dist/opera/img/logo38.png']
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
	grunt.registerTask('chrome', ['jshint', 'clean:pre_chrome', 'copy:dist_chrome', 'copy:manifest_chrome', 'clean:post_chrome']);
	grunt.registerTask('opera', ['jshint', 'clean:pre_opera', 'copy:dist_opera', 'copy:manifest_opera', 'clean:post_opera']);
};
