document.onreadystatechange = function() {

    "use strict";

    /* [functions.utils] */

    // all resources have loaded (document + subresources)
    if (document.readyState === "complete") {

        // get the CSS string to work with
        var string = document.getElementsByTagName("textarea")[0].value;

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
            }
        };

        // blocks array will contain all the CSS blocks found within the CSS string
        var blocks = [];

        // replace all content properties as they can contain text
        // replacing it prevents the detection of false comment/brace/atsign detections
        var content_property_contents = [];
        var regexp_content_props_counter = -1;
        var regexp_content_props = new RegExp(/content:.*;/, "gi");
        string = string.replace(regexp_content_props, function(content, index) {
            // store content + index for later use
            content_property_contents.push([content, index]);
            return "$content["+ (++regexp_content_props_counter) +"];";
        });

        // loop over string
        for (var i = 0, l = string.length; i < l; i++) {

            // console.log(flags.atsign, flags.open.brace, flags.closed.brace, flags.open.comment, flags.closed.comment, flags.counter.brace);

            // cache the current character in loop
            var char = string.charAt(i),
                char_code = char.charCodeAt(0);

            // look out for these characters: @, {, }, /*, */

            // check for comments, opening to potential comment
            // if a comment is found the entire comment is skipped
            // by forwarding the loop index to the position of the
            // closing comment characters + 2
            if (char_code === 47) { // character: /
                // check that the next character is an asterisk
                if (string.charCodeAt(i + 1) === 42) { // character: *
                    // **we have the opening of a comment**
                    // look for the closing comment...
                    var closing_comment_index = string.indexOf("*/", (i + 1));
                    // skip loop all the way to the position of the ending closing comment characters
                    i = closing_comment_index + 2;
                }
            }

            // check for atsigns
            if (char_code === 64) { // character: @
                // check to see that it is not a one-liner (i.e. @charset, @import, @namespace)
                // get the index of the immediate space after the last letter
                var space_index = string.indexOf(" ", (i + 1));
                var atrule_name = string.substring((i + 1), space_index);
                if (-~["charset", "import", "namespace"].indexOf(atrule_name)) {
                    // get the index if the next semicolon; meaning the end of the atrule
                    var atrule_end = string.indexOf(";", (i + 1));
                    // skip loop all the way to the position of the ending of atrule
                    i = atrule_end + 1;
                } else { // all other css atrules

                    // only run when there is no actve atsign flag
                    if (flags.atsign) continue;

                    // get the index of the opening brace
                    var brace_start = string.indexOf("{", (i + 1));
                    // set the brace_open flag
                    flags.open.brace = brace_start;
                    // set the atsign flag
                    flags.atsign = i;
                    // skip loop all the way to the position of the start brace
                    i = flags.open.brace;
                    var selector = string.substring(flags.atsign, flags.open.brace);
                    // set the brace counter
                    flags.counter.brace = 1;
                    // get entire code block...start by getting the next brace index
                    while (flags.counter.brace) {

                        // get the indices for the next open and closed brace
                        var start_brace_index = string.indexOf("{", i + 1),
                            end_brace_index = string.indexOf("}", i + 1);

                        // place both indices into an array
                        var brace_indices = [(!-~start_brace_index ? null : start_brace_index), (!-~end_brace_index ? null : end_brace_index)].filter(Number); // http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript/2843625#2843625
                        // get the lowest indice in number. this index will be the
                        // closest to the first open brace. if there is no brace at all,
                        // null is returned in place of -1.
                        var next_index = (brace_indices.length) ? Math.min.apply(null, brace_indices) : null;

                        // if the index matches the start brace "{", increase the brace counter
                        // else if the brace is a closing brace "}", decrease the brace counter
                        if (start_brace_index === next_index) flags.counter.brace++;
                        else if (end_brace_index === next_index) flags.counter.brace--;

                        // reset the index to the last brace position
                        i = next_index + 1;

                        // move index to the newly found brace
                        if (flags.counter.brace === 0) {
                            // log selector and code block
                            var code_block = string.substring(flags.open.brace, i).replace(/^\{|\}$/g, "").trim();
                            // add the selector + code block to blocks array
                            blocks.push([selector, code_block, true]);
                            flags.counter.brace = null; // unset the flag
                        }

                        // unset the flag atsign
                        flags.atsign = null;

                    }

                }
            }

            // check for braces, this is for simple code blocks
            if (char_code === 123) { // character: {
                // get the selector

                // get the indices for the previous closed brace & semicolon
                var end_brace_index = string.lastIndexOf("}", i),
                    semicolon_index = string.lastIndexOf(";", i);

                // place both indices into an array
                var prev_indices = [(!-~end_brace_index ? null : end_brace_index), (!-~semicolon_index ? null : semicolon_index)].filter(Number); // http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript/2843625#2843625
                // get the lowest indice in number. this index will be the
                // closest to the first open brace. if there is no brace at all,
                // null is returned in place of -1.
                var prev_index = (prev_indices.length) ? Math.max.apply(null, prev_indices) : null;
                // finally, get selector from CSS string
                var selector = string.substring(((prev_index) ? (prev_index + 1) : 0), i).trim();

                // get the CSS code block

                // get the closing brace index
                var end_brace_index = string.indexOf("}", (i + 1));
                var code_block = string.substring(i, (end_brace_index + 1));
                // add the selector + code block to blocks array
                blocks.push([selector, code_block, false]);
            }

        }

        // console.log(flags);
        console.log(blocks.length);
        blocks.forEach(function(block) {
            console.log("");
            console.log(block[0]);
            console.log(block[1]);
            console.log(block[2]);
            console.log("");
        });

    }

};
