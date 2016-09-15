/**
 * @description [Creates the target elements path (target elements parents).]
 * @param  {EventObject} event   [The browsers EventObject]
 * @return {Array}       parents [The created path array containing...
 *                                the target elements parent elements.]
 */
function build_path(event) {
    // cache target element
    var element = event.target;
    // there must be a target element...else return empty path
    if (!event.target) return [];
    // start building path
    var parents = [element];
    while (element) {
        // the current parent element
        element = element.parentNode;
        // if parent exists add to array
        if (element) parents.push(element);
    }
    // finally, return the path!
    return parents;
}

// usage
document.addEventListener("click", function(event) {
    // build target path
    var path = build_path(event);

    // *Note: Google Chrome provides the path in the EventObject.
    // Accessing it is as simple as doing:
    var path = event.path;
    // However, FireFox does not provide this convenience.
});
