/**
 * @description [Debounces provided function.]
 * @param  {Function} func            [The function to debounce.]
 * @param  {Number} time              [The time to debounce by.]
 * @param  {Object} scope             [The scope in which to run function with.]
 * @param  {Boolean} run_immediately  [Flag indicating whether the function
 *                                     should run immediately.]
 * @return {Function}                 [The new debounced function.]
 * @source debouncing function from John Hann
 * @source {http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/}
 * @source {https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/}
 * @resource [Another debounce function] {https://davidwalsh.name/javascript-debounce-function}
 */
function debounce(func, time, scope, run_immediately) {
    var timeout;
    return function() {
        var context = (scope || this),
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
}

// usage
var fn = debounce(function() { /* logic */ });
