/**
 * Get the amount page the has been y-scrolled as a percent.
 *
 * @return {number} - The percent scrolled.
 *
 * @resource [https://stackoverflow.com/a/8028584]
 */
var percent_scrolled = function() {
	var h = document.documentElement,
		b = document.body,
		st = "scrollTop",
		sh = "scrollHeight";

	// Calculate the percent.
	var percent =
		(h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;

	// If the page is not scrollable reset the percent to 0.
	if (h.scrollHeight === h.clientHeight) {
		percent = 0;
	}

	// Return the percent.
	return percent;
};
