/**
 * Remove all or almost all child elements from an element.
 *
 * @param  {htmlelement} $el - The element to remove from.
 * @param  {number} offset - An optional offset. For example, providing an
 *     offset of 3 will remove all children but the first 3.
 * @return {undefined} - Nothing.
 */
var empty = function($el, offset) {
	// Default the offset to 0.
	offset = offset || 0;

	while ($el.childNodes.length > offset) {
	    $el.removeChild($el.lastChild);
	}
};
