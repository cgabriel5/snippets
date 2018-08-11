/**
 * Select the text of an element.
 *
 * @param  {htmlelement} $el - The element.
 * @return {undefined} - Nothing.
 *
 * @resource [https://www.sanwebe.com/2014/04/select-all-text-in-element-on-click]
 */
var selection = function($el) {
	// Clear any current selection.
	selection.clear();

	// Create the selection...

	var sel, range;
	if (window.getSelection && document.createRange) {
		//Browser compatibility
		sel = window.getSelection();
		if (sel.toString() === "") {
			//no text selection
			window.setTimeout(function() {
				range = document.createRange(); //range object
				range.selectNodeContents($el); //sets Range
				sel.removeAllRanges(); //remove all ranges from selection
				sel.addRange(range); //add Range to a Selection.
			}, 1);
		}
	} else if (document.selection) {
		//older ie
		sel = document.selection.createRange();
		if (sel.text === "") {
			//no text selection
			range = document.body.createTextRange(); //Creates TextRange object
			range.moveToElementText($el); //sets Range
			range.select(); //make selection.
		}
	}
};
selection.clear = function() {
	// First clear any current range selection.
	// [https://stackoverflow.com/a/3171348]
	var sel = window.getSelection
		? window.getSelection()
		: document.selection;
	if (sel) {
		if (sel.removeAllRanges) {
			sel.removeAllRanges();
		} else if (sel.empty) {
			sel.empty();
		}
	}
};
