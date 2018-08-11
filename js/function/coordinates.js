/**
 * Get the provided element's top coordinates.
 *
 * @return {number} - The top position.
 */
var coors = function($el) {
	// Get the rect information.
	var rect = $el.getBoundingClientRect();

	// Add the page coor positions.
	rect.pageY = rect.top + window.pageYOffset;
	rect.pageX = rect.left + window.pageXOffset;

	// Return rect object.
	return rect;
};
