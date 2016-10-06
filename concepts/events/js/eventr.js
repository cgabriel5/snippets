(function() {
    "use strict";

    var eventrjs = function() {};

    /**
     * @description [Removes supplied event from supplied anchor.]
     * @param  {String} event     [The event to remove.]
     * @param  {String} namespace [The event namespace.]
     * @param  {document|window|HTMLElement} anchor    [The anchor from what to remove event.]
     */
    function zeroed(event, namespace, anchor) {
        console.log("removed 111", event, namespace, anchor);
        // remove event from anchor
        eventrjs.events.remove({
            "anchors": (anchor === document ? "document" : (anchor === window ? "window" : "#" + anchor.id)),
            "event": event + "." + namespace,
        });
    }

    /**
     * @description [Loops over all handlers to run them.]
     * @param  {EventObject} e        [The event object to pass to handler.]
     * @param  {Array} handlers [The array of the handlers to run.]
     */
    function invoke_handlers(e, handlers) {
        console.log("invoking the handlers");
        for (var i = 0, l = handlers.length; i < l; i++) {
            handlers[i].call(e, e); // invoke handler, pass event object
        }
    }

    /**
     * @description [Add anchor, delegate, and event current target to event object.]
     * @param  {EventObject} e        [The event object to which to add properties.]
     * @param  {document|window|HTMLElement} _anchor  [The anchor the target which triggers the event.]
     * @param  {document|window|HTMLElement|Null} delegate [If provided, the target to delegate event to.]
     */
    function event_anchors(e, _anchor, delegate) {
        console.log("<<<", _anchor, delegate, e.target);
        console.log("event object modified");
        // **Note: when filters are used the _anchor and delegate are the same
        e.eventrjsAnchor = _anchor; //  the element to which the event is attached
        // **Note: in the absence of filters there is no delegate as the event is directly
        // attached to the _anchor
        e.eventrjsDelegate = (delegate ? _anchor : null); // add delegate target to object
        e.eventrjsCurrentTarget = e.target; // add delegate target to object
    }

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
                handlers = options.handlers,
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

            // get all the handler functions
            var handlers_ = [];
            if (handlers) {
                handlers = handlers.trim().replace(/\s+/g, " ").split(" ");
                for (var i = 0, l = handlers.length; i < l; i++) {
                    var handler = eventrjs.db.handlers[handlers[i]];
                    // check if handler exists
                    if (handler) {
                        // add handler to handlers_ array
                        handlers_.push(handler);
                    }
                }
            }

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
                fn = function(e, _anchor) { // delegation through provided filters

                    // loop through all filters
                    for (var i = 0, l = filters_.length; i < l; i++) {

                        // filter check must return an element to pass
                        // any filter must pass to invoke the handler
                        var check = filters_[i](e.target);
                        if (check) {

                            // fire handler if there is still a fire count
                            if (fire >= 1) {

                                // add correct anchors to event object
                                event_anchors(e, _anchor, _anchor);

                                // invoke all handlers
                                invoke_handlers(e, handlers_);

                                fire--; // decrease handler fire count

                            }

                            // when fire count hits zero remove the handler
                            if (fire === 0) zeroed(event, namespace, _anchor);

                            return; // only one filter needs to pass
                        }

                    }
                };
            } else {

                fn = function(e, _anchor) { // no delegation. events attached directly to anchors

                    // fire handler if there is still a fire count
                    if (fire >= 1) {

                        // add correct anchors to event object
                        event_anchors(e, _anchor, null);

                        // invoke all handlers
                        invoke_handlers(e, handlers_);

                        fire--; // decrease handler fire count

                    }

                    // when fire count hits zero remove the handler
                    if (fire === 0) zeroed(event, namespace, _anchor);

                };

            }

            // loop over anchors and apply listeners
            for (var i = 0, l = anchors_.length; i < l; i++) {

                // grab the anchor element
                var anchor = anchors_[i];

                // new fn
                var fn_x = function(e) {
                    return fn.call(null, e, anchor);
                };

                // attach event to event object
                if (!anchor.events) {
                    anchor.events = {};
                    anchor.events[event + ((namespace) ? ("." + namespace) : "")] = fn_x;
                } else {
                    anchor.events[event + ((namespace) ? ("." + namespace) : "")] = fn_x;
                }

                // attch event to anchor element
                anchor.addEventListener(event, fn_x, false);
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
                // if not events object exists on anchor skip
                if (events === undefined) continue;
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
            "handler_1": function(e, targets) {
                console.log("Handler 1 here", e.eventrjsAnchor, e.eventrjsDelegate, e.eventrjsCurrentTarget);
            },
            "handler_2": function(e, targets) {
                console.log("Handler 2 here", e.eventrjsAnchor, e.eventrjsDelegate, e.eventrjsCurrentTarget);
            },
            "handler_3": function(e, targets) {
                console.log("Handler 3 here", e.eventrjsAnchor, e.eventrjsDelegate, e.eventrjsCurrentTarget);
            }
        });

        // eventrjs.events.add({
        //     "anchors": "#tape",
        //     "event": "click.namespace1.namespace2",
        //     "fire": 10,
        //     "handlers": "handler_1 handler_3",
        //     // "filters": "filter_1 filter_2"
        // });

        eventrjs.events.add({
            "anchors": "document",
            "event": "click.namespace1",
            "fire": 2,
            "handlers": "handler_2",
            // "filters": "filter_1 filter_2"
        });

        setTimeout(function() {
            console.log("removed");
            eventrjs.events.remove({
                "anchors": "document",
                "event": "click.namespace1",
                // "event": "click.namespace1.namespace2",
            });
        }, 2000);

    }

};
