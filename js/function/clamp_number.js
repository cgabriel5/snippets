/**
 * Set upper/lower (max/min) bounds on a value.
 *
 * @param  {number} val - The number to clamp.
 * @param  {number} min - The min value the number can be.
 * @param  {number} max - The max value the number can be.
 * @return {number} - The clamped number.
 *
 * @resource [https://stackoverflow.com/a/16861139]
 */
var clamp = function(val, min, max) {
	if (max) {
		val = Math.min(val, max);
	}
	if (min) {
		val = Math.max(val, min);
	}

	// Return clamped value.
	return val;
};
