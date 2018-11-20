/**
 * Get the amount page the has been y-scrolled as a percent.
 *     Can also provide an element to find its amount scrolled. Axis
 *     can also be provided. Defaults to finding the document's y
 *     scroll amount.
 *
 * @param {string} axis - The axis of which to find the amount scrolled.
 *     Provide either "x" or "y".
 * @param {HTMLElement} $el - HTML Element to find the amount scrolled.
 * @return {number} - The percent scrolled.
 *
 * @resource [https://stackoverflow.com/a/8028584]
 */
var percent_scrolled = function(axis, $el) {
	// By default get the y:Width scroll amount.
	axis = axis || "y";
	var dimension = axis === "y" ? "Height" : "Width";
	axis = axis === "y" ? "Top" : "Left";

	var $h = $el || document.documentElement,
		$b = $el || document.body,
		st = `scroll${axis}`,
		sh = `scroll${dimension}`;

	// Calculate the percent.
	var percent =
		($h[st] || $b[st]) /
		(($h[sh] || $b[sh]) - $h[`client${dimension}`]) *
		100;

	// If the page is not scrollable reset the percent to 0.
	if ($h[`scroll${dimension}`] === $h[`client${dimension}`]) {
		percent = 0;
	}

	// Return the percent.
	return percent;
};
