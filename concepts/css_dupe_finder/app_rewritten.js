document.onreadystatechange = function() {

    "use strict";

    /* [functions.utils] */

    // all resources have loaded (document + subresources)
    if (document.readyState === "complete") {

        // get the CSS string to work with
        var string = document.getElementsByTagName("textarea")[0].value;

        var flags = {
            "atsign": false,
            "brace_open": false,
            "brace_closed": false,
            "comment_open": false,
            "comment_closed": false
        };

        // loop over string
        for (var i = 0, l = string.length; i < l; i++) {

            // console.log(i);

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
                    console.log("THIS IS THE COMMENT:", string.substring(i, (closing_comment_index + 2)));
                    // skip loop all the way to the position of the ending closing comment characters
                    i = closing_comment_index + 2;
                }
            }

        }

    }

};
