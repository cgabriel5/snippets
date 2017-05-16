/**
 * @description [Formats template with provided data object.]
 * @param  {String} template [The template to use.]
 * @param  {Object} data     [The object containing the data to replace placeholders with.]
 * @return {Undefined}  [Nothing is returned.]
 */
function format(template, data) {
    return template.replace(/\{\{\#(.*?)\}\}/g, function(match) {
        match = match.replace(/^\{\{\#|\}\}$/g, "");
        return data[match] ? data[match] : match;
    });
}
// examples
// the data object
var data = {
    "first-name": "John",
    "last-name": "Doe"
};
// the string to format
var string = "Hello, my name is {{first-name}} {{last-name}}";
// format the string
var formatted = format(string, data);
