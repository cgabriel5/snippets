/**
 * Parse the URL query parameters.
 *
 * @return {object} - Object containing the parameter pairs.
 */
var parameters = function() {
	// Get the query.
	var query = location.search.replace(/^\?/, "");

	// Contain parameter key/values here.
	var params = {};

	// Only parse if not empty.
	if (query.trim() !== "") {
		// Loop over pairs.
		query.split("&").forEach(function(part) {
			var delimiter_index = part.indexOf("=");
			var key = decodeURIComponent(
				part.substring(0, delimiter_index)
			);
			var value = decodeURIComponent(
				part.substring(delimiter_index + 1, part.length)
			);
			params[key] = value;
		});
	}

	return params;
};
parameters.build = function(params) {
	// Contain params here.
	var search = [];

	// If empty return an empty string.
	if (Object.keys(params).length === 0) {
		return "";
	}

	// Keep a counter for ?/&.
	var i = 0;

	// Empty the headers object.
	for (var param in params) {
		if (params.hasOwnProperty(param)) {
			search.push(
				i === 0 ? "?" : "&",
				`${param}=${encodeURIComponent(params[param])}`
			);

			i++;
		}
	}

	// Join and return the string.
	return search.join("");
};

// Usage.
var params = parameters();

// Modify the params object...

// Build the params string from a params object.
var params = parameters.build(params);
