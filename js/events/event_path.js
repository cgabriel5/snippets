/**
 * Creates the target elements path (target elements parents).
 *
 * @param {eventobject} event - The browsers EventObject.
 * @return {array} parents - The created path array containing
 *     the target elements parent elements.
 */
var build_path = function(event) {
    // Cache target element.
    var element = event.target;

    // There must be a target element...else return empty path.
    if (!event.target) {
        return [];
    }

    // Start building path.
    var parents = [element];

    while (element) {
        // The current parent element.
        element = element.parentNode;
        // If parent exists add to array.
        if (element) {
            parents.push(element);
        }
    }

    // Finally, return the path!
    return parents;
};

/**
 * Determine whether the provided element contains a parent with the
 *     provided class. If a class is not provided, a custom function
 *     function can be provided. This function basically acts as a
 *     delegate check function. The current looped over parent is
 *     provided. Do what is needed with the check and return the
 *     parent if the check passes.
 *
 * @param  {htmlelement} $el - The HTML element.
 * @param  {string|null} classname - The optional class name parent
 *     must have.
 * @param  {function} cb - If a classname is not provided, a custom
 *     function can be provided to check for needed parent.
 * @return {htmlelement|false} - The HTML element if check passes.
 *     Otherwise, false.
 */
var is_target_el = function($el, classname, cb) {
    // Get the target element parents.
    var parents = build_path({ target: $el });

    // Loop over the parents and check if any is a header
    // element.
    for (var i = 0, l = parents.length; i < l; i++) {
        var parent = parents[i];

        // If a custom function is provided run it.
        if (cb) {
            // Run the function.
            var result = cb.call(parent, parent, $el, parents);
            if (result) {
                return result;
            }
        } else if (classname) {
            // Get the classes.
            var classes = parent.classList;
            // Check if the parent contains the provided class.
            if (classes && classes.contains(classname)) {
                return parent;
            }
        }
    }

    // Not the element needed.
    return false;
};

// Custom check example for delegation check.
is_target_el($target, null, function(parent, $el, parents) {
    // If check logic passes return the parent (1st argument.).
    if (/*Check logic...*/) {
        return parent;
    }
});

// Usage.
document.addEventListener("click", function(event) {
    // build target path
    var path = build_path(event);

    // *Note: Google Chrome provides the path in the EventObject.
    // Accessing it is as simple as doing:
    var path = event.path;
    // However, FireFox does not provide this convenience.
});
