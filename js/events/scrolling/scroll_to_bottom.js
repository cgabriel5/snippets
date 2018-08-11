/**
 * Scroll to bottom of page.
 *
 * @return {undefined} - Nothing.
 *
 * @resource [https://stackoverflow.com/a/33193668]
 */
var scroll_to_bottom = function() {
	$sroot.scrollTop = $sroot.scrollHeight;
};
