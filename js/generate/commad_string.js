/**
 * Add commas to a number every thousand.
 *
 * @param {number} num - The number to adds commas to.
 * @return {string} - The string with added commas.
 *
 * @resource [https://stackoverflow.com/a/2901298]
 */
var add_commas_to_num = function(num) {
	var parts = num.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
};

// Usage.

add_commas_to_num(12243); // "12,243"
