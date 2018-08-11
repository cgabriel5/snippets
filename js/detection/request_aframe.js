/**
 * Determine correct requestAnimationFrame function.

 * @return {function} - The correct function to use.
 *
 * @resource [https://gist.github.com/mrdoob/838785]
 * @resource [https://davidwalsh.name/requestanimationframe-shim]
 */
var request_aframe = (function() {
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 250 / 60);
		}
	);
})();
