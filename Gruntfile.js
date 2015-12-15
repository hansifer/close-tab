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
		},
		deploy: {
			chrome: {
				options: {
					mode: 'chrome'
				},
				src: ['dist/chrome']
			},
			opera: {
				options: {
					mode: 'chrome' // opera uses same mode as chrome
				},
				src: ['dist/opera']
			}
		},
		compress: {
			generic: { // relies on tasks to modify config values accordingly
				options: {
					archive: '<destination zip file>',
					pretty: true
				},
				files: [{
					expand: true,
					cwd: '<source folder>',
					src: ['**']
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('default', ['jshint', 'chrome', 'opera']);
	grunt.registerTask('chrome', ['jshint', 'clean:pre_chrome', 'copy:dist_chrome', 'copy:manifest_chrome', 'clean:post_chrome']);
	grunt.registerTask('opera', ['jshint', 'clean:pre_opera', 'copy:dist_opera', 'copy:manifest_opera', 'clean:post_opera']);

	var taskQueue;
	grunt.registerTask('popTaskConfig', 'pop and populate a task config from taskQueue', function() {
		if (taskQueue && taskQueue.length) {
			var configUpdates = taskQueue.shift().config;

			for (var i = 0; i < configUpdates.length; i++) {
				grunt.config(configUpdates[i].property, configUpdates[i].value);
			}
		}
	});

	grunt.registerMultiTask('deploy', 'Deploy dist code', function() {
		taskQueue = []; // clear task queue

		var options = this.options({
			mode: 'chrome' // default
		});

		this.filesSrc.forEach(function(path) {
			if (!grunt.file.isDir(path)) {
				grunt.fail.warn('Not a folder: ' + path);
			}

			if (options.mode === 'chrome') {
				processChromeFolder(path);
			}
			// todo: safari, etc
		});

		for (var i = 0; i < taskQueue.length; i++) {
			grunt.task.run('popTaskConfig');
			grunt.task.run(taskQueue[i].task);
		}

		function processChromeFolder(path) {
			var manifest = path + '/manifest.json';

			if (!grunt.file.exists(manifest)) {
				grunt.fail.warn('Chrome manifest path does not exist: ' + manifest);
			}

			var match = /"version"\s*:\s*"([0-9](?:\.[0-9]+)*)"/.exec(grunt.file.read(manifest));

			if (match.length > 1) {
				var folderName = path.split('/');
				folderName = folderName[folderName.length - 1];

				taskQueue.push({
					task: 'compress:generic',
					config: [{
						property: 'compress.generic.files.0.cwd',
						value: path
					}, {
						property: 'compress.generic.options.archive',
						value: '../releases/' + folderName + '.' + match[1] + '.zip'
					}]
				});
			} else {
				grunt.fail.warn('Bad app version in manifest: ' + match[0]);
			}
		}
	});

};
