# eventrjs

A lightweight JavaScript library for handling events.

## What it does

* Listens/Removes events
* Disables/Enables events
* Updatable events
* Limit handler function execution

## Add to project

```html
<script src="my_js_directory_path/eventrjs.js"></script>
```

## Access library

```js
var eventr = eventrjs;
// or
var eventr = window.eventrjs;
```

## Handlers

Handlers must be stored before listening to any events.

**Note:** 3 properties get added to the event object for convenience. They are the following:

```e.eventrAnchor``` &mdash; The element which the event is attached to.

```e.eventrDelegate``` &mdash; Only present when using event delegation (filters). If present the same as the anchor. Otherwise, null.

```e.eventrCurrentTarget``` &mdash; The element that started the event.



```js
eventr.handlers({
    "handler_1": function(e) {
        console.log("Handler 1");
    },
    "handler_2": function(e) {
        console.log("Handler 2");
    },
    "handler_3": function(e) {
        console.log("Handler 3");
    }
});
```

## Delegation

In order to use event delegation the use of `filters` is needed. A `filter` is just a function that is fed the event's target element. The `filter` if passed should return the `target` otherwise `null`.

The first two filters below use [funneljs](https://github.com/cgabriel5/funneljs), a JavaScript selector engine, to filter the target element while the third filter shows how Vanilla JavaScript can be used.

**Note:** `filter_1` and `filter_3` are, in essence, the same filter. `filter_1` just uses [funneljs](https://github.com/cgabriel5/funneljs) while `filter_3` uses Vanilla JavaScript.

```js
eventr.filters({
    "filter_1": function(target) { // uses funneljs
        // target element must have the orange class and no data-app attribute
        return (funneljs(target).classes("orange").attrs("[!data-app]").pop().length) ? target : null;
    },
    "filter_2": function(target) { // uses funneljs
        // target element's parents must have the orange class and no data-app attribute
        return (funneljs(target).parents().classes("orange").attrs("[!data-app]").pop().length) ? target : null;
    },
    "filter_3": function(target) { // uses Vanilla JavaScript
        // target element must have the orange class and no data-app attribute
        return (target.classList.contains("orange") && !target.hasAttribute("data-app")) ? target : null;
    }
});
```

## Add (listen) to an event: Syntax

```js
eventr.events.add({
    
    // {String: REQUIRED} The anchors to attach event to.
    "anchors": "window document #some_element_id", 
    
    // {String: REQUIRED} The event & optional namespace.
    "event": "event.namespace1",

    // {Number: OPTIONAL} The number of times the handler should fire.
    "fire": 10,

    // {String: OPTIONAL} Meant for event delegation, they are the filters to 
    // run on the fed in target element. Multiple filters can be used but only 
    // one needs to pass for the handlers to fire.
    "filters": "filter_1 filter_2 filter_n",

    // {String: REQUIRED} The handlers to fire. Handlers are fired from 
    // left to right.
    "handlers": "handler_1 handler_2 handler_n"    

});
```

## Add (listen) to an event: Usage

```js
// get from global scope
var eventr = window.eventrjs;

// set handler(s)
eventr.handlers({
    "handler_1": function(e) {
        console.log(e.type);
    }
});

// listen to window resize event & fire handler 10 times
eventr.events.add({
    "anchors": "window",
    "event": "resize",
    "fire": 50,
    "handlers": "handler_1"
});
```

## Remove event: Syntax

```js
eventr.events.add({
    
    // {String: REQUIRED} The anchors the event was attached to.
    "anchors": "window document #some_element_id", 
    
    // {String: REQUIRED} The event & optional namespace provided.
    "event": "event.namespace1",  

});
```

## Remove event: Usage

```js
// remove resize event from window
eventr.events.remove({
    "anchors": "window",
    "event": "resize",
});
```