/**
 * Debounces provided function.
 *
 * @param {function} func - The function to debounce.
 * @param {number} time - The time to debounce by.
 * @param {object} scope - The scope in which to run function with.
 * @param {boolean} run_immediately - Flag indicating whether the
 *     function should run immediately.
 *
 * @return {function} - The new debounced function.
 *
 * @resource debouncing function from John Hann
 * @resource [http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/]
 * @resource [https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/]
 * @resource [https://davidwalsh.name/javascript-debounce-function]
 */
var debounce = function(func, time, scope, run_immediately) {
    var timeout;
    return function() {
        var context = scope || this,
            args = arguments;

        function delayed() {
            if (!run_immediately) {
                func.apply(context, args);
            }
            timeout = null;
        }
        if (timeout) {
            clearTimeout(timeout);
        } else if (run_immediately) {
            func.apply(context, args);
        }
        timeout = setTimeout(delayed, time || 100);
    };
};

// Usage.
var fn = debounce(function() { /* logic */ });
