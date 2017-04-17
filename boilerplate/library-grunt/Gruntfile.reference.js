module.exports = function(grunt) {
    // essential grunt plugins [https://github.com/Pestov/essential-grunt-plugins]
    // [https://github.com/ehynds/grunt-remove-logging]

    // [https://github.com/sindresorhus/time-grunt]
    // npm install time-grunt --save-dev
    require("time-grunt")(grunt);
    // read the package.json file
    var pkg = require("./package.json");

    // library path + names
    var lib_path = "js/libs/";
    var lib_names = [];

    // the distribution folder structure
    var distribution_folder_structure = [
        "dist/",
        "dist/js",
        "dist/css/main",
        "dist/img"
    ];

    // // files to copy
    // var files_to_copy = [
    //     "index.html",
    //     "css/main/app.css",
    //     "css/main/base.css",
    //     "css/main/normalize.css",
    //     "css/main/styles.css",
    //     "js"
    // ];

    /**
     * @description [Replaces substrings in index.html.]
     * @param  {String} content [The content of index.html.]
     * @param  {Object} pkg     [Object containing package.json info.]
     * @param  {String} type    [String denoting whether it's the main or dist replacement.]
     * @return {String}         [The string with new replacements.]
     */
    function indexhtml_text_replacements(content, pkg, type) {
        return content;
        // replace source paths
        var base_dict = {
            // "{{APPLICATION_TITLE}}": pkg.name,
            // "{{APPLICATION_DESCRIPTION}}": pkg.description
        },
            main_dict = {
                "css/main/app.css": "css/min/app.min.css",
                "js/libs/main/lib.dev-build.js": "js/libs/main/lib.min.js",
                "js/main/app.js": "js/main/app.min.js"
            };
        // merge dictionaries when the type is `dist`
        if (type === "dist") {
            base_dict = Object.assign(base_dict, main_dict);
        }
        // build the regexp
        var regexp_string = [];
        for (var path in base_dict) {
            if (base_dict.hasOwnProperty(path)) {
                regexp_string.push(path);
            }
        }
        regexp_string = regexp_string.join("|");
        var patterns = new RegExp(regexp_string, "gm");
        return content.replace(patterns, function(match) {
            var replacement = base_dict[match];
            return replacement ? replacement : match;
        });
    }

    // 1. Configuration
    grunt.initConfig({
        // help: [https://docs.npmjs.com/files/package.json]
        // interactive package.json: [http://browsenpm.org/package.json]
        pkg: grunt.file.readJSON("package.json"),
        // clean [https://www.npmjs.com/package/grunt-contrib-clean]
        // $ npm install grunt-contrib-clean --save-dev
        clean: {
            dist: {
                src: ["dist/"]
            }
        },
        // mkdir [https://github.com/rubenv/grunt-mkdir]
        // $ npm install grunt-mkdir --save-dev
        mkdir: {
            dist: {
                options: {
                    create: distribution_folder_structure
                }
            }
        },
        "file-creator": {
            index: {
                "dist/index.html": function(fs, fd, done) {
                    done(); // leave empty
                }
            }
        },
        // copy [https://www.npmjs.com/package/grunt-contrib-copy]
        // $ npm install grunt-contrib-copy --save-dev
        copy: {
            indexmain: {
                src: "index.html",
                dest: "index.html",
                options: {
                    process: function(content, srcpath) {
                        return indexhtml_text_replacements(
                            content,
                            pkg,
                            "main"
                        );
                    }
                }
            },
            indexdist: {
                src: "index.html",
                dest: "dist/",
                options: {
                    process: function(content, srcpath) {
                        return indexhtml_text_replacements(
                            content,
                            pkg,
                            "dist"
                        );
                    }
                }
            },
            // copy folders
            cssimg: {
                expand: true,
                src: ["css/**", "img/**"],
                dest: "dist/"
            },
            // copy js folder
            js: {
                expand: true,
                src: ["js/**", "!js/main/parts/**"],
                dest: "dist/",
                rename: function(dest, src) {
                    // [https://fettblog.eu/blog/2014/05/27/undocumented-features-rename/]
                    // rename the build
                    var name = dest + src;
                    if (/dev-build.js$/.test(src)) {
                        name = dest + src.replace(/.dev-build/, "");
                    }
                    return name;
                }
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
                    "dist/index.html": "dist/index.html"
                }
            }
        },
        // concat js/css files: [https://www.npmjs.com/package/grunt-contrib-concat]
        // $ npm install grunt-contrib-concat --save-dev
        concat: {
            devappmain: {
                src: [
                    "css/main/normalize.css",
                    "css/main/base.css",
                    "css/main/styles.css"
                ],
                dest: "css/main/app.css"
            },
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
            },
            appjs: {
                src: [
                    "js/libs/main/parts/app.init.top.js",
                    "js/libs/main/parts/app.libs.js",
                    "js/libs/main/parts/app.globals.js",
                    "js/libs/main/parts/app.utils.js",
                    "js/libs/main/parts/app.$$.js",
                    "js/libs/main/parts/app.events.js",
                    "js/libs/main/parts/app.main.js",
                    "js/libs/main/parts/app.init.end.js"
                ],
                dest: "js/libs/main/parts/app.dev-build.js"
            },
            appjsdist: {
                src: ["js/libs/main/lib.dev-build.js"],
                dest: "dist/js/libs/main/lib.js"
            }
        },
        // minify js [https://www.npmjs.com/package/grunt-contrib-uglify]
        // $ npm install grunt-contrib-uglify --save-dev
        uglify: {
            target: {
                files: {
                    "dist/js/main/app.min.js": ["dist/js/main/app.js"],
                    "dist/js/libs/main/lib.min.js": ["dist/js/libs/main/lib.js"]
                }
            }
        },
        // jsbeautify [https://www.npmjs.com/package/grunt-jsbeautifier]
        // $ npm install grunt-jsbeautifier --save-dev
        jsbeautifier: {
            files: ["js/libs/main/lib.dev-build.js", "dist/js/libs/main/lib.js"]
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
                    message: "Done building the dist/ directory." //required
                }
            }
        }
    });

    // 2. Load Plugin(s)
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-mkdir");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-file-creator");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks("grunt-notify");
    // github newer [https://github.com/tschaub/grunt-newer]
    // $ npm install grunt-newer --save-dev
    // grunt.loadNpmTasks("grunt-newer");

    // 3. Register Task(s)
    grunt.registerTask("remove_dist", ["clean:dist"]);
    grunt.registerTask("make_dist", ["mkdir:dist"]);
    grunt.registerTask("make_indexhtml", ["file-creator:index"]);
    grunt.registerTask("copy_files", [
        "copy:indexmain",
        "copy:indexdist",
        "copy:cssimg",
        "copy:js"
    ]);
    grunt.registerTask("autoprefix", ["postcss:dist"]);
    grunt.registerTask("cssminify", ["cssmin"]);
    grunt.registerTask("concat-css", [
        "concat:devappmain",
        "concat:appmain",
        "concat:minappmain"
    ]);
    grunt.registerTask("concat-js", ["concat:appjs", "concat:appjsdist"]);
    grunt.registerTask("jsminify", ["uglify:target"]);
    grunt.registerTask("jsbeautify", ["jsbeautifier"]);
    grunt.registerTask("htmlminify", ["htmlmin"]);
    grunt.registerTask("notify-build", ["notify:default"]);
    // grunt.registerTask("js-all", ["jsminify"]);
    // grunt.registerTask("css-all", ["autoprefix", "cssminify", "concat-css"]);
    grunt.registerTask("default", [
        "remove_dist",
        "make_dist",
        "make_indexhtml"
        // "copy_files"
        // "autoprefix",
        // "cssminify",
        // "concat-css",
        // "concat-js",
        // "jsminify",
        // "jsbeautify",
        // "htmlminify",
        // "notify-build"
    ]);
};
