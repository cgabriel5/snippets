/**
 * @description [Parses provided JSON string and adds syntax highlighting.]
 * @param  {String|Object} json [The JSON string. Objects will be turned to string
 *                               vis JSON.stringify method.]
 * @param  {Number} spaces [The amount of spaces to indent by. If included an object
 *                          and not a string needs to be provided as the first argument]
 * @return {String}      [String with syntax highlighting.]
 * @source [http://stackoverflow.com/a/7220510]
 */
var json_syntax_highlight = function(json, spaces) {
    if (spaces) {
        // turn provided object to string
        json = JSON.stringify(json, undefined, spaces);
    }
    json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = "number";
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                // remove key surrounding quotes the quotes
                match = match.replace(/^"/g, "").replace(/"\:$/g, ":");
                cls = "key";
            } else {
                cls = "string";
            }
        } else if (/true|false/.test(match)) {
            cls = "boolean";
        } else if (/null/.test(match)) {
            cls = "null";
        }
        return "<span class=\"" + cls + "\">" + match + "</span>";
    });
};

// --------------------- CSS Colors
// Add this to your styles.css file
// and customize as you please ;)

// .string {color: #884815;}
// .number {color: #627E00;}
// .boolean {color: #AA0C91;}
// .null {color: #AA0C91;}
// .key {color: #884815;}

// examples

// the object
var object = { 0: "a", 1: "b", length: 2 };
// add syntax highlighting
var highlighted = json_syntax_highlight(object, 4);
// finally...embed to the DOM
// document.body.appendChild...
