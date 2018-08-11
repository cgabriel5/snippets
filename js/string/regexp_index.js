/**
 * Return index of RegExp match in a string.
 *
 * @param  {string} string - The string.
 * @param  {regexp} regexp - The RegExp to use.
 * @param  {number} startindex - The optional index to start string from.
 * @return {number} - The index of RegExp match.
 *
 * @resource [https://stackoverflow.com/a/21420210]
 */
var regexp_index = function(string, regexp, startindex) {
	// Default start index to zero.
	startindex = startindex || 0;

	// If a start index is provided, clip the string to start
	// the string at the start index.
	string = startindex ? string.substring(startindex) : string;

	// Get the match information.
	var match = string.match(regexp);

	// If a match exists then get the index of match.
	return match ? string.indexOf(match[0]) + startindex : -1;
};

// Usage.

regexp_index("Hello world!", /llo/i); // 2
regexp_index("Hello world!", /llo/i, 0); // 2
regexp_index("Hello world!", /llo/i, 6); // -1

/**
 * Return index of RegExp match in a string starting from the right.
 *
 * @param  {string} string - The string.
 * @param  {regexp} regexp - The RegExp to use.
 * @param  {number} startindex - The optional index to start string from.
 * @return {number} - The index of RegExp match.
 *
 * @resource [https://stackoverflow.com/a/21420210]
 */
var regexp_index_right = function(string, regexp, startindex) {
	// Default start index to zero.
	startindex = startindex || 0;

	// If a start index is provided, clip the string to start
	// the string at the start index.
	string = startindex ? string.substring(0, startindex) : string;

	// Get the match information.
	var match = string.match(regexp);

	// If a match exists then get the index of match.
	return match ? string.lastIndexOf(match[match.length - 1]) : -1;
};

// Usage.

regexp_index_right("Hello world! Mello!", /llo/i); // 15
regexp_index_right("Hello world! Mello!", /llo/i, 0); // 15
regexp_index_right("Hello world! Mello!", /llo/i, 6); // 2
