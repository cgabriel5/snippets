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

        }

    }

};
