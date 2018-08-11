/**
 * Check whether the child element is in "view" or hidden
 *     in the parent's overflow.
 *
 * @param  {htmlelement} container - The parent element.
 * @param  {htmlelement} element - The child element.
 * @param  {boolean} partial - Whether the child's visibility
 *     can be partial. By default the function looks to whether
 *     the element is completely hidden.
 * @return {boolean} - Wheter the child element is visible.
 *
 * @resource [https://stackoverflow.com/a/37285344]
 */
var is_in_view = function(container, element, partial) {
	// Get container properties.
	let ctop = container.scrollTop;
	let cbottom = ctop + container.clientHeight;

	// Get element properties.
	let etop = element.offsetTop;
	let ebottom = etop + element.clientHeight;

	// Check if in view.
	let istotal = etop >= ctop && ebottom <= cbottom;
	let ispartial =
		partial &&
		((etop < ctop && ebottom > ctop) ||
			(ebottom > cbottom && etop < cbottom));

	// Return outcome.
	return istotal || ispartial;
};
