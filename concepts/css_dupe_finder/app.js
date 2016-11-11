document.onreadystatechange = function() {

    "use strict";

    /* [functions.utils] */

    function find_comment_indices(string, position) {
        var str = (comment_indice_counter % 2 === 0) ? "/*" : "*/";
        var index = string.indexOf(str, position);
        if (-~index) {
            comment_indices.push(index);
            comment_indice_counter++;
            // recall function
            find_comment_indices(string, index + 2);
        }
    }

    // all resources have loaded (document + subresources)
    if (document.readyState === "complete") {

        var textarea = document.getElementsByTagName("textarea")[0];

        var string = textarea.value;

        var comment_indices = [];
        var comment_indice_counter = 0;
        find_comment_indices(string, 0);

        // console.log(comment_indices.length, comment_indices);
        // for (var i = 0, l = ((comment_indices.length)); i < l; i+=2) {
        for (var i = comment_indices.length - 1; i > 0; i -= 2) {

            // console.log(i, comment_indices[i-1], comment_indices[i]);

            var start_index = comment_indices[i - 1];
            var end_index = comment_indices[i];

            // console.log(string.substring(comment_indices[i], comment_indices[i+1]+2));
            // string = string.replace(string.substring(comment_indices[i], comment_indices[i+1]+2), "");

            // console.log(string.substring(start_index, end_index+2));

            string = string.replace(string.substring(start_index, end_index + 2), "");
        }

        textarea.value = string;

        var string = textarea.value.replace(/[\s\xa0]+/g, " ").trim();

        textarea.value = string;

        var open_brace;
        var open_brace_index;
        var brace_indices = [];
        var is_at_sign;
        var at_brace_counter;

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

        // console.log(brace_indices);

        // brace_indices.forEach(function(item, i) {
        //     console.log(i, item);
        //     // var str = string.substring(0, item[0]).trim().split("}");
        //     console.log(string.substring(item[0], item[1]+1));
        // });

        // console.log(brace_indices.length)

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
                        // console.log(declarations_array[k][0], 1, property, declarations_array[k][0] === property)
                        if (declarations_array[k][0] === property) {
                            console.log("SELECTOR", selector, "HAS REPETITIVE PROPERTY", property);
                            duplicates.push([selector, property, value]);
                        }
                    }

                    declarations_array.push([property, value]);
                }

                css_rules.push([selector, declarations_array, false]);
            } else {
                // console.log(i);
                // complex CSS declaration logic
                css_rules.push([selector, string.substring(point[0] + 2, point[1]).trim().replace(/;$/, ""), true]);
                // console.log(i, selector, string.substring(point[0] + 2, point[1]).trim().replace(/;$/, ""));
            }
        }

        // console.log(css_rules, duplicates)
        // console.log((duplicates));

    }

};

// http://stackoverflow.com/questions/11746581/nesting-media-rules-in-css
