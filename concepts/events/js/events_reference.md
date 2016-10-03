## Events Resource
This resource serves to document JavaScript's many events for my future self.

## Most Common Events

```js
var doc         = "readystatechange DOMContentLoaded";
var resource    = "error abort load beforeunload unload";
var network     = "offline online";
var focus       = "focus blur focusin focusout";
var input       = "input change";
var websockets  = "open message close";
var history     = "pagehide pageshow popstate";
var css         = "animationstart animationend animationiteration transitionend";
var form        = "reset submit";
var printing    = "beforeprint afterprint";
var composition = "compositionstart compositionupdate compositionend";
var view        = "fullscreenchange fullscreenerror resize scroll";
var clipboard   = "cut copy paste";
var keyboard    = "keydown keypress keyup";
var mouse       = "mouseenter mouseleave mouseover mouseout mousemove ";
    mouse      += "mousedown mouseup click dblclick contextmenu wheel";
var selection   = "select selectstart selectionchange";
var drag_drop   = "drag dragstart dragend dragenter dragover dragleave drop";
var media       = "durationchange loadedmetadata loadeddata canplay ";
    media      += "canplaythrough ended emptied stalled suspend play playing ";
    media      += "pause waiting seeking seeked ratechange timeupdate ";
    media      += "volumechange";
var progress    = "loadstart loadend progress timeout";
var storage     = "storage";
var visibility  = "visibilitychange";
var url         = "hashchange";
```

## Prefixed Events 

These events, when used, must be vendor prefixed: `animationstart` `animationend` `animationiteration` `transitionend` `fullscreenchange` `fullscreenerror` `visibilitychange`

## Example Handler Used
```js
var handler = function(e) { console.log(e.type, e); };
```

## Target Elements 
The element or object the event can be attached to.
```js
// for example, when this is seeing, the event can be attached to the window, document, or an HTMLElement
(window | document | element).addEventListener("click", handler, false);
```

## Load Events

```js
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
// same as document.readyState === "interactive"
// https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
// listen to page load
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
});
```

```js
// https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
// listen to page load
document.addEventListener("readystatechange", function(event) {
    // 3 states:
    // loading     => document is still loading
    // interactive => document has finished loading. We can now access the DOM elements
    // complete    => page is fully loaded

    // alternative to DOMContentLoaded event
    if (document.readyState === "interactive") initApplication();
    // or...
    // alternative to load event
    if (document.readyState === "complete") initApplication();
});
```

```js
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
// **Target Elements: resources like: scripts, images, style sheets
// listen to page load
window.addEventListener("load", function(event) {
    // page has fully loaded, init app
    initApplication(); //  same as... (document.readyState === "complete")
});
```

```js
// listen to a xhr request
xhr.addEventListener("readystatechange", handler, false);

// better method to listen to a xhr request
// [http://stackoverflow.com/questions/9181090/is-onload-equal-to-readystate-4-in-
// xmlhttprequest/19247992#19247992]
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
xhr.addEventListener("load", handler, false);
```

```js
// lsiten to when an image loaded
var img = new Image();
img.addEventListener("load", handler, false);
img.src = "/the-url.extension";
```

## Error Events

```js
// listen for xhr request error
xhr.addEventListener("error", handler, false);

// lsiten to when an image fails to load
var img = new Image();
img.addEventListener("error", handler, false);
img.src = "/the-url.extension";
```

## Abort Events

```js
// listen for xhr request abort
xhr.addEventListener("abort", handler, false);
```

## BeforeUnload Events

```js
// https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
window.addEventListener("beforeunload", function(e) {
    var confirmationMessage = "\o/";

    e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
    return confirmationMessage; // Gecko, WebKit, Chrome <34
});

// https://developer.mozilla.org/en-US/docs/Web/Events/unload
window.addEventListener("unload", handler, false);
```

## Network Events

