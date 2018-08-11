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

	return updated > initial ? document.documentElement : document.body;
})();
