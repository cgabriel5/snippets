/**
 * @description [Throttles provided function.]
 * @param  {Function} func            [The function to throttle.]
 * @param  {Number} time              [The time to throttle by.]
 * @param  {Object} scope             [The scope in which to run function with.]
 * @return {Function}                 [The new throttled function.]
 * @source {https://remysharp.com/2010/07/21/throttling-function-calls}
 */
function throttle(func, time, scope) {
    time = (time || 250);
    var last, deferTimer;
    return function() {
        var context = (scope || this),
            now = +new Date(),
            args = arguments;
        if (last && now < last + time) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                func.apply(context, args);
            }, time);
        } else {
            last = now;
            func.apply(context, args);
        }
    };
}

// usage
var fn = throttle(function() { /* logic */ });
