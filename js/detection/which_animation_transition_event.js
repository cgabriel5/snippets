// https://www.sitepoint.com/css3-animation-javascript-event-handlers/
// W3C standard         Firefox             webkit                      Opera                   IE10
// animationstart       animationstart      webkitAnimationStart        oanimationstart         MSAnimationStart
// animationiteration   animationiteration  webkitAnimationIteration    oanimationiteration     MSAnimationIteration
// animationend         animationend        webkitAnimationEnd          oanimationend           MSAnimationEnd
/**
 * @description [Determines which animation[start|end|interation] event
 *               the user's browser supports and returns it.]
 * @param  {String} type [The event type: either start, end, or iteration.]
 * @return {String}      [The browser prefixed animation event.]
 * @source [https://davidwalsh.name/css-animation-callback]
 */
function which_animation_event(type) {
    // lowercase type
    type = type.toLowerCase();
    var el = document.createElement("div"),
        animations = {
            "animation": "animation",
            "OAnimation": "oAnimation",
            "oanimation": "oanimation",
            "MozAnimation": "animation",
            "WebkitAnimation": "webkitAnimation",
            "MSAnimation": "MSAnimation"
        };
    for (var animation in animations) {
        if (el.style[animation] !== undefined) {
            // cache value
            var value = animations[animation];
            // determine if suffix needs to be capitalized
            var end = (value.match(/[A-Z]/) ? (type.charAt(0)
                .toUpperCase() + type.substring(1)) : type);
            // return prefixed event
            return value + end;
        }
    }
}
// usage
document.addEventListener(which_animation_event("end"), function() {
    console.log('animation finished!');
});
/**
 * @description [Determines which animation[start|end|interation] event
 *               the user's browser supports and returns it.]
 * @param  {String} type [The event type: either start, end, or iteration.]
 * @return {String}      [The browser prefixed transition event.]
 * @source [https://davidwalsh.name/css-animation-callback]
 */
function which_transition_event(type) {
    // lowercase type
    type = type.toLowerCase();
    var el = document.createElement("div"),
        transitions = {
            "transition": "transition",
            // opera prefix info: [https://developer.mozilla.org/en-US/docs/Web/Events/transitionend]
            "OTransition": "oTransition",
            "otransition": "otransition",
            "MozTransition": "transition",
            "WebkitTransition": "webkitTransition",
            "MSTransition": "MSTransition"
        };
    for (var transition in transitions) {
        if (el.style[transition] !== undefined) {
            // cache value
            var value = transitions[transition];
            // determine if suffix needs to be capitalized
            var end = (value.match(/[A-Z]/) ? (type.charAt(0)
                .toUpperCase() + type.substring(1)) : type);
            // return prefixed event
            return value + end;
        }
    }
}
// **Note: Only transitionend is supported. transitionstart is still experimental and should
// not be used. transitioniteration does not even exist. Therefore, at the moment, only "end" should
// be supplied.
// transitionstart: [https://developer.mozilla.org/en-US/docs/Web/Events/transitionstart]
// [https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent]
// usage
document.addEventListener(which_transition_event("end"), function() {
    console.log('transition finished!');
});
// other resources
// [http://www.andismith.com/blog/2012/02/modernizr-prefixed]
// [https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/]
