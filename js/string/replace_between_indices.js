/**
 * Replace the text between 2 indices.
 *
 * @param  {string} string - The string to work.
 * @param  {number} start - The start index.
 * @param  {number} end - The end index.
 * @param  {string} needle - The string to inject.
 * @return {string} - The modified string.
 *
 * @resource [https://stackoverflow.com/a/14880260]
 */
var replace_between_indices = function(string, start, end, needle) {
	return `${string.substring(0, start)}${needle || ""}${string.substring(
		end
	)}`;
};

// Usage.

replace_between_indices("He||o world!", 2, 4); // "Heo world!"
replace_between_indices("He||o world!", 2, 4, "ll"); // "Hello world!"
