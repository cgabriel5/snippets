/**
 * @description [Determines which animation event the user's...
 *               browser supports and returns it.]
 * @return {String} [The browser prefixed animation event.]
 * @source [https://davidwalsh.name/css-animation-callback]
 */
function which_animation_event() {
    var el = document.createElement("div"),
        animations = {
            "animation": "animationend",
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        };
    for (var t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}

// usage
document.addEventListener(which_animation_event(), function() {
    console.log('animation finished!');
});

/**
 * @description [Determines which transition event the user's...
 *               browser supports and returns it.]
 * @return {String} [The browser prefixed transition event.]
 * @source [https://davidwalsh.name/css-animation-callback]
 */
function which_transition_event() {
    var el = document.createElement("div"),
        transitions = {
            "transition": "transitionend",
            "OTransition": "oTransitionEnd",
            "MozTransition": "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        };
    for (var t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

// usage
document.addEventListener(which_transition_event(), function() {
    console.log('transition finished!');
});
