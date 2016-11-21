/* jshint shadow:true */
/* jshint bitwise: false */
// http://jshint.com/docs/options/#shadow

document.onreadystatechange = function() {

    "use strict";

    /* [functions.utils] */

    /**
     * @description [Logs the duplicate CSS properties found within each CSS code block.]
     * @param  {Array} blocks [The collection of CSS code blocks that contain duplicate CSS
     *                         properties.]
     * @return {Null}        [Function does not return anything. Only logs duplicates info
     *                        onto the console.]
     */
    function format(blocks) {

        // formated blocked container
        var formated = [];

        // loop over blocks
        for (var i = 0, l = blocks.length; i < l; i++) {

            var block = blocks[i],
                selector = block[0],
                selectors = selector.split(" / "),
                // var css_text = block[1];
                dupes = block[2][0],
                // calculate the CSS block indentation by simply repeating
                // the \t (tab) character
                indentation = Array((selectors.length) + 1).join("\t");

            // build the selector
            var build = [],
                ending_braces = [],
                indent;
            for (var j = 0, ll = selectors.length; j < ll; j++) {
                // calculate the selector indentation
                indent = (Array((j) + 1).join("\t"));
                // add indented selector + indented closing brace to
                // their respective arrays
                build.push(indent + selectors[j] + " {" + "\n");
                ending_braces.push(indent + "}" + "\n");
            }

            // loop over the duplicate properties
            for (var prop in dupes) {
                if (dupes.hasOwnProperty(prop)) {
                    // get the dupes
                    var dupe_array = dupes[prop];
                    // loop over every dupe prop within each property and log
                    for (var j = 0, ll = dupe_array.length; j < ll; j++) {
                        var dupe_declaration = dupe_array[j];
                        build.push(indentation + dupe_declaration[0] + ":", dupe_declaration[1] + ";\n");
                    }
                }
            }

            // join selector, CSS declarations, and closing braces to make
            // the final string, then add to formated array
            formated.push(build.concat(ending_braces.reverse()).join(""));

        }

        // return the formated dupes
        return formated;

    }

    function log(dupes) {

        // log the dupes length
        console.log(dupes.length);

        for (var i = 0, l = dupes.length; i < l; i++) {
            // log the dupe
            console.log(dupes[i]);
            // log a space between dupes
            console.log("");
        }

    }

    // all resources have loaded (document + sub-resources)
    if (document.readyState === "complete") {

        // get the CSS string to work with
        var string = document.getElementsByTagName("textarea")[0].value;

        // create new web worker
        var worker = new Worker("worker.js");
        // send data to web worker
        worker.postMessage({ "action": "start", "string": string });

        // listen for web worker messages
        worker.addEventListener("message", function(e) {

            // cache the data object
            var message = e.data;

            // object collection of actions
            var actions = {
                "done": function() {

                    // format the dupes + log dupes to the console
                    log(format(message.dupes));

                    // terminate worker
                    // worker.terminate(); // close worker from main file
                    worker.postMessage({ "action": "stop" }); // cose worker from worker file

                }
            };

            // run the needed action
            (actions[message.action] || new Function)();

        }, false);

    }

};
