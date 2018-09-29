/**
 * Replace all br tags.
 *
 * @param  {string} string - The string to work.
 * @param  {string} needle - The replacement string.
 * @return {string} - The modified string.
 *
 * @resource [https://stackoverflow.com/a/5959455]
 */
var replace_br_tags = function(string, replacement) {
	return string.replace(/<br\s*[\/]?>/gi, replacement || "");
};

// Usage.

replace_br_tags("Hello<br/>world!"); // "Helloworld!"
replace_br_tags("Hello<br/>world!", " "); // "Hello world!"

// Non-function use.
String.replace(/<br\s*[\/]?>/gi, "");
