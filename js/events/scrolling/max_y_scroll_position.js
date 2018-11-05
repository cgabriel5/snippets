/**
 * Calculate the maximum amount the page can be scrolled.
 *     The calculation is determined by the following:
 *     (max_y_scroll_amount - window_inner_height).
 *
 * @return {number} - The maximum page Y scroll position.
 *
 * @resource [https://stackoverflow.com/a/17698713]
 * @resource [https://stackoverflow.com/a/1766996]
 */
var max_y_scroll_position = function() {
	return (
		Math.max(
			document.body.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.clientHeight,
			document.documentElement.scrollHeight,
			document.documentElement.offsetHeight
		) - window.innerHeight
	);
};