```js
// check if user is online [https://davidwalsh.name/detecting-online]
if (navigator.onLine) {
    // user is online
} else {
    // user offline
}

window.addEventListener("online", function() {
    console.log("connection established! :)");
}, false);
window.addEventListener("offline", function() {
    console.log("connection lost! :(");
}, false);
```

## Focus Events

```js
// typically used with form elements
// when the window or element gains focus
(window | element).addEventListener("focus", handler, false); // set capture to true to allow delegation
// when the window or element loses focus
(window | element).addEventListener("blur", handler, false); // set capture to true to allow delegation

// these two methods work in all browsers but FireFox
// this event does bubble
element.addEventListener("focusin", handler);
element.addEventListener("focusout", handler);
```

## Input Events

```js
// listens to an elements user input (every text changes)
element.addEventListener("input", handler, false);

// listen to when an input value changes after an element loses focus
// [http://stackoverflow.com/questions/17047497/what-is-the-difference-between-change-
// and-input-event-for-an-input-element/17047607#17047607]
// [http://rakshasingh.weebly.com/blog/what-is-the-difference-between-oninput-and-
// onchange-events-in-javascript]
element.addEventListener("change", handler, false);
```

## EventSource Events

```js
// https://www.html5rocks.com/en/tutorials/eventsource/basics/
```

## Page History Events

```js
// https://developer.mozilla.org/en-US/docs/Web/API/History_API
// https://developer.mozilla.org/en-US/docs/Web/Events/popstate
// https://developer.mozilla.org/en-US/docs/Web/Events/pageshow
// https://developer.mozilla.org/en-US/docs/Web/Events/pagehide
window.addEventListener("pageshow", handler);
window.addEventListener("pagehide", handler);
window.addEventListener("popstate", handler);
```

## CSS Events 

