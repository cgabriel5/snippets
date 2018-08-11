/**
 * Remove line breaks and tab characters from a string.
 *
 * @param  {string} string - The string to use.
 * @return {string} - The cleaned string.
 */
var remove_space = function(string) {
	return string.replace(/(\r\n|\n|\r|\t)/g, "");
};
