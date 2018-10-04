/**
 * Create and insert a <style> element into the DOM.
 *
 * @param  {string} content - The CSS definitions.
 * @param  {string} title - Optional sheet title.
 * @return {htmlelement} - The reference to the style element.
 *
 * @resource [https://stackoverflow.com/a/38063486]
 * @resource [https://stackoverflow.com/q/524696]
 * @resource [https://stackoverflow.com/q/8209086]
 */
var stylesheet = function(content, title) {
	// Create element.
	var $style = document.createElement("style");

	// Set type.
	$style.type = "text/css";

	// Set the title if provided.
	if (title) {
		$style.setAttribute("data-title", title);
	}

	// Add the title marker to the contents.
	var contents = `/*title:${title}*/\n` + content;

	// Support for IE.
	if ($style.styleSheet) {
		$style.styleSheet.cssText = contents;
	} else {
		// All other browsers.
		$style.appendChild(document.createTextNode(contents));
	}

	// Append element to head tag.
	document.getElementsByTagName("head")[0].appendChild($style);

	return $style;
};

/**
 * Get the CSS style element based on a function logic.
 *
 * @param  {function} cb - The function logic.
 * @return {object} - The style element else undefined.
 *
 * @resource [https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/styleSheets#Examples]
 */
stylesheet.get = function(cb) {
	// Get the stylesheets.
	var $sheets = document.getElementsByTagName("style");

	// Loop over and return the sheet with the matching title.
	for (let i = 0, l = $sheets.length; i < l; i++) {
		// Cache the sheet.
		var $sheet = $sheets[i];

		cb.apply($sheet, [$sheet, $sheet.innerHTML, $sheets]);
	}

	return;
};

/**
 * Remove <style> element(s) from the DOM.
 *
 * @param  {function} cb - The remove function logic. Must return
 *     true to remove.
 * @return {undefined} - Nothing.
 */
stylesheet.remove = function(cb) {
	// Get the stylesheets.
	var $sheets = document.getElementsByTagName("style");

	// Loop backwards and run the remove logic function.
	for (let i = $sheets.length - 1; i > -1; i--) {
		// Cache the sheet.
		var $sheet = $sheets[i];

		// If callback returns true the sheet gets removed.
		if (cb.apply($sheet, [$sheet, $sheet.innerHTML, $sheets])) {
			$sheet.parentNode.removeChild($sheet);
		}
	}
};

/**
 * Add a definition (selector:rule) to a style sheet.
 *
 * @param {object} sheet - The style sheet object.
 * @param {string} selector - The CSS definition selector.
 * @param {string} rules - The CSS definition rules.
 * @param {number} index - The position of definition insertion.
 * @return {undefined} - Nothing.
 *
 * @resource [https://davidwalsh.name/add-rules-stylesheets]
 */
stylesheet.definition = function(sheet, selector, rules, index) {
	// Default to the end of the sheet if index not provided.
	index = index || sheet.cssRules.length;

	// For browsers that support insertRule.
	if ("insertRule" in sheet) {
		sheet.insertRule(`${selector}{${rules}}`, index);
	} else if ("addRule" in sheet) {
		// Else default second function.
		sheet.addRule(selector, rules, index);
	}
};

/**
 * Run a function on the stylesheet objects.
 *
 * @param  {function} cb - The function logic.
 * @return {undefined} - Nothing.
 */
stylesheet.sheets = function(cb) {
	// Get the sheets.
	var $sheets = document.styleSheets;

	// Loop over and return the sheet with the matching title.
	for (let i = 0, l = $sheets.length; i < l; i++) {
		// Cache the sheet.
		var $sheet = $sheets[i];

		// Run the callback.
		cb.apply($sheet, [$sheet, $sheets]);
	}
};
