/**
 * Creates a function from a string. The function can also be named,
 *     otherwise an anonymous function is created.
 *
 * @param  {function|string} source - A function or a string. If a string is
 *     used it must be in the format "function() { <function_body> }".
 * @param  {string} name - Optional function name. If nothing is provided
 *     an the created function will be an anonymous function.
 * @param  {boolean} embed - Flag indicating whether or not to embed the
 *     function into the document as a <script>.
 * @return {function} - The created function.
 *
 * @resource [https://stackoverflow.com/a/26917938]
 * @resource [http://jsben.ch/D2xTG]
 * @resource [https://javascript.info/new-function]
 * @resource [https://stackoverflow.com/a/3947030]
 */
var funcify = function(source, name, embed) {
    // If code is not provided use an empty function.
    if (!source) {
        source = "function() {}";
    }

    // Make sure source is a string and is trimmed.
    source = source.toString().trim();

    // If a name was provided inject the name into the function string.
    if (name && typeof name === "string") {
        source = source.replace(/^function\s*\(/, `function ${name}(`);
    }

    // Embed if flag is provided.
    if (embed) {
        // Create the script element.
        var $script = document.createElement("script");
        // Set the source.
        $script.text = source;
        // Add element to document.
        document.body.appendChild($script);

        // Return the reference to function.
        return window[name];
    }

    // Finally, parse string into a function and return.
    return new Function(`return ${source};`)();
};
/**
 * Embeds the function string to the document. Basically a pretty wrapper
 *     for: funcify(source, name, true);
 */
funcify.embed = function(source, name) {
    return this.apply(this, [].slice.call(arguments).concat(true));
};

// Usage.

// Make function.
var log_hello_world = funcify(
    "function() { console.log('Hello World') };",
    "hello_world"
);
// Run function.
log_hello_world();

// Make function but embed to document.
var log_hello_world = funcify.embed(
    "function() { console.log('Hello World') };",
    "hello_world"
);
// Run function.
log_hello_world();
