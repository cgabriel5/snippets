// plugins
var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ pattern: ["gulp-*"] });
var notifier = require("node-notifier"); // .NotifySend;
var path = require("path");
var sequence = require("run-sequence");
var bs = require("browser-sync").create(); // create a browser-sync instance.
var reload = bs.reload;
var pkg = require("./package.json");

/**
 * @description [Builds the localhost URL dynamically.]
 * @param  {String} path [The gulpfile's file path.]
 * @return {String}      [The localhost URL.]
 */
var start_url = function(path) {
    // remove everything until /htdocs/
    path = path.replace(/^.+\/htdocs\//, "localhost:80/");
    // remove the filename and append `index.html`
    var parts = path.split("/");
    parts.pop();
    return parts.join("/") + "/index.html";
};

/**
 * @description [Create a OS notification.]
 * @param  {String} message [The notification message.]
 */
var notify = function(message) {
    // ubuntu
    // var notification = new notifier();
    // notification.notify({});

    // OS agnostic
    notifier.notify({
        title: "Gulp Notification",
        message: message,
        icon: path.join(__dirname, "assets/node-notifier/gulp.png"),
        time: 1000,
        urgency: "critical",
        sound: true
    });
};

// tasks
// remove the dist/ directory
gulp.task("remove-dist", function() {
    // remove the dist directory
    return gulp
        .src(["dist/", "js/*.js", "css/*.js", "./index.html"])
        .pipe($.clean());
});

// init HTML files + minify
gulp.task("html", function() {
    return gulp
        .src([
            "html/source/index.top.html",
            "html/source/index.head.start.html",
            "html/source/index.head.meta.html",
            "html/source/index.head.css.html",
            "html/source/index.head.js.html",
            "html/source/index.head.end.html",
            "html/source/index.body.start.html",
            "html/source/index.body.content.html",
            "html/source/index.body.js.html",
            "html/source/index.body.end.html",
            "html/source/index.end.html"
        ])
        .pipe($.concat("index.html"))
        .pipe(
            $.jsbeautifier({
                brace_style: "collapse",
                end_with_newline: false,
                indent_char: " ",
                indent_handlebars: false,
                indent_inner_html: false,
                indent_scripts: "keep",
                indent_size: 4,
                max_preserve_newlines: 0,
                preserve_newlines: true,
                wrap_line_length: 0
            })
        )
        .pipe(gulp.dest("./"))
        .pipe($.minifyHtml())
        .pipe(gulp.dest("dist/"));
});

// build app.css + autoprefix + minify
gulp.task("css", function() {
    return gulp
        .src([
            "css/source/normalize.css",
            "css/source/base.css",
            "css/source/styles.css"
        ])
        .pipe($.concat("app.css"))
        .pipe(gulp.dest("css/")) // dump into development folder
        .pipe(
            $.autoprefixer({
                // from google web starter kit
                browsers: [
                    "ie >= 10",
                    "ie_mob >= 10",
                    "ff >= 30",
                    "chrome >= 34",
                    "safari >= 7",
                    "opera >= 23",
                    "ios >= 7",
                    "android >= 4.4",
                    "bb >= 10"
                ],
                cascade: false
            })
        )
        .pipe($.minifyCss()) // minify for production
        .pipe(gulp.dest("dist/css/")); // dump in dist/ folder
});

// build app.js + minify + beautify
gulp.task("jsapp", function() {
    return gulp
        .src([
            // get all the source build files
            "js/source/lib.top.js",
            "js/source/lib.functions.helpers.js",
            "js/source/lib.functions.core.js",
            "js/source/lib.constructor.js",
            "js/source/lib.end.js",
            "js/source/lib.globals.js",
            "js/source/lib.bottom.js",
            "js/source/app.js"
        ])
        .pipe($.concat("app.js"))
        .pipe($.jsbeautifier())
        .pipe(gulp.dest("js/")) // dump into development folder
        .pipe($.uglify()) // minify for production
        .pipe(gulp.dest("dist/js/")); // dump in dist/ folder
});

// build libs.js + minify + beautify
gulp.task("jslibs", function() {
    return gulp
        .src(
            [
                // add any used js library paths here
                // "js/libs/jquery.js"
                // "js/libs/modernizr.js"
            ]
        )
        .pipe($.concat("libs.js"))
        .pipe($.jsbeautifier())
        .pipe(gulp.dest("js/")) // dump into development folder
        .pipe($.uglify()) // minify for production
        .pipe(gulp.dest("dist/js/")); // dump in dist/ folder
});

// copy img/ to dist/img/
gulp.task("img", function() {
    // deed to copy hidden files/folders? [https://github.com/klaascuvelier/gulp-copy/issues/5]
    return gulp.src("img/**").pipe(gulp.dest("dist/img/")); // dump in dist/ folder
});

gulp.task("reload", function(done) {
    reload();
});

// watch changes to files
gulp.task("watch", function(done) {
    // start browser-sync
    bs.init({
        // server: { baseDir: "./", index: "index.html" }
        browser: ["google-chrome"], //, "firefox"],
        proxy: start_url(__filename),
        // reloadDelay: 2000,
        notify: false
    });

    // gulp.watch options
    var options = { debounceDelay: 2000, cwd: "./" };

    gulp.watch(["html/source/i*.html"], options, function() {
        return sequence("html", function() {
            reload();
        });
    });
    gulp.watch(["css/source/*.css"], options, function() {
        return sequence("css", function() {
            reload();
        });
    });
    gulp.watch(["js/libs/*.js", "js/source/*.js"], options, function() {
        return sequence("jsapp", "jslibs", function() {
            reload();
        });
    });
    gulp.watch(["img/*"], options, function() {
        return sequence("img", function() {
            reload();
        });
    });
});

// command line gulp task names

// remove the dist/ folder
gulp.task("reset", function(done) {
    return sequence("remove-dist", function() {
        notify("Reset complete");
        reload();
        done();
    });
});

// build the dist/ folder
gulp.task("build", function(done) {
    return sequence("css", "jsapp", "jslibs", "img", "html", function() {
        notify("Build complete");
        reload();
        done();
    });
});

// gulps default task is set to rum the build + watch + browser-sync
gulp.task("default", function(done) {
    return sequence("build", function() {
        sequence("watch");
        done();
    });
});
