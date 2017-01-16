// contain app frame within an IIFE
(function(window) {

    // lay the app frame
    // set the global var
    window.app = {
        // DOM elements
        "$$": {},
        // app event handlers
        "events": {},
        // global variables container
        "globals": {
            "flags": {},
            "CONSTANTS": {}
        },
        "libs": {},
        "queue": [],
        // reusable app functions/methods
        "utils": {}
    };

    // cache the app global
    var app = window.app;

    // add a module to load
    app.module = function(module_name, module, mode) {

        // add the module to the queue
        app.queue.push([module_name, module, (mode || "complete")]);

    };

    // app module invoker
    app.invoke = function(mode) {

        // loop over modules
        app.queue.forEach(function(module) {

            // run the module if the mode matches
            if (module[2] === mode) module[1].call(app, app, (app[module[0] || undefined]));

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

            // invoke the modules set to mode interactive
            app.invoke("interactive");

        }

        // all resources have loaded (document + subresources)
        if (document.readyState === "complete") {

            // invoke the modules set to mode complete
            app.invoke("complete");

            // cleanup app var once everything is loaded
            app.cleanup();

        }

        // good explanation with images:
        // https://varvy.com/performance/document-ready-state.html

    };

})(window);