[View snippet](https://github.com/cgabriel5/snippets/blob/master/js/detection/which_animation_transition_event.js) for prefixed animation/transition CSS events. Functions determine which prefix the user's browser supports for `animationstart`, `animationend`, or `animationiteration` and `transitionend` events.

## Form Events

```js
// get form element
var form = document.getElementById("form");

// listen when a form is reset
form.addEventListener("reset", handler, false);
// listen when a form is submitted
form.addEventListener("submit", handler, false);
```

## Printing Events

```js
// only supported in FF and IE
window.addEventListener("beforeprint", handler, false);
window.addEventListener("afterprint", handler, false);

// for chrome [https://www.tjvantoll.com/2012/06/15/detecting-print-requests-with-javascript/]

// sadly opera does not support anything here
```

## TextComposition Events

```js
// http://blog.evanyou.me/2014/01/03/composition-event/
// https://www.stum.de/2016/06/24/handling-ime-events-in-javascript/
// https://developer.mozilla.org/en-US/docs/Mozilla/IME_handling_guide
// https://techblog.open-xchange.com/2014/12/02/android-chrome-and-composition-events/
element.addEventListener("compositionstart", handler, false);
element.addEventListener("compositionend", handler, false);
element.addEventListener("compositionupdate", handler, false);
```

## View Events

```js
// https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
// https://davidwalsh.name/fullscreen
// https://www.sitepoint.com/use-html5-full-screen-api/
// https://paulund.co.uk/javascript-full-screen-api
// listen when document goes fullscreen
document.addEventListener("fullscreenchange", handler);
document.addEventListener("webkitfullscreenchange", handler);
document.addEventListener("mozfullscreenchange", handler);
document.addEventListener("MSFullscreenChange", handler);
// for errors...
document.addEventListener("fullscreenerror", handler);
document.addEventListener("webkitfullscreenerror", handler);
document.addEventListener("mozfullscreenerror", handler);
document.addEventListener("MSFullscreenError", handler);

// listen to when the window gets resized
// **Note: these event fire a lot and should be used lightly or
// throttled/debounced when used.
window.addEventListener("resize", handler);
(window | document | element).addEventListener("scroll", handler);
```

## ClipBoard Events

```js
// https://developer.mozilla.org/en-US/docs/Web/Events/copy
(window | document | element).addEventListener("copy", handler);
// https://developer.mozilla.org/en-US/docs/Web/Events/cut
(window | document | element).addEventListener("cut", handler);
// https://developer.mozilla.org/en-US/docs/Web/Events/paste
(window | document | element).addEventListener("paste", handler);

// https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent/ClipboardEvent
// https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent#Browser_compatibility
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/getData
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/getData
// http://stackoverflow.com/questions/6413036/get-current-clipboard-content
// https://w3c.github.io/clipboard-apis/#the-cut-action
// test snippets:
document.addEventListener("paste", function(e) {
    console.log(e, e.clipboardData.getData("text/plain"));
});

document.addEventListener("copy", function(e) {
    e.clipboardData.setData("text/plain", "Hello, world!");
    e.clipboardData.setData("text/html", "<b>Hello, world!</b>");
    e.preventDefault(); // prevent browser from setting data to clipboard
});

document.addEventListener("cut", function(e) {
    e.clipboardData.setData("text/plain", "Hello, world!!!");
    e.preventDefault(); // prevent browser from setting data to clipboard
});
```

## Keyboard Events

```js
// http://keycode.info
// https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
// http://stackoverflow.com/questions/3396754/onkeypress-vs-onkeyup-and-onkeydown/3396805#3396805
// **Note: the keypress only register when a character key is pressed. this
// event also fires continously
(window | document | element).addEventListener("keydown", handler, false);
(window | document | element).addEventListener("keypress", handler, false);
(window | document | element).addEventListener("keyup", handler, false);
```

## Mouse Events

```js
// custom functions for these two events might be neccessary
// **Note: these events get fired only when entering the target element
// and not when hovering any child elements
(document | element).addEventListener("mouseenter", handler, false);
(document | element).addEventListener("mouseleave", handler, false);

// **Note: these events get fired when entering the target element
// AND when hovering any child elements
(window | document | element).addEventListener("mouseover", handler, false);
(window | document | element).addEventListener("mouseout", handler, false);

// **Note: this event fire a lot
(window | document | element).addEventListener("mousemove", handler, false);

(window | document | element).addEventListener("mousedown", handler, false);
(window | document | element).addEventListener("mouseup", handler, false);

// click, dblclick, rightclick
(window | document | element).addEventListener("click", handler, false);
(window | document | element).addEventListener("dblclick", handler, false);
(window | document | element).addEventListener("contextmenu", handler, false);

// wheel: [https://developer.mozilla.org/en-US/docs/Web/Events/wheel]
(window | document | element).addEventListener("wheel", handler, false);
// DOMMouseScroll, MouseScrollEvent, and mousewheel are all deprecated
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMMouseScroll
// https://developer.mozilla.org/en-US/docs/Web/API/MouseScrollEvent
// https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel
```

## Selection Events

```js
// https://developer.mozilla.org/en-US/docs/Web/Events

// listen to when text gets slected
(window | document | inputElement | textareaElement).addEventListener("select", handler, false);

// https://developer.mozilla.org/en-US/docs/Web/Events/selectstart#Browser_compatibility
(window | document | inputElement | textareaElement).addEventListener("selectstart", handler, false);
// https://developer.mozilla.org/en-US/docs/Web/Events/selectionchange
(document | inputElement | textareaElement).addEventListener("selectionchange", handler, false);
```

## Drag-N-Drop Events

```js
// http://www.webdesignerdepot.com/2013/08/how-to-use-html5s-drag-and-drop/
// https://www.html5rocks.com/en/tutorials/dnd/basics/

// drag n drop event has been initialized... set e.dataTransfer.setData("...
(window | document | element).addEventListener("dragstart", handler, false);
// if something is being dragged this event will fire every 350ms
(window | document | element).addEventListener("drag", handler, false);
// fired when a dragged element enters a valid drop target
(window | document | element).addEventListener("dragenter", handler, false);
// dragging the data source over a valid drop target
(window | document | element).addEventListener("dragover", handler, false);
// dragging data source of a valid drop target
(window | document | element).addEventListener("dragleave", handler, false);
// dopping data source onto valid drop target
(window | document | element).addEventListener("drop", handler, false);
// drag n drop event has completely ended, run any neccessary code here...
(window | document | element).addEventListener("dragend", handler, false);

// **Note: when dragging in files from desktop vs html elements on the page...
// the drop handler method will differ. Instead of using e.dataTransfer.getData()
// to access the files, the files will be in the e.dataTransder.files property.
// more info: [https://www.html5rocks.com/en/tutorials/dnd/basics/#toc-dnd-files],
// [https://www.html5rocks.com/en/tutorials/file/dndfiles/]
// read files in js: [https://www.html5rocks.com/en/tutorials/file/dndfiles/#toc-selecting-files-dnd]
```

## Media Events

```js
// process of loading an audio/video: [http://www.w3schools.com/jsref/event_ondurationchange.asp]
// 1. loadstart,
// 2. durationchange,
// 3. loadedmetadata,
// 4. loadeddata,
// 5. progress,
// 6. canplay,
// 7. canplaythrough
// example of video loading: [https://msdn.microsoft.com/en-us/library/ff974159(v=vs.85).aspx], 
// [http://samples.msdn.microsoft.com/Workshop/samples/media/videoevents.htm]

// listen to when the audio/video duration changes fom NaN to the actual
// duration of the said audio/video.
(audioElement | videoElement).addEventListener("durationchange", handler, false);

// fired when meta data of audio/video has been loaded
// meta data consists of: duration, dimensions (video only), and text tracks
// http://www.w3schools.com/jsref/event_onloadedmetadata.asp
(audioElement | videoElement).addEventListener("loadedmetadata", handler, false);

// fired when first frame of media has finished loading
// https://developer.mozilla.org/en-US/docs/Web/Events/loadeddata
// http://www.w3schools.com/jsref/event_onloadeddata.asp
(audioElement | videoElement).addEventListener("loadeddata", handler, false);

// when the browser can start to play media (enough data has been loaded to begin)
// https://developer.mozilla.org/en-US/docs/Web/Events/canplay
// http://www.w3schools.com/jsref/event_oncanplay.asp
(audioElement | videoElement).addEventListener("canplay", handler, false);

// fires when browser thinks it can play the media to its end w/o having to stop
// http://www.w3schools.com/jsref/event_oncanplaythrough.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/canplaythrough
(audioElement | videoElement).addEventListener("canplaythrough", handler, false);

// fires when the audio/video has reached the end or no further data is available
// http://www.w3schools.com/jsref/event_onended.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/ended
(audioElement | videoElement | MediaStreamTrack).addEventListener("ended", handler, false);

// fires when the media has become empty;
// http://www.w3schools.com/jsref/dom_obj_event.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/emptied
(audioElement | videoElement).addEventListener("emptied", handler, false);

// browser is trying to get media data but no data is coming in
// http://www.w3schools.com/jsref/event_onstalled.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/stalled
(audioElement | videoElement).addEventListener("stalled", handler, false);

// fired when media data loading has been suspended (intentioanlly)
// http://www.w3schools.com/jsref/event_onsuspend.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/suspend
(audioElement | videoElement).addEventListener("suspend", handler, false);

// fired when playback has begun
// http://www.w3schools.com/jsref/event_onplay.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/play
(audioElement | videoElement).addEventListener("play", handler, false);

// fired when playback is ready to start after having been paused or
// delayed due to lack of data
// http://www.w3schools.com/jsref/event_onplaying.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/playing
(audioElement | videoElement).addEventListener("playing", handler, false);

// fired when playback has been paused
// https://developer.mozilla.org/en-US/docs/Web/Events/pause
// http://www.w3schools.com/jsref/event_onpause.asp
(audioElement | videoElement).addEventListener("pause", handler, false);

// fired when playback has stopped because of a temporary lack of data
// http://www.w3schools.com/jsref/event_onwaiting.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/waiting
(audioElement | videoElement).addEventListener("waiting", handler, false);

// fired when a seek operation has begun (i.e when user starts moving/skipping
// to a new position in the audio/video)
// http://www.w3schools.com/jsref/event_onseeking.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/seeking
(audioElement | videoElement).addEventListener("seeking", handler, false);

// fired when user has finished moving/seeking to a new position in the
// audio/video (i.e. when a seek operation has completed)
// http://www.w3schools.com/jsref/event_onseeked.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/seeked
(audioElement | videoElement).addEventListener("seeked", handler, false);

// fired when playback rate has changes (i.e. when user changes playing speed to
// play media slower or faster)
// http://www.w3schools.com/jsref/event_onratechange.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/ratechange
(audioElement | videoElement).addEventListener("ratechange", handler, false);

// fired when the time indicated by currentTime attribute has been updated
// (i.e. when playing position of an audio/video has changed)
// http://www.w3schools.com/jsref/event_ontimeupdate.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/timeupdate
(audioElement | videoElement).addEventListener("timeupdate", handler, false);

// fired when volume has changed
// http://www.w3schools.com/jsref/event_oncomplete.asp
// https://developer.mozilla.org/en-US/docs/Web/Events/volumechange
(audioElement | videoElement).addEventListener("volumechange", handler, false);
```

## Progress Events

```js
// example: [http://samples.msdn.microsoft.com/Workshop/samples/media/videoevents.htm]
// for video and audio elements: 
// occurs when Windows Internet Explorer begins looking for media data 
// [https://msdn.microsoft.com/en-us/library/ff974159(v=vs.85).aspx]
// when working with files: 
// [https://www.nczonline.net/blog/2012/05/22/working-with-files-in-javascript-part-3/]
// listen to when an audio or video has started to load
(videoElement | audioElement).addEventListener("loadstart", handler, false);

// when working with files: 
// [https://www.nczonline.net/blog/2012/05/22/working-with-files-in-javascript-part-3/]
// https://developer.mozilla.org/en-US/docs/Web/Events/loadend
// **Note: this event will ALWAYS fire and will fire after the error, abort, or
// load events have fired.
fileObject.addEventListener("loadend", handler, false);

// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
// One can also detect all three load-ending conditions (abort, load, or error)
// using the loadend event
// **Note: there is no way to be certain, from the information received by the loadend event,
// as to which condition caused the operation to terminate; however, you can use this to
// handle tasks that need to be performed in all end-of-transfer scenarios.
xhr.addEventListener("loadend", handler, false);

// to listen to for the progress on something like a XHR request, new FileReader()...
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress
(new XMLHttpRequest() | new FileReader()).addEventListener("progress", function(e) {
    // get the lengthComputable property
    if (e.lengthComputable) {
        var percent_complete = (e.loaded / e.total);
    } else {
        // unable to compute progress because total size is unknown
    }
}, false);

// listen if the XHR request timedout (progression terminated due to present time expiring,
// server took too long to respond)
xhr.addEventListener("timeout", handler, false);
```

## Storage Events

```js
// **Note: changes made on the same page will not be listened to. only
// storage modifications made on other tabs of the same domain will be
// listened to.
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent
window.addEventListener("storage", handler, false);
```

## PageVisibility Events

[View snippet](https://github.com/cgabriel5/snippets/blob/master/js/detection/which_visibility.js) for prefixed page visibilitychange event. Function returns the correctly prefixed visibilitychange event.

## URL Events

```js
// fires when the URL hash has changed
// https://developer.mozilla.org/en-US/docs/Web/Events/hashchange
window.addEventListener("hashchange", handler, false);
```

## Resources
* [MDN Events Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
* [W3Schools DOM Events Reference](http://www.w3schools.com/jsref/dom_obj_event.asp)