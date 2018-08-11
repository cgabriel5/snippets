/**
 * Get all the text nodes found inside the provided element.
 *
 * @param  {htmlelement} el - The element to use as the source.
 * @return {array} - The array containing all found text nodes.
 *
 * @resource [https://stackoverflow.com/a/10730777]
 */
function textnodes($el) {
	// If no element is provided fallback to the body.
	$el = $el || document.body;

	var n,
		tnodes = [],
		walk = document.createTreeWalker($el, NodeFilter.SHOW_TEXT, null, false);

	// Find all text nodes.
	while ((n = walk.nextNode())) tnodes.push(n);

	// Return found text nodes.
	return tnodes;
}
