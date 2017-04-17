// plugins
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")({ pattern: ["gulp-*"] });
var notifier = require("node-notifier");
var path = require("path");
var sequence = require("run-sequence");
var bs = require("browser-sync").create(); // create a browser sync instance.
var file_exists = require("file-exists");
var pkg = require("./package.json");

// tasks
gulp.task("browser-sync", function() {
    bs.init({
        // server: { baseDir: "./", index: "index.html" }
        proxy: {
            target: "localhost:80/projects/snippets/code_snippets/boilerplate/webapp/index.html"
        }
    });
});

// remove the dist/ directory
gulp.task("remove-dist", function() {
    // remove the dist directory
    return gulp.src(["dist/", "js/*.js", "css/*.js"]).pipe(plugins.clean());
});

// reset HTML meta tags
gulp.task("reset-indexhtml", function() {
    // remove the dist directory
    return gulp
        .src(["./index.html"])
        .pipe(
            plugins.replace(
                /\<meta name\="description" content\="(.*?)"\>/,
                '<meta name="description" content="{{APPLICATION_DESCRIPTION}}">'
            )
        )
        .pipe(
            plugins.replace(
                /\<title\>(.*?)\<\/title\>/,
                "<title>{{APPLICATION_TITLE}}</title>"
            )
        )
        .pipe(plugins.htmlBeautify({ preserve_newlines: false }))
        .pipe(gulp.dest("./"));
});

// init HTML files + minify
gulp.task("html", function() {
    return (gulp
            .src("./index.html") // path to your files
            // check if any libs are used
            .pipe(
                plugins.replace(
                    /\{\{.*?\}\}|\<script src\=\"js\/libs.js\"\>\<\/script\>/g,
                    function(match) {
                        // index text replacements
                        var replacements = {
                            "{{APPLICATION_TITLE}}": pkg.name,
                            "{{APPLICATION_DESCRIPTION}}": pkg.description
                        };
                        if (/^\<script/.test(match)) {
                            if (!file_exists.sync("js/libs.js")) return "";
                        }
                        return replacements[match] || match;
                    }
                )
            )
            .pipe(plugins.htmlBeautify({ preserve_newlines: false }))
            .pipe(gulp.dest("./"))
            .pipe(plugins.minifyHtml())
            .pipe(gulp.dest("dist/"))
            .pipe(bs.reload({ stream: true })) );
});

// build app.css + autoprefix + minify
gulp.task("css", function() {
    return gulp
        .src([
            "css/source/normalize.css",
            "css/source/base.css",
            "css/source/styles.css"
        ])
        .pipe(plugins.concat("app.css")) // concat into `app.css`
        .pipe(gulp.dest("css/")) // dump into development folder
        .pipe(
            plugins.autoprefixer({
                browsers: ["last 5 versions"],
                cascade: false
            })
        )
        .pipe(plugins.minifyCss()) // minify for production
        .pipe(gulp.dest("dist/css/")) // dump in dist/ folder
        .pipe(bs.reload({ stream: true }));
});

// build app.js + minify + beautify
gulp.task("jsapp", function() {
    return gulp
        .src([
            // get all the source build files
            "js/source/app.init.top.js",
            "js/source/app.libs.js",
            "js/source/app.globals.js",
            "js/source/app.utils.js",
            "js/source/app.$$.js",
            "js/source/app.events.js",
            "js/source/app.main.js",
            "js/source/app.init.end.js"
        ])
        .pipe(plugins.concat("app.js")) // concat into `app.js`
        .pipe(plugins.jsbeautifier())
        .pipe(gulp.dest("js/")) // dump into development folder
        .pipe(plugins.uglify()) // minify for production
        .pipe(gulp.dest("dist/js/")) // dump in dist/ folder
        .pipe(bs.reload({ stream: true }));
});

// build libs.js + minify + beautify
gulp.task("jslibs", function() {
    return gulp
        .src(
            [
                // add any used js library paths here
                // "js/libs/jquery.js"
            ]
        )
        .pipe(plugins.concat("libs.js")) // concat into `app.js`
        .pipe(plugins.jsbeautifier())
        .pipe(gulp.dest("js/")) // dump into development folder
        .pipe(plugins.uglify()) // minify for production
        .pipe(gulp.dest("dist/js/")) // dump in dist/ folder
        .pipe(bs.reload({ stream: true }));
});

// copy img/ to dist/img/
gulp.task("img", function() {
    // deed to copy hidden files/folders? [https://github.com/klaascuvelier/gulp-copy/issues/5]
    return gulp
        .src("img/**")
        .pipe(gulp.dest("dist/img/")) // dump in dist/ folder
        .pipe(bs.reload({ stream: true }));
});

// watch changes to files
gulp.task("watch", function() {
    var options = {
        debounceDelay: 2000,
        awaitWriteFinish: true,
        readDelay: 2000
    };
    gulp.watch(["./index.html"], options, ["html"]);
    gulp.watch(["css/source/*.css"], options, ["css"]);
    gulp.watch(["js/libs/*.js", "js/source/*.js"], options, [
        "jsapp",
        "jslibs"
    ]);
    gulp.watch(["img/*"], options, ["img"]);
});

// gulp notifications
gulp.task("notify-build", function() {
    // return gulp
    // .src("")
    // .pipe(plugins.notify({ message: "Build complete!", onLast: true }));
    notifier.notify({
        title: "Gulp Notification",
        message: "Build complete",
        icon: path.join(__dirname, "assets/node-notifier/gulp.png"),
        time: 1,
        sound: true
    });
});
gulp.task("notify-reset", function() {
    // return gulp
    // .src("")
    // .pipe(plugins.notify({ message: "Reset complete!", onLast: true }))
    // .pipe(bs.reload({ stream: true }));
    notifier.notify({
        title: "Gulp Notification",
        message: "Reset complete",
        icon: path.join(__dirname, "assets/node-notifier/gulp.png"),
        time: 1,
        sound: true
    });
});

// command line gulp task names
gulp.task("reset", ["remove-dist", "reset-indexhtml", "notify-reset"]);
gulp.task("build", function(done) {
    sequence(
        "css",
        "jsapp",
        "jslibs",
        "img",
        "html",
        "notify-build",
        function() {
            done();
        }
    );
});
gulp.task("sync", ["browser-sync"]);
gulp.task("default", ["build", "watch"]);
