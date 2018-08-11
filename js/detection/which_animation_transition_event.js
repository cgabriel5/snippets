/**
 * Determines which animation[start|end|iteration] event the user's
 *     browser supports and returns it.
 *
 * @param {string} type - The event type: either start, end, or
 *     iteration.
 * @return {string} - The browser prefixed transition event.
 *
 * @resource [https://davidwalsh.name/css-animation-callback]
 * @resource [https://www.sitepoint.com/css3-animation-javascript-event-handlers/]
 */
var which_animation_event = function(type) {
    // Lowercase type.
    type = type.toLowerCase();
    var el = document.createElement("div"),
        animations = {
            animation: "animation",
            OAnimation: "oAnimation",
            oanimation: "oanimation",
            MozAnimation: "animation",
            WebkitAnimation: "webkitAnimation",
            MSAnimation: "MSAnimation"
        };
    for (var animation in animations) {
        if (el.style[animation] !== undefined) {
            // Cache value.
            var value = animations[animation];

            // Determine if suffix needs to be capitalized.
            var end = value.match(/[A-Z]/)
                ? type.charAt(0).toUpperCase() + type.substring(1)
                : type;

            // Return prefixed event.
            return value + end;
        }
    }
};

// Usage.
document.addEventListener(which_animation_event("end"), function() {
    console.log("Animation finished!");
});

/**
 * Determines which animation[start|end|iteration] event the user's
 *     browser supports and returns it.
 *
 * @param {string} type - The event type: either start, end, or
 *     iteration.
 * @return {string} - The browser prefixed transition event.
 *
 * @resource [https://davidwalsh.name/css-animation-callback]
 */
var which_transition_event = function(type) {
    // Lowercase type.
    type = type.toLowerCase();

    var el = document.createElement("div"),
        transitions = {
            transition: "transition",
            // Opera prefix info:
            // [https://developer.mozilla.org/en-US/docs/Web/Events/transitionend]
            OTransition: "oTransition",
            otransition: "otransition",
            MozTransition: "transition",
            WebkitTransition: "webkitTransition",
            MSTransition: "MSTransition"
        };

    for (var transition in transitions) {
        if (el.style[transition] !== undefined) {
            // Cache value.
            var value = transitions[transition];

            // Determine if suffix needs to be capitalized.
            var end = value.match(/[A-Z]/)
                ? type.charAt(0).toUpperCase() + type.substring(1)
                : type;

            // Return prefixed event.
            return value + end;
        }
    }
};
// **Note: Only transitionend is supported. transitionstart is still
// experimental and should not be used. transitioniteration does not even
// exist. Therefore, at the moment, only "end" should be supplied.
// transitionstart: [https://developer.mozilla.org/en-US/docs/Web/Events/transitionstart]
// [https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent]

// Usage.
document.addEventListener(which_transition_event("end"), function() {
    console.log("Transition finished!");
});

// Other resources.
// [http://www.andismith.com/blog/2012/02/modernizr-prefixed]
// [https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/]
