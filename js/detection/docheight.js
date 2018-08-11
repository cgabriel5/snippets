/**
 * Get the max height of the document.
 *
 * @return {number} - The max height of the document.
 *
 * @resource [https://stackoverflow.com/a/1147768]
 */
var docheight = function() {
	/**
	 * Find the browser root element. The root element differs
	 *     in browsers. This function determines which to use.
	 *     The returned element element can then be used like
	 *     so: $root.scrollTop = 0;
	 *
	 * @return {HTMLElement} - The browser root element.
	 *
	 * @resource [https://gist.github.com/electerious/7ad886432f55cfcb4222]
	 * @resource [https://medium.com/@bdc/stripe-open-source-behind-the-scenes-59790999dea0]
	 */
	var $sroot = (function() {
		if ("scrollingElement" in document) {
			return document.scrollingElement;
		}

		var initial = document.documentElement.scrollTop;
		document.documentElement.scrollTop = initial + 1;

		var updated = document.documentElement.scrollTop;
		document.documentElement.scrollTop = initial;

		return updated > initial
			? document.documentElement
			: document.body;
	})();

	var body = document.body;

	// Return the biggest height.
	return Math.max(
		body.scrollHeight,
		body.offsetHeight,
		$sroot.clientHeight,
		$sroot.scrollHeight,
		$sroot.offsetHeight
	);
};
