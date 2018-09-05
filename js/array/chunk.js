/**
 * Split array into chunks.
 *
 * @param  {array} arr - The array to chunk.
 * @param  {number} len - The chunk length.
 *
 * @resource [https://stackoverflow.com/a/11764168]
 */
var chunk_array = function(arr, len) {
	// Return array copy when length is negative or 0.
	if (len <= 0 || typeof len !== "number") {
		return arr.slice();
	}

	// Vars.
	var chunks = [],
		i = 0,
		n = arr.length;

	// Loop over and "chunk".
	while (i < n) {
		chunks.push(arr.slice(i, (i += len)));
	}

	return chunks;
};

// Usage.

var list = [1, 2, 3, 4, 5, 6, 7];
list = chunk_array(list, 3);
// Output: [[1, 2, 3], [4, 5, 6], [7]]
