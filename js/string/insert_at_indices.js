/**
 * Insert text at indices.
 *
 * @param  {string} string - The string.
 * @param  {object} inserts - Object containing inserts
 *     in the form of {index:string}.
 * @return {string} - The string with inserts.
 *
 * @resource [https://stackoverflow.com/a/25329247]
 * @resource [https://stackoverflow.com/a/21420210]
 * @resource [https://stackoverflow.com/a/3410557]
 * @resource [https://stackoverflow.com/a/274094]
 */
var string_index_insert = function(string, inserts) {
	return string.replace(/./g, function(character, index) {
		return inserts[index] ? inserts[index] + character : character;
	});
};
