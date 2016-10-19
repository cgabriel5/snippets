# eventrjs

A lightweight JavaScript library for handling events.

##### Table of Contents

[What It Does](#what-it-does)  
[Add To Project](#add-to-project)  
[Access Library](#access-library)  
[API Method Table](#api-method-table)  
[Handlers](#handlers)  
[Delegation](#delegation)  
[Listen To Event](#listen-to-event)  
[Stop Listening To Event](#stop-listening-to-event)  
[Disable Event](#disable-event)  
[Enable Event](#enable-event)  
[Update Event](#update-event)  
[Example Usage Concept](#example-usage-concept)  
[TODO](#todo)  
[License](#license)  

<a name="what-it-does"></a>
### What It Does

* Listens/Removes events
* Disables/Enables events
* Updatable events
* Limit handler function execution

<a name="add-to-project"></a>
### Add To Project

```html
<script src="my_js_directory_path/eventr.js"></script>
```

<a name="access-library"></a>
### Access Library

```js
var eventr = eventrjs;
// or
var eventr = window.eventrjs;
```

<a name="api-method-table"></a>
### API Method Table

Method | Function
------------ | -------------
**handlers** | Stores event handlers
**filters** | Stores delegation filters (if delegation is needed)
**add** | Listens to an added event
**remove** | Remove an event from eventrjs
**disable** | Disables an event until enabled
**enable** | Enables a disabled event
**update** | Updates an event (i.e. change fire count)

<a name="handlers"></a>
### Handlers

**event.handlers** &mdash; Stores event handlers. Event handlers must be stored before listening to any events.

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

**Note:** eventrjs adds 3 new properties to the event object for convenience. They are the following:

Property Name | Description
------------- | -----------
e.eventrAnchor | The element which the event is attached to
e.eventrDelegate | Only provided when delegation filters are used. If present same as `e.eventrAnchor` otherwise `null`
e.eventrCurrentTarget | The element that started the event

<a name="delegation"></a>
### Delegation

**event.filters** `event-delegation` &mdash; Stores delegation filters if delegation is needed.

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

<a name="listen-to-event"></a>
### Listen To Event

**eventr.events.add** &mdash;  `syntax` Listens to an added event.

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
    "handlers": "handler_1 handler_2 handler_n",

    // {String: OPTIONAL} ID is used to reference event to disable/enable 
    // and update event.
    // **Note: ID needs to be unique.
    "id": "some-event-id"

});
```

<a href="stop-listening-to-event"></a>
### Stop Listening To Event

**eventr.events.remove** &mdash;  `syntax` Remove an event from eventrjs.

```js
eventr.events.remove({
    
    // {String: REQUIRED} The anchors the event was attached to.
    "anchors": "window document #some_element_id", 
    
    // {String: REQUIRED} The event & optional namespace provided.
    "event": "event.namespace1"

});
```

<a href="disable-event"></a>
### Disable Event

**eventr.events.disable** &mdash;  `syntax` Disables an event until enabled.

```js
// Takes 1 parameter of type String => the ID of the event
eventr.events.disable(String: eventID);
```

<a href="enable-event"></a>
### Enable Event

**eventr.events.enable** &mdash;  `syntax` Enables a disabled event.

```js
// Takes 1 parameter of type String => the ID of the event.
eventr.events.enable(String: eventID);
```

<a name="update-event"></a>
### Update Event

**eventr.events.update** &mdash;  `syntax` Updates an event (i.e. change fire count).

**Note:** At the moment only updating the `fire` count is possible.

```js
eventrjs.events.update({

    // {String: REQUIRED} The ID of the event.
    "id": "some-event-id",

    // {Number: REQUIRED} The new fire count.
    "fire": 10

});
```

<a name="example-usage-concept"></a>
### Example Usage Concept


```js
// cache library for use
var eventr = window.eventrjs;

// set handler(s)
eventr.handlers({
    "handler_1": function(e) {
        console.log(e.type);
    }
});

// listen to window resize event & fire handler 250 times
eventr.events.add({
    "anchors": "window",
    "event": "resize",
    "fire": 250,
    "handlers": "handler_1",
    "id": "resize-event"
});

// disable event with id of "resize event" after 3 seconds
setTimeout(function() {

    console.log("disable event (-)");
    eventr.events.disable("resize-event");

}, 3000);

// enable event with id of "resize event" after 3 seconds
setTimeout(function() {

    console.log("enable event (✔)");
    eventr.events.enable("resize-event");

}, 5000);

// update the fire count to 250 of the event with ID "resize-event"
setTimeout(function() {

    console.log("update event (+)");
    eventr.events.update({
        "id": "resize-event",
        "fire": "250"
    });

}, 7000);

// remove resize event from window after 10 seconds
setTimeout(function() {

    console.log("remove event (✕)");
    eventr.events.remove({
        "anchors": "window",
        "event": "resize"
    });

}, 10000);
```

<a name="todo"></a>
### TODO

- [ ] Add more functionality to update() method (allow for updatable handlers, filters)
- [ ] Add throttle/debounce capability

<a name="license"></a>
## License

This project uses the [MIT License](https://github.com/cgabriel5/snippets/blob/master/concepts/events/LICENSE.txt).