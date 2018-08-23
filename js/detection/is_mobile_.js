/**
 * Return the UAParser parsed user agent object.
 *
 * @return {object} - The UAParser object.
 */
var user_agent = function() {
	return UAParser(navigator.userAgent);
};

/**
 * Detect whether the device is a "mobile" device. Basically anything
 *     other than a desktop device.
 *
 * @return {boolean} - Boolean indicating whether device is "mobile".
 */
var is_mobile = function() {
	return user_agent().device.type;
};

/**
 * Detect whether viewport is within "mobile" size.
 *
 * @return {boolean} - Boolean indicating whether in "mobile" size.
 */
var is_mobile_viewport = function() {
	return !window.matchMedia("(min-width: 769px)").matches;
};
