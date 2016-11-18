/* jshint shadow:true */
/* jshint bitwise: false */
// http://jshint.com/docs/options/#shadow

document.onreadystatechange = function() {

    "use strict";

    /* [functions.utils] */

    function cleanup_selector(selector) {
        return selector.replace(/\$\$parenthesis\[(\d+)\]/, function() {
            return parenthesis_contents[(arguments[1] * 1)][0];
        });
    }

    function placehold_parenthesis_contents(string, parenthesis_contents) {
        var regexp_paren_counter = -1,
            regexp_parenthesis = new RegExp(/\([^\(\)]*?\)/, "g");
        return string.replace(regexp_parenthesis, function(content, index) {
            // store content + index for later use
            parenthesis_contents.push([content, index]);
            return "$$parenthesis[" + (++regexp_paren_counter) + "]";
        });
    }

    /**
     * @description [Replaces content property with placeholder. This is done to avoid detecting
     *               braces and comments within the content string.]
     * @param  {String} string                   [The string to work with.]
     * @param  {Array} content_property_contents [The array where the contents will be stored and
     *                                            looked up later.]
     * @return {String}                          [The string with placeholder if the content
     *                                            property is found.]
     */
    function placehold_csscontent_prop(string, content_property_contents) {
        var regexp_content_props_counter = -1,
            regexp_content_props = new RegExp(/content:.*?(?=;)/, "gi"); // content:\s?["|'].*["|'];
        return string.replace(regexp_content_props, function(content, index) {
            // store content + index for later use
            // console.log(11, content, index);
            content_property_contents.push([content, index]);
            return "$$content[" + (++regexp_content_props_counter) + "]";
        });
    }

    /**
     * @description [Function removes all simple selectors (selectors that are not nested, don't
     *               use the "@") from string and appends the new simple selector to string.]
     * @param  {String} selector     [The selector to remove simples selectors and append new
     *                                selector.]
     * @param  {String} text_between [The new simple selector.]
     * @return {String}              [The new selector with all simple selectors removed but with
     *                                new simple selector appended.]
     */
    function rem_simple_add_simple_selector(selector, text_between) {
        return selector.split(" / ").filter(function(s) {
            return (s.charAt(0) === "@");
        }).join(" / ") + " / " + text_between;
    }

    /**
     * @description [Goes through the dupe array checking block declarations for duplicate CSS
     *               properties.]
     * @param  {String} selector [The selector corresponding to the CSS code block.]
     * @param  {String} css_text [The CSS code block declarations.]
     * @return {Object}          [Object containing the duplicate properties in for format
     *                            key: value => {dupe_property_name: array_of_dupe_declarations}]
     */
    function dupe_check(selector, css_text) {

        // prepare CSS string + define vars
        var declarations = css_text.split(";"),
            frequency = {},
            size = 0,
            declaration_replacement_fn = function() {
                return content_property_contents[(arguments[1] * 1)][0];
            },
            parenthesis_replacement_fn = function() {
                return parenthesis_contents[(arguments[1] * 1)][0];
            };

        // loop vars
        var declaration, colon_index, property, value;

        // loop over declarations
        for (var i = 0, l = declarations.length; i < l; i++) {
            // cache current declaration
            declaration = declarations[i].trim();
            // replace the content CSS placeholder with original CSS
            if (-~declaration.indexOf("$$content[")) {
                // replace placeholder
                declaration = declaration
                    .replace(/\$\$content\[(\d+)\]/, declaration_replacement_fn);
            }
            // replace the parenthesis CSS placeholder with original CSS
            if (-~declaration.indexOf("$$parenthesis[")) {
                // replace placeholder
                declaration = declaration
                    .replace(/\$\$parenthesis\[(\d+)\]/, parenthesis_replacement_fn);
            }
            // get colon index to get property and its value
            colon_index = declaration.indexOf(":");
            property = declaration.substring(0, colon_index).trim();
            value = declaration.substring((colon_index + 1), declaration.length).trim();

            // update frequency map
            if (frequency[property]) {
                frequency[property].push([property, value, declaration]); // increase frequency
            } else { // init frequency
                frequency[property] = [
                    [property, value, declaration]
                ];
                size++; // increment object size
            }
        }

        // loop through all properties, remove all unique CSS properties
        for (var prop in frequency) {
            // if property is unique remove from object
            if (frequency.hasOwnProperty(prop) && frequency[prop].length <= 1) {
                delete frequency[prop];
                size--; // decrease object size to accommodate prop removal
            }
        }

        // return dupes
        return [frequency, size];
    }

    /**
     * @description [Logs the duplicate CSS properties found within each CSS code block.]
     * @param  {Array} blocks [The collection of CSS code blocks that contain duplicate CSS
     *                         properties.]
     * @return {Null}        [Function does not return anything. Only logs duplicates info
     *                        onto the console.]
     */
    function log_dupes(blocks) {

        // loop over blocks
        for (var i = 0, l = blocks.length; i < l; i++) {

            var block = blocks[i];
            var selector = block[0];
            // var css_text = block[1];
            var dupes = block[2][0];

            console.log(selector);

            // loop over the duplicate properties
            for (var prop in dupes) {

                if (dupes.hasOwnProperty(prop)) {

                    // get the dupes
                    var dupe_array = dupes[prop];

                    // loop over every dupe prop within each property and log
                    for (var j = 0, ll = dupe_array.length; j < ll; j++) {
                        var dupe_declaration = dupe_array[j];
                        console.log(dupe_declaration[0] + ":", dupe_declaration[1] + ";");
                    }

                }

            }
            // log a space between dupes
            console.log("");
        }

    }

    // all resources have loaded (document + sub-resources)
    if (document.readyState === "complete") {

        // get the CSS string to work with
        var string = document.getElementsByTagName("textarea")[0].value;

        // remove comments from CSS string
        string = string.replace(/\/\*.*?\*\//g, ""); // \/\*[^\/\*]?.*?\*\/

        // add semicolons to last declarations in CSS blocks
        // http://stackoverflow.com/questions/26984415/matching-ending-css-curly-brace-when-it-ends-without-a-semicolon/26984572#26984572
        // regexp explained: ([^{};\s])(\s*})
        // first capture group gets anything by a space or the literal characters {};
        // second capture group gets any amount of space and a closing brace
        // the replacement then puts a semicolon between the first two groups
        // console.log("before", string);
        string = string.replace(/([^{};\s])(\s*})/g, "$1;$2");
        // console.log("after", string);

        // blocks array will contain all the CSS blocks found within the CSS string
        var blocks = [];

        // replace everything in the CSS string that is in parenthesis,
        // replacing it prevents the detection of false semicolon endings. for example,
        // the semicolon found in a base64 URL found after the mimetype is not an endpoint
        // this short replacement will avoid situations like that.
        var parenthesis_contents = [];
        string = placehold_parenthesis_contents(string, parenthesis_contents);

        // replace all content properties as they can contain text
        // replacing it prevents the detection of false comment/brace/atsign detections
        var content_property_contents = [];
        string = placehold_csscontent_prop(string, content_property_contents);

        // console.log(string.length, string);
        // throw "stoped";
        // console.log(">>", parenthesis_contents, content_property_contents);
        // console.log(string);

        // flags are used while parsing string in main loop
        var flags = {
            "atsign": null,
            "open": {
                "brace": null,
                "comment": null,
            },
            "closed": {
                "brace": null,
                "comment": null,
            },
            "counter": {
                "brace": null
            },
            "child": {
                "complex": null,
                "simple": null,
            }
        };

        // main loop: loop over string
        for (var i = 0, l = string.length; i < l; i++) {

            // cache the current character in loop
            var char = string.charAt(i),
                char_code = char.charCodeAt(0);

            // look out for these characters: @, {, }, /*, */

            // // check for comments, opening to potential comment
            // // if a comment is found the entire comment is skipped
            // // by forwarding the loop index to the position of the
            // // closing comment characters + 2
            // if (char_code === 47) { // character: /
            //     // check that the next character is an asterisk
            //     if (string.charCodeAt(i + 1) === 42) { // character: *
            //         // **we have the opening of a comment**
            //         // look for the closing comment...
            //         var closing_comment_index = string.indexOf("*/", (i + 1));
            //         // skip loop all the way to the position of the ending closing comment characters
            //         i = closing_comment_index + 2;
            //     }
            // }

            // check for atsigns
            if (char_code === 64) { // character: @

                // check to see that it is not a one-liner (i.e. @charset, @import, @namespace)
                // get the index of the immediate space after the last letter
                var space_index = string.indexOf(" ", (i + 1)),
                    atrule_name = string.substring((i + 1), space_index);

                // check if artule is a simple one-liner
                if (-~["charset", "import", "namespace"].indexOf(atrule_name)) {
                    // get the index of the next semicolon; meaning the end of the atrule
                    // forward loop all the way to the position of the ending of atrule
                    i = string.indexOf(";", (i + 1)) + 1;

                } else { // all other CSS atrules

                    // // ?????????
                    // only run when there is no active atsign flag
                    // if (flags.atsign) continue;
                    // // ?????????

                    // get the index of the opening brace + set the brace_open flag
                    flags.open.brace = string.indexOf("{", (i + 1));
                    // set the atsign flag
                    flags.atsign = i;
                    // set the brace counter
                    flags.counter.brace = 1;
                    // forward loop all the way to the position of the start brace
                    i = flags.open.brace;

                    // grab selector (text between atsign and open brace indices)
                    var selector = string.substring(flags.atsign, flags.open.brace).trim();
                    // keep track of the brace indices
                    var brace_indices_track = [i];
                    // the amount of nested (complex "@") levels
                    var nested_levels = 0;

                    // start parsing CSS code block...start by getting the next brace index
                    while (flags.counter.brace) {

                        // get the indices for the next open and closed brace
                        var start_brace_index = string.indexOf("{", i + 1),
                            end_brace_index = string.indexOf("}", i + 1);

                        // place both indices into an array and then filter array to only
                        // have numbers, -1 will be replaced with null, which will then
                        // get pruned out with the filter function
                        // filter(Number): http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript/2843625#2843625
                        var brace_indices = [(!-~start_brace_index ? null : start_brace_index), (!-~end_brace_index ? null : end_brace_index)].filter(Number);

                        // get the lowest index number. this index will be the
                        // closest to the first open brace. if there is no brace at all,
                        // null is returned in place of -1.
                        var next_index = (brace_indices.length) ? Math.min.apply(null, brace_indices) : null;
                        // get the last brace index from stored brace indices
                        var last_index = brace_indices_track[brace_indices_track.length - 1];
                        // the text between the last and next brace points. depending on the braces
                        // this could be a selector (simple "s" or complex "@":"x") or a CSS code block
                        var text_between = string.substring((last_index + 1), next_index).trim();

                        // get the brace character using the last and next index points
                        var first_brace = string.charAt(last_index);
                        var last_brace = string.charAt(next_index);

                        // check if simple or complex, used later on
                        var type = (text_between.charAt(0) === "@") ? "x" : "s";

                        // the types of possible brace match ups
                        // { { --> Start of block (simple or complex)
                        // { } --> CSS code block
                        // } { --> End of code block, start of new code block
                        // } } --> End of complex block

                        // differentiate between brace match ups
                        if (first_brace === "{" && last_brace === "{") { // child selector

                            if (type === "x") {
                                // set the appropriate flag
                                flags.child.complex = true;
                                // increment nested_levels
                                nested_levels++;
                                // add to selector
                                selector += " / " + text_between;
                            } else if (type === "s") {
                                // for simple code blocks remove all preceding simple code block selectors
                                // and only keep the nested parent @ complex selectors
                                selector = rem_simple_add_simple_selector(selector, text_between);
                            }

                        } else if (first_brace === "{" && last_brace === "}") { // code block

                            // // ?????????
                            // // get the last child selector
                            // var selectors = selector.split(" / "),
                            //     last_selector = selectors[selectors.length - 1],
                            //     dupes;

                            // if (last_selector.charAt(0) === "@") {
                            //     // check if empty
                            //     // if (text_between === "") {
                            //     dupes = dupe_check(selector, text_between);
                            //     if (dupes[1]) blocks.push([cleanup_selector(selector), text_between, dupes]);
                            //     // }
                            // } else { // regular CSS selector
                            //     dupes = dupe_check(selector, text_between);
                            //     if (dupes[1]) blocks.push([cleanup_selector(selector), text_between, dupes]);
                            // }
                            // // ?????????

                            // check code block for any duplicate properties
                            var dupes = dupe_check(selector, text_between);
                            // if any duplicate properties add them to the blocks array
                            if (dupes[1]) blocks.push([cleanup_selector(selector), text_between, dupes]);

                        } else if (first_brace === "}" && last_brace === "{") { // end of code block, start of new code block

                            if (type === "x") {
                                // set the appropriate flag
                                flags.child.complex = true;
                                // increment nested_levels
                                nested_levels++;
                                // add to selector
                                selector += " / " + text_between;
                            } else if (type === "s") {
                                // for simple code blocks remove all preceding simple code block selectors
                                // and only keep the nested parent @ complex selectors
                                selector = rem_simple_add_simple_selector(selector, text_between);
                            }

                        } else if (first_brace === "}" && last_brace === "}") { // end of complex code block

                            // remove all the simple CSS selectors
                            selector = selector.split(" / ").filter(function(s) {
                                return (s.charAt(0) === "@");
                            });
                            // now remove go down one nested level down
                            // http://stackoverflow.com/questions/19544452/remove-last-item-from-array
                            selector.splice(-1, 1);
                            // turn array back to string
                            selector = selector.join(" / ");

                            // finally, decrease nested level
                            nested_levels--;

                        }

                        // add the next brace point to track track it
                        brace_indices_track.push(next_index);

                        // if the index matches the start brace "{", increase the brace counter
                        if (start_brace_index === next_index) flags.counter.brace++;
                        // else if the brace is a closing brace "}", decrease the brace counter
                        else if (end_brace_index === next_index) flags.counter.brace--;

                        // forward loop index to the next brace position
                        i = next_index;

                        // if no more braces are found end the while loop by unsetting the
                        // flags.counter.brace flag
                        if (flags.counter.brace === 0) flags.counter.brace = null; // unset flag

                    }

                    // unset the flag atsign
                    flags.atsign = null;

                }
            }

            // check for braces, this is for simple code blocks
            if (char_code === 123) { // character: {

                // get the indices for the previous closed brace & semicolon
                var end_brace_index = string.lastIndexOf("}", i),
                    semicolon_index = string.lastIndexOf(";", i);

                // place both indices into an array
                // filter(Number): http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript/2843625#2843625
                var prev_indices = [(!-~end_brace_index ? null : end_brace_index), (!-~semicolon_index ? null : semicolon_index)].filter(Number);

                // get the lowest indice in number. this index will be the
                // closest to the first open brace. if there is no brace at all,
                // null is returned in place of -1.
                var prev_index = (prev_indices.length) ? Math.max.apply(null, prev_indices) : null;

                // finally, get selector from CSS string
                var selector = string.substring(((prev_index) ? (prev_index + 1) : 0), i).trim();

                // get the CSS code block by using the current index + 1 as the start
                // and the closing brace index as the end point
                var code_block = string.substring((i + 1), string.indexOf("}", (i + 1))).trim();

                // check code block for any duplicate properties
                var dupes = dupe_check(selector, code_block);
                // if any duplicate properties add them to the blocks array
                if (dupes[1]) blocks.push([cleanup_selector(selector), code_block, dupes]);

            }

        }

        // log the dupes to the console
        log_dupes(blocks);

    }

};
