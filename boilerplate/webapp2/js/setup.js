// contain app frame within an IIFE
(function(window) {

    // set the global variable
    window.app = {};

    // set the ready function
    app.ready = function(fn, mode) {

        // set the main function to run later
        app.main = (fn || undefined);
        // set the app run mode
        app.mode = (mode || "complete");

    };

    // cleanup the app variable
    app.cleanup = function() {

        // remove unneeded properties
        delete app.main;
        delete app.mode;
        delete app.ready;
        delete app.cleanup;

    };

    // https://developer.mozilla.org/en-US/docs/Web/Events/readystatechange
    // the readystatechange event is fired when the readyState attribute of a
    // document has changed
    document.onreadystatechange = function() {

        "use strict";

        /* [functions.utils] */

        // https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
        // loading === document still loading
        // complete === document and all sub-resources have finished loading.
        // same as the window.onload event
        // interactive === document has finished loading & parsed but but
        // sub-resources such as images, stylesheets and frames are still loading
        // **Note: interactive === document.addEventListener("DOMContentLoaded",...
        // **Note: complete    === window.addEventListener("load", function() {...
        // [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
        // [load](https://developer.mozilla.org/en-US/docs/Web/Events/load)

        // document loaded and parsed. however, still loading subresources
        // user is able to interact with page.
        if (document.readyState === "interactive") {

            // lay the app frame

            // global variables container
            app.globals = {
                "flags": {},
                "CONSTANTS": {}
            };

            // reusable app functions/methods
            app.utils = {};

            // DOM elements
            app.$$ = {
                "doc": document,
                "body": document.body
            };

            // app event handlers
            app.events = {};

            // set the app var to the global scope
            app = app;

            // init the app if mode set to interactive
            if (app.main && app.mode === "interactive") {

                // init the app
                app.main.call(app, app);
                // cleanup app var
                app.cleanup();

            }

        }

        // all resources have loaded (document + subresources)
        if (document.readyState === "complete") {

            // init the app if mode set to complete
            if (app.main && app.mode === "complete") {

                // init the app
                app.main.call(app, app);
                // cleanup app var
                app.cleanup();

            }

        }

        // good explanation with images:
        // https://varvy.com/performance/document-ready-state.html

    };

})(window);
