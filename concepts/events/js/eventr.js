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
            // get event options
            var anchors = options.anchors,
                event = options.event,
                fire = options.fire || Infinity,
                handler = options.handler,
                filters = options.filters,
                namespace;

            // prepare anchors
            var anchors_ = [];
            if (anchors) {
                anchors = anchors.trim().replace(/\s+/g, " ").split(" ");
                for (var i = 0, l = anchors.length; i < l; i++) {
                    var anchor = anchors[i],
                        element = null;

                    // determine what the anchor element is
                    // either the window, document, or an actual element
                    if (anchor === "window") {
                        element = window;
                    } else if (anchor === "document") {
                        element = document;
                    } else {
                        // get the element from DOM
                        var ele = document.getElementById(anchors[i].replace(/^\#/, ""));
                        if (ele) element = ele;
                    }
                    // add anchor element to anchors_ array
                    if (element) anchors_.push(element);
                }
            }

            // separate event and namespace
            var dot_index = event.indexOf(".");
            if (-~dot_index) { // has namespace
                namespace = event.substring(dot_index + 1, event.length);
                event = event.substring(0, dot_index);
            }

            // get handler function
            handler = eventrjs.db.handlers[handler];
            // if no handle exists return
            if (!handler) return;

            // get the provided filter functions
            var filters_ = [],
                filter_db = eventrjs.db.filters;
            if (filters) {
                filters = filters.trim().replace(/\s+/g, " ").split(" ");
                for (var i = 0, l = filters.length; i < l; i++) {
                    // check that filter exists
                    var filter = filter_db[filters[i]];
                    if (filter) filters_.push(filter);
                }
            }

            // wrap user handle + apply provided filters
            var fn;
            if (filters_.length) {
                // console.log("function with filter was made");
                fn = function(e) {
                    // loop through all filters
                    for (var i = 0, l = filters_.length; i < l; i++) {

                        // filter check must return an element to pass
                        // any filter must pass to invoke the handler
                        var check = filters_[i](e.target);
                        if (check && fire >= 1) {
                            // console.log(filters_[i].name); // log the filter's function name
                            e.eventrjsDelegate = this; // add deligate target to object
                            e.eventrjsCurrentTarget = e.target; // add deligate target to object
                            // fire if any filter passes
                            if (fire >= 1) handler.call(e, e); // invoke handler
                            fire--; // decrease handler fire count
                            return; // only one filter needs to pass
                        }

                    }
                }
            } else {
                // console.log("function without filters was made");
                fn = function(e) {
                    e.eventrjsDelegate = null; // add deligate target to object
                    e.eventrjsCurrentTarget = e.target; // add deligate target to object
                    if (fire >= 1) handler.call(e, e); // invoke user handle
                    fire--;
                }
            }

            // loop over anchors and apply listeners
            for (var i = 0, l = anchors_.length; i < l; i++) {
                // grab the anchor element
                var anchor = anchors_[i];
                // attach event to event object
                if (!anchor.events) {
                    anchor.events = {};
                    anchor.events[event + ((namespace) ? ("." + namespace) : "")] = fn;
                } else {
                    anchor.events[event + ((namespace) ? ("." + namespace) : "")] = fn;
                }

                // attch event to anchor element
                anchor.addEventListener(event, fn, false);
            }

        },
        "remove": function(options) {

            // get event options
            var anchors = options.anchors,
                event = options.event,
                namespace;

            // prepare anchors
            var anchors_ = [];
            if (anchors) {
                anchors = anchors.trim().replace(/\s+/g, " ").split(" ");
                for (var i = 0, l = anchors.length; i < l; i++) {
                    var anchor = anchors[i],
                        element = null;

                    // determine what the anchor element is
                    // either the window, document, or an actual element
                    if (anchor === "window") {
                        element = window;
                    } else if (anchor === "document") {
                        element = document;
                    } else {
                        // get the element from DOM
                        var ele = document.getElementById(anchors[i].replace(/^\#/, ""));
                        if (ele) element = ele;
                    }
                    // add anchor element to anchors_ array
                    if (element) anchors_.push(element);
                }
            }

            // separate event and namespace
            var dot_index = event.indexOf(".");
            if (-~dot_index) { // has namespace
                namespace = event.substring(dot_index + 1, event.length);
                event = event.substring(0, dot_index);
            }

            // loop over anchors and remove listeners
            for (var i = 0, l = anchors_.length; i < l; i++) {
                // grab the anchor element
                var anchor = anchors_[i],
                    events = anchor.events,
                    event_name = (event + ((namespace) ? ("." + namespace) : ""));
                // check that event even exists on anchor
                var fn = events[event_name];
                if (fn) {
                    // remove event from anchors events
                    delete events[event_name];
                    // remove event to anchor element
                    element.removeEventListener(event, fn, false);
                }
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
                return null;
            },
            "filter_2": function(target) {
                // filters are applied through funneljs
                // this check grabs the target elements parents and checks the parents.having a match
                // on any of the parents means the target element is a child of the delegate element.
                var is_delegate_target = funneljs(target).parents().classes("orange").attrs("[!data-app]");
                if (is_delegate_target.pop().length) return is_delegate_target.pop()[0];
                return null;
            }
        });

        eventrjs.handlers({
            "handler_1": function(e) {
                console.log("Handler 1 here", [e.eventrjsDelegate], e.eventrjsCurrentTarget);
            },
            "handler_2": function(e) {
                console.log("Handler 2 here", e.eventrjsDelegate, e.eventrjsCurrentTarget);
            }
        });

        eventrjs.events.add({
            "anchors": "#tape",
            "event": "click.namespace1.namespace2",
            "fire": 5,
            "handler": "handler_1",
            "filters": "filter_1 filter_2"
        });

        eventrjs.events.add({
            "anchors": "#tape",
            "event": "click.namespace1",
            "fire": 10,
            "handler": "handler_2",
            "filters": "filter_1 filter_2"
        });

        setTimeout(function() {
            eventrjs.events.remove({
                "anchors": "#tape",
                "event": "click.namespace1.namespace2",
            });
        }, 2000);

    }

};
