/**
 * Check whether the provided element is scrollable along the provided
 *     axis.
 * @param  {string} axis - The axis to determine scrollability.
 * @param  {HTMLElement} $el - The element to check.
 * @return {Boolean} - Boolean indicating whether the element is
 *     scrollable along the provided axis.
 *
 * @resource [https://stackoverflow.com/a/2146905]
 */
var is_element_scrollable = function(axis, $el) {
	// By default check if y scrollable.
	axis = axis || "y";
	var dimension = axis === "y" ? "Height" : "Width";
	var check;

	// If the element is a "regular" element (i.e. not one of the
	// following) do not check against the window.
	if (
		![
			document.getElementsByTagName("html")[0],
			document.documentElement,
			document.body
		].includes($el)
	) {
		check = $el[`scroll${dimension}`] > $el[`client${dimension}`];
	} else {
		// [https://stackoverflow.com/a/2147156]
		check = $el[`scroll${dimension}`] > window[`inner${dimension}`];
	}

	return check;
};
