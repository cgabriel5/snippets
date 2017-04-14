module.exports = function(grunt) {
    // essential grunt plugins [https://github.com/Pestov/essential-grunt-plugins]
    // [https://github.com/ehynds/grunt-remove-logging]

    // [https://github.com/sindresorhus/time-grunt]
    // npm install time-grunt --save-dev
    require("time-grunt")(grunt);

    // 1. Configuration
    grunt.initConfig({
        // help: [https://docs.npmjs.com/files/package.json]
        // interactive package.json: [http://browsenpm.org/package.json]
        pkg: grunt.file.readJSON("package.json"),
        // copy [https://www.npmjs.com/package/grunt-contrib-copy]
        // $ npm install grunt-contrib-copy --save-dev
        copy: {
            main: {
                files: [
                    // copy root files
                    {
                        expand: true,
                        src: ["index.html"],
                        dest: "dist/",
                        filter: "isFile"
                    },
                    // copy css
                    {
                        expand: true,
                        src: ["css/**", "js/**", "img/**"],
                        dest: "dist/"
                    }
                ]
            }
        },
        // autoprefix via postcss [https://github.com/nDmitry/grunt-postcss]
        // $ npm install grunt-postcss autoprefixer --save-dev
        postcss: {
            options: {
                processors: [
                    require("autoprefixer")({ browsers: "last 5 versions" }) // add vendor prefixes
                ]
            },
            dist: {
                src: "dist/css/main/styles.css",
                dest: "dist/css/main/styles.css"
            }
        },
        // minify css [https://www.npmjs.com/package/grunt-contrib-cssmin]
        // $ npm install grunt-contrib-cssmin --save-dev
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: "dist/css/main/",
                        src: ["*.css"],
                        dest: "dist/css/min/",
                        ext: ".min.css"
                    }
                ]
            }
        },
        // minify js [https://www.npmjs.com/package/grunt-contrib-uglify]
        // $ npm install grunt-contrib-uglify --save-dev
        uglify: {
            target: {
                files: {
                    "dist/js/main/app.min.js": ["dist/js/main/app.js"]
                }
            }
        },
        // minify html [https://github.com/gruntjs/grunt-contrib-htmlmin]
        // $ npm install grunt-contrib-htmlmin --save-dev
        htmlmin: {
            // Task
            dist: {
                // Target
                options: {
                    // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    // Dictionary of files
                    "dist/index.html": "index.html"
                }
            }
        },
        // concat js/css files: [https://www.npmjs.com/package/grunt-contrib-concat]
        // $ npm install grunt-contrib-concat --save-dev
        concat: {
            appmain: {
                src: [
                    "dist/css/main/normalize.css",
                    "dist/css/main/base.css",
                    "dist/css/main/styles.css"
                ],
                dest: "dist/css/main/app.css"
            },
            minappmain: {
                src: [
                    "dist/css/min/normalize.min.css",
                    "dist/css/min/base.min.css",
                    "dist/css/min/styles.min.css"
                ],
                dest: "dist/css/min/app.min.css"
            }
        },
        // // watch for file changes [https://www.youtube.com/watch?v=qtP5xbwMcDQ]
        // // $ npm install grunt-contrib-watch --save-dev
        watch: {
            target: {
                files: ["index.html", "js/", "css/"],
                tasks: ["default"]
            }
        },
        notify: {
            default: {
                options: {
                    title: "Build Complete", // optional
                    message: "Distribution build complete!" //required
                }
            }
        }
    });

    // 2. Load Plugin(s)
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-notify");
    // github newer [https://github.com/tschaub/grunt-newer]
    // $ npm install grunt-newer --save-dev
    // grunt.loadNpmTasks("grunt-newer");

    // 3. Register Task(s)
    grunt.registerTask("dist", ["copy:main"]);
    grunt.registerTask("autoprefix", ["postcss:dist"]);
    grunt.registerTask("cssminify", ["cssmin"]);
    grunt.registerTask("concat-css", ["concat:appmain", "concat:minappmain"]);
    grunt.registerTask("jsminify", ["uglify"]);
    grunt.registerTask("htmlminify", ["htmlmin"]);
    grunt.registerTask("notify-build", ["notify:default"]);
    // grunt.registerTask("js-all", ["jsminify"]);
    // grunt.registerTask("css-all", ["autoprefix", "cssminify", "concat-css"]);
    grunt.registerTask("default", [
        "dist",
        "autoprefix",
        "cssminify",
        "concat-css",
        "jsminify",
        "htmlminify",
        "notify-build"
    ]);
};
