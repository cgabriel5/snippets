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
                            console.log(selector);
                            console.log(string.substring(flags.open.brace, i).replace(/^\{|\}$/g, "").trim());
                            flags.counter.brace = null; // unset the flag
                        }

                        // unset the flag atsign
                        flags.atsign = null;

                    }

                    break;
                }
            }

        }

        console.log(flags);

    }

};
