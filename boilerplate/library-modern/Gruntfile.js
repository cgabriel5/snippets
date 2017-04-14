module.exports = function(grunt) {

    // 1. Configuration
    grunt.initConfig({
        // help: [https://docs.npmjs.com/files/package.json]
        // interactive package.json: [http://browsenpm.org/package.json]
        pkg: grunt.file.readJSON('package.json'),
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
                        dest: 'dist/',
                        // filter: "isFile"
                    }
                ],
            },
        },
        // // watch for file changes [https://www.youtube.com/watch?v=qtP5xbwMcDQ]
        // // $ npm install grunt-contrib-watch --save-dev
        watch: {
            js: {
                // when main.js changes
                files: ["js/main/main.js"],
                tasks: ["js-all"]
            },
            css: {
                // when main.css changes
                files: ["css/full/app.css"],
                tasks: ["css-all"]
            }
        },
        // autoprefix via postcss [https://github.com/nDmitry/grunt-postcss]
        // $ npm install grunt-postcss autoprefixer --save-dev
        postcss: {
            options: {
                processors: [
                    require("autoprefixer")({ browsers: "last 5 versions" }), // add vendor prefixes
                ]
            },
            dist: {
                src: "css/full/app.css",
                dest: "css/main/main.css"
            }
        },
        // minify js [https://www.npmjs.com/package/grunt-contrib-uglify]
        // $ npm install grunt-contrib-uglify --save-dev
        uglify: {
            target: {
                files: {
                    "js/main/main.min.js": ["js/main/main.js"]
                }
            }
        },
        // minify css [https://www.npmjs.com/package/grunt-contrib-cssmin]
        // $ npm install grunt-contrib-cssmin --save-dev
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: "css/full/",
                    src: ["*.css"],
                    dest: "css/min/",
                    ext: ".min.css"
                }]
            }
        },
        // concat js/css files: [https://www.npmjs.com/package/grunt-contrib-concat]
        // $ npm install grunt-contrib-concat --save-dev
        concat: {
            css: {
                src: ["css/min/normalize.min.css", "css/min/base.min.css", "css/min/app.min.css"],
                dest: "css/main/main.min.css"
            }
        }
    });

    // 2. Load Plugin(s)
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");

    // 3. Register Task(s)
    // grunt.registerTask("copy", ["copy:main"]);
    grunt.registerTask("autoprefix", ["postcss:dist"]);
    grunt.registerTask("jsminify", ["uglify"]);
    grunt.registerTask("cssminify", ["cssmin"]);
    grunt.registerTask("concat-css", ["concat:css"]);
    grunt.registerTask("js-all", ["jsminify"]);
    // grunt.registerTask("js-all", ["jsminify", "concat-js"]);
    grunt.registerTask("css-all", ["autoprefix", "cssminify", "concat-css"]);
    grunt.registerTask("all", ["js-all", "css-all"]);

};
