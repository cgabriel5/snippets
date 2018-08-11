/**
 * Throttles provided function.
 *
 * @param {function} func - The function to throttle.
 * @param {number} time - The time to throttle by.
 * @param {object} scope - The scope in which to run function with.
 *
 * @return {function} - The new throttled function.
 * @resource [https://remysharp.com/2010/07/21/throttling-function-calls]
 */
var throttle = function(func, time, scope) {
    time = time || 250;
    var last, deferTimer;
    return function() {
        var context = scope || this,
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
};

// Usage.
var fn = throttle(function() { /* logic */ });
