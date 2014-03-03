var path = require('path');
var EXPRESS_PORT = process.env.port || 4000;
var EXPRESS_SERVER = path.resolve(__dirname, 'server.js');

module.exports = function (grunt) {

	require("grunt-timer").init(grunt);
	require("load-grunt-tasks")(grunt, { pattern: ["grunt-*", "!grunt-timer"] });

	grunt.initConfig({
		typescript: {
			options: {
				compile: true,
				target: "es5",
				module: "commonjs",
				sourcemap: true,
				ignoreTypeCheck: false
			},
			scripts: {
				src: ["src/scripts/**/*.ts"],
				dest: "tmp_scripts/src",
				options: { base_path: "src/scripts" }
			}
		},

		concat_sourcemap: {
			options: {
				sourcesContent: true
			},
			scripts: {
				files: {
					"phonegap-build/www/bundle.js": [
						"tmp_scripts/vendor/angular.js",
						"tmp_scripts/vendor/**/*.js",
						"tmp_scripts/src/index.js",
						"tmp_scripts/src/**/*.js"
					]
				}
			}
		},

		jade: {
			markup: {
				files: [{ expand: true, cwd: "src/markup", src: ["**/*.jade"], dest: "phonegap-build/www", ext: ".html" }]
			}
		},

		less: {
			styles: {
				files: { "phonegap-build/www/bundle.css": "src/styles/**/*.less" }
			}
		},

		copy: {
			content: {
				files: [{ expand: true, cwd: "src/content", src:["**"], dest: "phonegap-build/www" }]
			},

			scripts: {
				files: [
					{
						expand: true,
						src: [
							"bower_components/angular/angular.js",
							"bower_components/angular-animate/angular-animate.js",
							"bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
							"bower_components/angular-route/angular-route.js",
							"bower_components/fastclick/lib/fastclick.js",
							"bower_components/underscore/underscore.js"
						],
						dest: 'tmp_scripts/vendor',
						flatten: true
					}
				]
			}
		},

		clean: {
			tmp_scripts: ["tmp_scripts"]
		},

		express: {
			server: {
				options: {
					port: EXPRESS_PORT,
					server: EXPRESS_SERVER,
				}
			}
		}
	});

	grunt.registerTask("content", ["copy:content"]);
	grunt.registerTask("markup",  ["jade:markup"]);
	grunt.registerTask("scripts", ["typescript:scripts", "copy:scripts", "concat_sourcemap:scripts", "clean:tmp_scripts"]);
	grunt.registerTask("styles",  ["less:styles"]);
	grunt.registerTask("build",   ["content", "markup", "scripts", "styles"]);
	grunt.registerTask("server",  ["express:server", "express-keepalive"]);

	grunt.registerTask("default", ["build"]);
	grunt.registerTask("browse",  ["build", "server"]);
}