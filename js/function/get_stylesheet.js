/**
 * Get the CSS style sheet object that matches the provided title.
 *
 * @return {object} - The CSS object stylesheet. Undefined when
 *     the sheet is not found.
 *
 * @resource [https://davidwalsh.name/add-rules-stylesheets]
 */
var stylesheet = function(title) {
	// Get the sheets.
	var sheets = document.styleSheets;

	// Loop over and return the sheet with the matching title.
	for (var i = 0, l = sheets.length; i < l; i++) {
		var sheet = sheets[i];
		if (sheet.title === title) {
			return sheet;
		}
	}
	// A sheet was not found matching the provided title.
	return undefined;
};
