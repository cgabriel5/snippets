/**
 * Formats template with provided data object.
 *
 * @param {string} template - The template to use.
 * @param {object} data - The object containing the data to replace
 *     placeholders with.
 * @return {undefined} - Nothing.
 */
var format = function(template, data) {
	return template.replace(/\{\{\#(.*?)\}\}/g, function(match) {
		match = match.replace(/^\{\{\#|\}\}$/g, "");
		// If a replacement does not exist, leave the placeholder as is.
		return data[match] ? data[match] : `{{#${match}}}`;
	});
};

// Usage.

// The replacements object.
var data = {
    "first-name": "John",
    "last-name": "Doe"
};

// The string to format.
var string = "Hello, my name is {{#first-name}} {{#last-name}}";

// Format the string.
var formatted = format(string, data);
