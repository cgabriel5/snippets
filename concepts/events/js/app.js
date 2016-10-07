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
                console.log("Handler 1 here"); //, e.eventrAnchor, e.eventrDelegate, e.eventrCurrentTarget);
            },
            "handler_2": function(e, targets) {
                console.log("Handler 2 here"); //, e.eventrAnchor, e.eventrDelegate, e.eventrCurrentTarget);
            },
            "handler_3": function(e, targets) {
                console.log("Handler 3 here"); //, e.eventrAnchor, e.eventrDelegate, e.eventrCurrentTarget);
            }
        });

        eventrjs.events.add({
            "anchors": "#tape",
            "event": "click.namespace1.namespace2",
            "fire": 10,
            "handlers": "handler_1 handler_3",
            // "filters": "filter_1 filter_2"
        });

        eventrjs.events.add({
            "id": "some-event-id",
            "anchors": "document",
            "event": "click.namespace1",
            "fire": 10,
            "handlers": "handler_2",
            // "filters": "filter_1 filter_2"
        });

        setTimeout(function() {
            console.log("some-event-id disabled (✕)");
            eventrjs.events.disable("some-event-id");
        }, 3000);

        setTimeout(function() {
            console.log("some-event-id enabled (✔)");
            eventrjs.events.enable("some-event-id");
        }, 5000);

        setTimeout(function() {
            console.log("some-event-id updated (+)");
            eventrjs.events.update({
                "id": "some-event-id",
                "fire": 10
            });
        }, 7000);

        setTimeout(function() {
            console.log("removed");
            eventrjs.events.remove({
                "anchors": "document",
                "event": "click.namespace1",
                // "event": "click.namespace1.namespace2",
            });
        }, 9000);

    }

};
