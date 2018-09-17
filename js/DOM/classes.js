/**
 * Remove/add an element's classes.
 *
 * @param-1 {htmlelement} - The element to remove/add classes to.
 * @param-2:N {object} data - The classes to remove/add.
 * @return {classlist} - The element's 'classList' property.
 */
var classes = function() {
	// Turn the arguments into an array.
	var args = Array.prototype.slice.call(arguments);

	// Get the element.
	var $el = args.shift();
	// Get the class list.
	var clist = $el.classList;

	// Add/remove classes.
	for (let i = 0, l = args.length; i < l; i++) {
		// Cache current loop item.
		var name = args[i];

		// Check whether removing or adding.
		var remove = /^\!/.test(name);

		// Remove the ! identifier.
		name = name.replace(/^\!/g, "");

		// Add/remove the class name.
		clist[remove ? "remove" : "add"](name);
	}

	// Return the class list.
	return clist;
};
