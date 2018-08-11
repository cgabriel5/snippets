/**
 * Generates a simple ID containing letters and numbers.
 *
 * @param  {number} length - The length the ID should be.
 * @return {string} - The newly generated ID.
 *
 * @resource [http://stackoverflow.com/a/38622545]
 */
var id = function(length) {
	// Default to 10.
	length = length || 10;

	// Calculate the numbers of loops needed.
	var iterations = Math.floor(length / 10);
	if (length % 10) {
		// Increment the loop by 1.
		iterations++;
	}

	// Store the generated strings here.
	var strings = [];

	// Generate the strings.
	for (let i = 0, l = iterations; i < l; i++) {
		strings.push(
			Math.random()
				.toString(36)
				.substr(2, 10)
		);
	}

	// Combine the strings.
	var string = strings.join("");

	// Finally, cut the string to desired length.
	return string.substring(0, length);
};

// Usage.

var uid = id(20); // "yh6zsfikuj6fu7yje57x"
