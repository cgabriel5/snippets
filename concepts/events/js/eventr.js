(function() {
    "use strict";

    var eventrjs = function() {};

    // contain filters + handlers in db property
    eventrjs.db = {
        "filters": null,
        "handlers": null,
    };

    // filters
    eventrjs.filters = function(filters_) {
        // set filters
        eventrjs.db.filters = filters_;
    };

    // handlers
    eventrjs.handlers = function(handlers_) {
        // set handlers
        eventrjs.db.handlers = handlers_;
    };

    // events
    eventrjs.events = {
        "add": function(options) {
            // get options
            var id = options.id || null,
                fire = (options.fire) ? Math.abs(options.fire) : Infinity,
                elements = (options.elements) ? options.elements.split(" ") : [document],
                filter = options.filter || null,
                handler = eventrjs.db.handlers[options.handler],
                event = options.event,
                namespace = options.namespace;

            // create handler function
            var fn = function(e) {
                // if a filter is provided the filter check must return an element passing filter
                // else if no filter passed skip check entirely and just run the user provided handler
                if (filter && !(eventrjs.db.filters[filter](e.target))) return;
                e.eventrjsDelegate = ((filter) ? this : null); // add deligate target to object
                e.eventrjsCurrentTarget = e.target; // add deligate target to object
                if (fire >= 1) handler.call(e, e); // invoke user handle
                fire--;
            };

            // apply handler to all elements
            for (var i = 0, l = elements.length; i < l; i++) {
                var element = document.getElementById(elements[i].replace(/^\#/, ""));
                if (!element.events) {
                    element.events = {};
                    element.events[event + ((namespace) ? ("." + namespace) : "")] = fn;
                } else {
                    element.events[event + ((namespace) ? ("." + namespace) : "")] = fn;
                }
                console.log(">>>>>>", [element]);
                element.addEventListener(event, fn, false);
            }

            // store event in db

        },
        "remove": function(options) {
            var elements = options.elements.split(" "),
                event = options.event,
                namespace = options.namespace;
            for (var i = 0, l = elements.length; i < l; i++) {
                var element = document.getElementById(elements[i].replace(/^\#/, ""));
                element.removeEventListener(event, element.events[(event + ((namespace) ? ("." + namespace) : ""))], false);
            }
        },
        "update": function(options) {},
    };

    // add to global scope for ease of use
    window.eventrjs = eventrjs;

})();

// =================================== usage

document.onreadystatechange = function() {

    "use strict";

    // all resources have loaded
    if (document.readyState == "complete") {

        eventrjs.filters({
            "filter_1": function(target) {
                // filters are applied through funneljs

                // check if the target element passes filter check
                var is_target = funneljs(target).classes("orange").attrs("[!data-app]");
                if (is_target.pop().length) return is_target.pop()[0];

                // this check grabs the target elements parents and checks the parents.
                // having a match on any of the parents means the target element is a
                // child of the delegate element.
                var is_delegate_target = funneljs(target).parents().classes("orange").attrs("[!data-app]");
                if (is_delegate_target.pop().length) return is_delegate_target.pop()[0];
                return null;
            }
        });

        eventrjs.handlers({
            "handler_1": function(e) {
                console.log("Handler here", e.eventrjsDelegate, e.eventrjsCurrentTarget);
            }
        });

        eventrjs.events.add({
            "id": "some-event-id-reference", // default: null
            "fire": 10, // default: Infinity
            "elements": "#tape", // default: document
            "filter": "filter_1", // default: null
            "handler": "handler_1", // required
            "event": "click", // required
            "namespace": "namespace1" // default: null
        });

        setTimeout(function() {
            eventrjs.events.remove({
                "elements": "#tape",
                "event": "click",
                "namespace": "namespace1"
            });
        }, 2000);
    }

};
