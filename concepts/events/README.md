# eventrjs

A lightweight JavaScript library for handling events.

### What it does

* Listens/Removes events
* Disables/Enables events
* Updatable events
* Limit handler function execution

### Add to project

```html
<script src="my_js_directory_path/eventrjs.js"></script>
```

### Access library

```js
var eventr = eventrjs;
// or
var eventr = window.eventrjs;
```

## API
`eventr.handlers()` &mdash; Stores event handlers.

`eventr.filters()` &mdash; Stores delegation filters if delegation is needed.

`eventr.events.add()` &mdash; Listens to an added event.

`eventr.events.remove()` &mdash; Remove an event from eventrjs.

`eventr.events.disable()` &mdash; Disables an event until enabled.

`eventr.events.enable()` &mdash; Enables a disabled event.

`eventr.events.update()` &mdash; Updates an event (i.e. change fire count).

### event.handlers()

Event handlers must be stored before listening to any events.

**Note:** eventrjs adds 3 new properties to the event object for convenience. They are the following:

`e.eventrAnchor` &mdash; The element which the event is attached to.

`e.eventrDelegate` &mdash; Only provided when delegation filters are used. If present same as `e.eventrAnchor` otherwise `null`.

`e.eventrCurrentTarget` &mdash; The element that started the event.

```js
var handler_3 = function(e) {
    console.log("Handler 3");
};

eventr.handlers({
    "handler_1": function(e) {
        console.log("Handler 1");
    },
    "handler_2": function(e) {
        console.log("Handler 2");
    },
    "handler_3": handler_3
});
```

### event.filters() `event-delegation`

In order to use event delegation the use of `filters` is needed. A `filter` is just a function that is fed the event's target element. The `filter` if passed should return the `target` otherwise `null`.

The first two filters below use [funneljs](https://github.com/cgabriel5/funneljs), a JavaScript selector engine, to filter the target element while the third filter shows how Vanilla JavaScript can be used.

**Note:** `filter_1` and `filter_3` are, in essence, the same filter. `filter_1` just uses [funneljs](https://github.com/cgabriel5/funneljs) while `filter_3` uses Vanilla JavaScript.

```js
eventr.filters({
    "filter_1": function(target) { // uses funneljs
        // target element must have the orange class and no data-app attribute
        var check = (funneljs(target).classes("orange").attrs("[!data-app]").pop().length);
        return check ? target : null;
    },
    "filter_2": function(target) { // uses funneljs
        // target element's parents must have the orange class and no data-app attribute
        var check = (funneljs(target).parents().classes("orange").attrs("[!data-app]").pop().length);
        return check ? target : null;
    },
    "filter_3": function(target) { // uses Vanilla JavaScript
        // target element must have the orange class and no data-app attribute
        var check = (target.classList.contains("orange") && !target.hasAttribute("data-app"));
        return check ? target : null;
    }
});
```

### eventr.events.add() `syntax`

```js
eventr.events.add({
    
    // {String: REQUIRED} The anchors to attach event to.
    "anchors": "window document #some_element_id", 
    
    // {String: REQUIRED} The event & optional namespace.
    "event": "event.namespace1",

    // {Number: OPTIONAL} The number of times the handler should fire. The 
    // event is removed after fire count has zeroed.
    "fire": 10,

    // {String: OPTIONAL} Meant for event delegation, they are the filters to 
    // run on the fed in target element. Multiple filters can be used but only 
    // one needs to pass for the handlers to fire.
    "filters": "filter_1 filter_2 filter_n",

    // {String: REQUIRED} The handlers to fire. Handlers are fired from 
    // left to right.
    "handlers": "handler_1 handler_2 handler_n"

    // {String: OPTIONAL} ID is used to reference event to disable/enable 
    // and update event.
    // **Note: ID needs to be unique.
    "id": "some-event-id"

});
```

### eventr.events.add() `usage`

```js
// set handler(s)
eventr.handlers({
    "handler_1": function(e) {
        console.log(e.type);
    }
});

// Listen to window resize event & fire handler 10 times.
eventr.events.add({
    "anchors": "window",
    "event": "resize",
    "fire": 50,
    "handlers": "handler_1",
    "id": "resize-event"
});
```

### eventr.events.remove() `syntax`

```js
eventr.events.remove({
    
    // {String: REQUIRED} The anchors the event was attached to.
    "anchors": "window document #some_element_id", 
    
    // {String: REQUIRED} The event & optional namespace provided.
    "event": "event.namespace1"

});
```

### eventr.events.remove() `usage`

```js
// remove resize event from window
eventr.events.remove({
    "anchors": "window",
    "event": "resize"
});
```

### eventr.events.disable() `syntax`

```js
// Takes 1 parameter of type String => the ID of the event
eventr.events.disable(String: eventID);
```

### eventr.events.disable() `usage`

```js
// Disable event with id of "resize event".
eventr.events.disable("resize-event");
```

### eventr.events.enable() `syntax`

```js
// Takes 1 parameter of type String => the ID of the event.
eventr.events.enable(String: eventID);
```

### eventr.events.enable() `usage`

```js
// Enable event with id of "resize event".
eventr.events.enable("resize-event");
```

### eventr.events.update() `syntax`

**Note:** At the moment only updating the `fire` count is possible.

```js
eventrjs.events.update({

    // {String: REQUIRED} The ID of the event.
    "id": "some-event-id",

    // {Number: REQUIRED} The new fire count.
    "fire": 10

});
```

### eventr.events.update() `usage`

```js
// Update the fire count to 20 of the event with ID "resize-event".
eventr.events.update({
    "id": "resize-event",
    "fire": "20"
});
