/**
 * Return the UAParser parsed user agent object.
 *
 * @return {object} - The UAParser object.
 */
var user_agent = function() {
	return UAParser(navigator.userAgent);
};

/**
 * Determine whether browser is Chrome and running a desktop device.
 *
 * @return {boolean} - Boolean indicating whether browser is Chrome
 *     and running a desktop device.
 */
var is_desktop_chrome = function() {
	// Get the user agent object.
	var ua = user_agent();

	// Only apply to Chrome WebKit/Desktop browser.
	return ua.browser.name &&
		/^(chr)/i.test(ua.browser.name) &&
		!ua.device.type
		? true
		: false;
};

/**
 * Determine whether browser Webkit based, running on a desktop device
 *     and is not MacOS.
 *
 * @return {boolean} - Boolean indicating whether the above conditions
 *     are true..
 */
var is_desktop_webkit = function() {
	// Get the user agent object.
	var ua = user_agent();

	return (
		// No MacOS.
		ua.os.name !== "Mac OS" &&
		// Only Webkit browsers.
		ua.engine.name === "WebKit" &&
		// Must be a desktop device.
		!ua.device.type
	);
};
