/**
 * Escapes string to use it as a RegExp pattern.
 *
 * @param  {string} string - The literal string to escape.
 * @return {string} - The escaped string.
 *
 * @resource [https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript]
 * @resource [https://stackoverflow.com/a/30851002]
 */
var regexp_escape = function(string) {
	return string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
};
