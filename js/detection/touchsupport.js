/**
 * Detect whether device supports touch events.
 *
 * @return {boolean} - Boolean indicating touch support.
 *
 * @resource [https://stackoverflow.com/a/20293441]
 */
var touchsupport = function() {
	try {
		document.createEvent("TouchEvent");
		return true;
	} catch (e) {
		return false;
	}
};
