document.onreadystatechange = function() {

    "use strict";

    /* [functions.utils] */

    function find_comment_indices(string, position, comment_indices, comment_indice_counter) {
        comment_indices = comment_indices || [];
        comment_indice_counter = comment_indice_counter || 0;

        var str = (comment_indice_counter % 2 === 0) ? "/*" : "*/",
            index = string.indexOf(str, position);

        if (-~index) {
            comment_indices.push(index);
            comment_indice_counter++;
            // recall function
            find_comment_indices(string, index + 2, comment_indices, comment_indice_counter);
        }

        return comment_indices;
    }

    function remove_comments(string, comment_indices) {
        // loop over comment index points
        for (var i = comment_indices.length - 1; i > 0; i -= 2) {
            // reset string to string without the removed CSS comment
            string = string.replace(string.substring(comment_indices[i - 1], (comment_indices[i] + 2)), "");
        }
        return string;
    }

    function find_brace_indices(string) {

        // http://stackoverflow.com/questions/11746581/nesting-media-rules-in-css

        var open_brace,
            open_brace_index,
            brace_indices = [],
            is_at_sign,
            at_brace_counter;

        // loop over string
        for (var i = 0, l = string.length; i < l; i++) {
            var current_char = string.charAt(i);

            if (current_char === "@" && !is_at_sign) {
                is_at_sign = true;
                at_brace_counter = 0;
                continue;
            }
            if (current_char === "{" && is_at_sign) {
                // only set the index of the first open bracket
                // this is the bracket following the selector
                if (at_brace_counter === 0) open_brace_index = i;
                at_brace_counter++;
                // continue;
            }
            if (current_char === "}" && is_at_sign) {
                // open_brace_index = i;
                at_brace_counter--;
                // continue;
            }

            if (current_char === "{" && !open_brace && !is_at_sign) {
                open_brace_index = i;
                open_brace = true;
                // continue;
            }

            // =================

            if (open_brace && !is_at_sign && current_char === "}") {
                // add the point to the indices array
                brace_indices.push([open_brace_index, i, false]);
                // reset the flag
                open_brace = false;
            }
            if (is_at_sign && current_char === "}" && at_brace_counter === 0) {
                brace_indices.push([open_brace_index, i, true]);
                is_at_sign = false;
            }

        }

        return brace_indices;

    }

    function find_dupes(brace_indices) {

        var css_rules = [];
        var duplicates = [];

        for (var i = 0, l = brace_indices.length; i < l; i++) {

            var point = brace_indices[i];
            var str = string.substring(0, point[0]);
            var last_index = str.lastIndexOf("}");
            var selector;
            if (-~last_index) {
                selector = str.substring(last_index + 2, str.length).trim();
            } else {
                selector = str.substring(0, str.length).trim();
            }

            // this is only for the simple CSS declarations
            if (!brace_indices[i][2]) {
                var declarations = string.substring(point[0] + 2, point[1]).trim().replace(/;$/, "").split(";");
                var declarations_array = [];
                for (var j = 0, ll = declarations.length; j < ll; j++) {
                    var parts = declarations[j].split(":");
                    var property = parts[0].trim();
                    var value = parts[1].trim();

                    // check check for double properties
                    for (var k = 0, lll = declarations_array.length; k < lll; k++) {
                        if (declarations_array[k][0] === property) {
                            console.log("SELECTOR", selector, "HAS REPETITIVE PROPERTY", property);
                            duplicates.push([selector, property, value]);
                        }
                    }

                    declarations_array.push([property, value]);
                }

                css_rules.push([selector, declarations_array, false]);
            } else {
                // complex CSS declaration logic
                css_rules.push([selector, string.substring(point[0] + 2, point[1]).trim().replace(/;$/, ""), true]);
            }
        }

        // console.log(css_rules, duplicates)
        // console.log((duplicates));
    }

    // all resources have loaded (document + subresources)
    if (document.readyState === "complete") {

        // cache textarea element
        var textarea = document.getElementsByTagName("textarea")[0],
            string = textarea.value; // CSS to work with

        // get all comment index points
        var comment_indices = find_comment_indices(string, 0);

        // remove all comments from CSS string
        string = remove_comments(string, comment_indices)
            // flatten string by removing unnecessary white-space
            .replace(/[\s\xa0]+/g, " ").trim();

        // get the brace indices
        var brace_indices = find_brace_indices(string);

        find_dupes(brace_indices);

    }

};
