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
				sourceMap: true,
				ignoreTypeCheck: false
			},
			scripts: {
				src: ["src/scripts/**/*.ts"],
				dest: "tmp_scripts/typescript",
				options: { base_path: "src/scripts" }
			}
		},

		browserify: {
			options: {
				transform: ['brfs'],
				shim: {
					'angular': { path: 'bower_components/angular/angular.js', exports: 'angular' },
					'angular-animate': { path: 'bower_components/angular-animate/angular-animate.js', exports: 'angular' },
					'angular-bootstrap': { path: 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js', exports: 'angular' },
					'angular-route': { path: 'bower_components/angular-route/angular-route.js', exports: 'angular' }
				}
			},
			scripts: {
				files: { "phonegap-build/www/bundle.js": ["tmp_scripts/typescript/index.js"] }
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
	grunt.registerTask("scripts", ["typescript:scripts", "browserify:scripts", "clean:tmp_scripts"]);
	grunt.registerTask("styles",  ["less:styles"]);
	grunt.registerTask("build",   ["content", "markup", "scripts", "styles"]);
	grunt.registerTask("server",  ["express:server", "express-keepalive"]);

	grunt.registerTask("default", ["build"]);
	grunt.registerTask("browse",  ["build", "server"]);
}