/**
 * @description [Determines the vendor prefix for the visibility event and
 *               document peoperty.]
 * @return {Object} [Object contains the prefixed event and prefixed document
 *                   property to check is tab is visible to the user.]
 * @source [http://www.html5rocks.com/en/tutorials/pagevisibility/intro/]
 * @source [https://davidwalsh.name/page-visibility]
 * @source [https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API]
 */
function visibility() {

    // define vars
    var prefixes = ["", "moz", "ms", "webkit"],
        hidden, event;
    // loop over prefixes to find which the user's browser uses
    for (var i = 0, l = prefixes.length; i < l; i++) {
        var prefix = prefixes[i]; // cache iteration prefix
        // either "hidden" or prefix + "Hidden"
        hidden = prefix + (!prefix ? "h" : "H") + "idden";
        if (hidden in document) {
            event = prefix + "visibilitychange";
            break;
        }
    }
    // return object w/ info
    return {
        "state": hidden,
        "event": event
    };

}

// usage
var v = visibility(),
    visibility_event = v.event,
    is_hidden = v.state;

// fired when the content of a tab has become visible or has been hidden
// https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange
document.addEventListener(visibility_event, function() {
    if (document[is_hidden]) { // tab hidden
        console.log("stop video");
        // stop video
    } else { // tab back in view
        // play video
        console.log("play video");
    }
}, false);
