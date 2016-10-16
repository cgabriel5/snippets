document.onreadystatechange = function() {

    "use strict";

    // all resources have loaded
    if (document.readyState == "complete") {

        console.log("document ready!");

        // custom function to check status of request
        function check_status(xhr) {
            if ((xhr.status >= 200 && xhr.status < 300) && xhr.readyState === 4) return xhr; // no HTTP error
            else throw new Error(xhr);
        }

        // ----------------------------------------------- ajax get w/ 404 error
        Ajax({
                "method": "GET",
                "url": "test.php?verified=false",
                "cache": false,
                "id": "get-posts"
            })
            .then(check_status)
            .then(function(data) {
                console.log("Server Response: ", data);
            })
            .catch(function(error) {
                console.log("XHR Error: ", error);
            });

        // abort XHR request
        Ajax.cancel("get-posts", function(xhr) {
            console.log("This xhr was aborted: ", xhr);
        });

        // Ajax.cancel(); // abort all xhr requests

        // ----------------------------------------------- multiple file upload

        document.getElementById("file").addEventListener("change", function(e) {

            // cache the input form, the parent in this case
            var form = this.parentNode;

            // formdata resources...
            // https://www.new-bamboo.co.uk/blog/2012/01/10/ridiculously-simple-ajax-uploads-with-formdata/
            // https://developer.mozilla.org/en-US/docs/Web/API/FormData
            // https://developer.mozilla.org/en-US/docs/Web/API/FormData/getAll
            // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
            // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
            // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
            var form_data = new FormData(),
                files = this.files, // https://developer.mozilla.org/en-US/docs/Web/API/FileList
                file;

            // loop through files to add to FormData object
            for (var i = 0, l = files.length; i < l; i++) {
                file = files.item(i);
                form_data.append(this.getAttribute("name"), file, file.name);
            }

            // upload files to server
            Ajax({
                    "method": "POST",
                    "url": "test.php?files=true",
                    "data": form_data,
                    "files": true
                })
                .then(check_status)
                .then(function(data) {
                    console.log("Server Response: ", data);
                    form.reset(); // reset form
                })
                .catch(function(error) {
                    console.log("XHR Error: ", error);
                });

        });

        // ----------------------------------------------- regular text data post

        new Ajax({
                "method": "POST",
                "url": "test.php",
                // "data": { "msg": "Hello World!!", "name": "Selena Gomez" } // data in an object
                "data": "msg=Hello World!&name=Selena Gomez" // string data
            })
            .then(check_status)
            .then(function(data) {
                console.log("Server Response: ", data);
            })
            .catch(function(error) {
                console.log("XHR Error: ", error);
            });

        // ----------------------------------------------- ajax get

        Ajax({
                "method": "GET",
                "url": "test.php?verified=false",
                "cache": false
            })
            .then(check_status)
            .then(function(data) {
                console.log("Server Response: ", data);
            })
            .catch(function(error) {
                console.log("XHR Error: ", error);
            });

    }

};
