(function(window) {
    // lay the app frame
    // set the global var
    window.app = {
        // DOM elements
        $$: {},
        // app event handlers
        events: {},
        // global variables container
        globals: {
            flags: {},
            CONSTANTS: {}
        },
        libs: {},
        queue: [],
        // reusable app functions/methods
        utils: {}
    };

    // cache the app global
    var app = window.app;

    // add a module to load
    app.module = function(module_name, fn, mode) {
        // add the module to the queue
        app.queue.push([module_name, fn, mode || "complete"]);
    };

    // app module invoker
    app.invoke = function(mode) {
        // loop over modules
        app.queue.forEach(function(module) {
            // run the module if the mode matches
            if (module[2] === mode) {
                module[1].call(app, (module[0].toUpperCase() || undefined));
            }
        });
    };

    // cleanup the app variable
    app.cleanup = function() {
        // remove unneeded properties once
        // the app has loaded
        delete app.queue;
        delete app.module;
        delete app.invoke;
        delete app.cleanup;
    };

    // modules start here...
