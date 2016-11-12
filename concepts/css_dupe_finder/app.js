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

    function find_dupes(brace_indices, string, is_complex_selector) {

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

            var css_string = string.substring(point[0] + 2, point[1]).trim().replace(/;$/, "");

            // this is only for the simple CSS declarations
            if (!brace_indices[i][2]) {
                var declarations = css_string.split(";");
                if (declarations.length <= 1) continue; // only one or 0; declaration no way possible for their to be duplicates
                // else start checking for duplicates
                var declarations_array = [];
                for (var j = 0, ll = declarations.length; j < ll; j++) {
                    // get parts of declaration
                    var parts = declarations[j].split(":"),
                        property = parts[0].trim(),
                        value = parts[1].trim();

                    if (-~declarations_array.indexOf(property)) {
                        // push all the CSS declations with the same property; these are the duplicates
                        dupes.push([selector, property, value]);
                    } else {
                        declarations_array.push(property);
                    }

                }
                dupes.push([null]); // dupe array selector spacer

                // css_rules.push([selector, declarations_array, false]);
            } else {
                // css_rules.push([selector, css_string, true]);

                dupes.push([selector]);
                main(css_string, selector);
            }

        }

    }

    function main(string, is_complex_selector) {

        // only remove comments the first time around
        // if is_complex_selector is set to something
        // main is being recursed this comments have
        // already been removed
        if (!is_complex_selector) {
            // get all comment index points
            var comment_indices = find_comment_indices(string, 0);
            // remove all comments from CSS string
            string = remove_comments(string, comment_indices)
                // flatten string by removing unnecessary white-space
                // .replace(/[\s\xa0]+/g, " ").trim();
        }

        // get the brace indices
        var brace_indices = find_brace_indices(string);
        return find_dupes(brace_indices, string, is_complex_selector);
    }

    var dupes = [],
        css_rules = [];

    // all resources have loaded (document + subresources)
    if (document.readyState === "complete") {

        main(document.getElementsByTagName("textarea")[0].value, null); // CSS to work with
        console.log("");
        console.log("");
        console.log("");
        console.table("THE DUPES");
        console.table(dupes);
        console.log("");
        console.table("CSS RULES");
        console.table(css_rules);

    }

};
