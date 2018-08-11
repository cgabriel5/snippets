/**
 * Create an array based off a number range. For example,
 * given the range 1-3 an array [1, 2, 3] will be returned.
 *
 * @param  {number} start - The range start.
 * @param  {number} stop - The range stop.
 * @param  {number} step - The range step.
 * @return {array} - The range array.
 *
 * @resource [https://stackoverflow.com/a/44957114]
 */
var range = function(start, stop, step) {
	start = start || 1;
	stop = (stop || -1) + 1;
	step = step || 1;

	return Array(Math.floor(Math.abs((stop - start) / step)))
		.fill(start)
		.map((x, y) => x + y * step);
};

// Usage.
range(1, 6, 1); // [1, 2, 3, 4, 5, 6]
range(1, 6, 2); // [1, 3, 5]
