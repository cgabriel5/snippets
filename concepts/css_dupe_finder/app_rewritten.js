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

                    var dupes = message.dupes;
                    // log dupes to the console
                    console.log(dupes.length);
                    log_dupes(dupes);

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
