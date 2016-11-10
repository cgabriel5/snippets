document.onreadystatechange = function() {

    "use strict";

    /* [functions.utils] */

    function find_comment_indices(string, position) {
        var str = (comment_indice_counter % 2 == 0) ? "/*" : "*/";
        var index = string.indexOf(str, position);
        // console.log(comment_indice_counter, str, index)
        if (-~index) {
            comment_indices.push(index);
            comment_indice_counter++;
            // recall function
            find_comment_indices(string, index + 2);
        }
    }


    // all resources have loaded (document + subresources)
    if (document.readyState == "complete") {


        var string = document.getElementsByTagName("textarea")[0].value;

        var comment_indices = [];
        var comment_indice_counter = 0;
        find_comment_indices(string, 0);


        console.log(comment_indices.length, comment_indices);
        // for (var i = 0, l = ((comment_indices.length)); i < l; i+=2) {
        for (var i = comment_indices.length-1; i > 0; i-=2) {

            console.log(i, comment_indices[i-1], comment_indices[i]);

            var start_index = comment_indices[i-1];
            var end_index = comment_indices[i];

            // console.log(string.substring(comment_indices[i], comment_indices[i+1]+2));
            // string = string.replace(string.substring(comment_indices[i], comment_indices[i+1]+2), "");

            console.log(string.substring(start_index, end_index+2));

            string = string.replace(string.substring(start_index, end_index+2), "");
        }

        document.getElementsByTagName("textarea")[0].value = string;

    }

};
