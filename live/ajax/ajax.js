(function() {
    "use strict";

    var ajax = (function() {

        // =============================== Helper Functions

        /**
         * @description [A class wrapper. Creates a class based on provided object containing class constructor__ and methods__.
         *               If class needs to extend another, provide it under the extend__ property.]
         * @param  {Object} cobject [The class object containg three properties: constructor__, methods__, and extend__.
         *                           .constructor__ {Function}       [The class constructor]
         *                           .methods__     {Object}         [Object containing class methods.]
         *                           .extend__      {Boolean|Object} [Set to false if does not need to extend. Otherwise, provide the
         *                                                            class to extend.]
         *                           ]
         * @return {Function}         [Returns class constructor.]
         */
        function class__(cobject) {

            // cache class data
            var constructor = cobject.constructor__,
                methods = cobject.methods__,
                parent = cobject.extend__;

            // extend if parent class provided
            if (parent) {
                constructor.prototype = Object.create(parent.prototype);
                constructor.prototype.constructor = constructor;
            }

            // cache prototype
            var prototype = constructor.prototype;

            // add class methods to prototype
            for (var method in methods) {
                if (methods.hasOwnProperty(method)) {
                    prototype[method] = methods[method];
                }
            }

            return constructor;

        }

        // =============================== Ajax Class

        var Ajax = class__({

            // class constructor
            "constructor__": function(options) {
                // https://toddmotto.com/writing-a-standalone-ajax-xhr-javascript-micro-library/
                // http://blog.garstasio.com/you-dont-need-jquery/ajax/#getting
                // http://www.w3schools.com/jquery/ajax_ajax.asp
                // http://stackoverflow.com/questions/14322984/differences-between-contenttype-and-datatype-in-jquery-ajax-function

                // no options, give warning and return
                if (!options) return console.warn("No options provided.");

                // if user does not invoke ajax call with new keyword we use it for them by
                // returning a new instance with the new keyword.
                if (!(this instanceof Ajax)) return new Ajax(options);

                // get the options
                var url = (options.url || document.URL), // default: current url location
                    method = (options.method || "GET").toUpperCase(), // default: null
                    data = (options.data || null), // default: null
                    files = options.files, // are files being uploaded? If true the content type is left out and left up to browser.
                    cache = options.cache, // default: true for GET requests
                    async = ((options.async === undefined) ? true : options.async), // default: true
                    content_type = options.contentType, // default: application/x-www-form-urlencoded;charset=UTF-8, empty for file uploads
                    process_data = options.processData; // default: true for strings and objects containing key:value pairs

                // return a new promise
                return new Promise(function(resolve, reject) {

                    // make new xhr request
                    var xhr = new XMLHttpRequest();

                    // add timestamp to prevent caching
                    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
                    if (cache !== undefined && !cache) url += ((url.indexOf('?') !== -1) ? '&_=' : '?_=') + ((new Date()).getTime());

                    // initialize request
                    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
                    xhr.open(method, url, async);

                    // http://stackoverflow.com/questions/18701282/what-is-content-type-and-datatype-in-an-ajax-request
                    // http://stackoverflow.com/questions/19694503/ajax-setrequestheader-content-type-application-x-www-form-urlencoded-and-ch
                    // http://stackoverflow.com/questions/16819502/application-x-www-form-urlencoded-and-charset-utf-8
                    // http://stackoverflow.com/questions/2053242/how-to-post-a-html-form-using-javascript-that-has-both-application-x-www-form-u
                    // http://stackoverflow.com/questions/12348216/uploading-a-file-with-xmlhttprequest-missing-boundary-in-multipart-form-data
                    // http://stackoverflow.com/questions/2436716/is-application-x-www-form-urlencoded-default-for-html-form
                    // https://www.w3.org/TR/html401/interact/forms.html#h-17.13.4
                    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects -> FormData tutorial
                    // for files use: multipart/form-data;charset=UTF-8, anything else: application/x-www-form-urlencoded;charset=UTF-8

                    // if files are being uploaded let the browser set the content type and form boundary
                    if (!files) xhr.setRequestHeader('Content-Type', (content_type || "application/x-www-form-urlencoded;charset=UTF-8"));

                    // process data if data is either a string or [object Object] and process_data is not set to false
                    if (process_data !== false && (typeof data === "string" || Object.prototype.toString.call(data) === "[object Object]")) {

                        // if data is a string we turn into an object
                        if (typeof data === "string") {
                            // breakdown and turn data into an object
                            var parameters = data.split("&"),
                                parsed_data = {};
                            for (var i = 0, l = parameters.length; i < l; i++) {
                                var parameter = parameters[i].split("=");
                                parsed_data[parameter[0]] = parameter[1];
                            }
                            // reset data var
                            data = parsed_data;
                        }
                        // else if already object just continue

                        // now we escape special characters in parameters
                        // http://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent
                        // http://stackoverflow.com/questions/4540753/should-i-use-encodeuri-or-encodeuricomponent-for-encoding-urls
                        // http://stackoverflow.com/questions/15847882/how-to-send-raw-text-with-xmlhttp-request/39109184#39109184
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
                        var data_string = "",
                            i = 0;
                        for (var key in data) {
                            data_string += ((i !== 0) ? "&" : "") + encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
                            i++;
                        }
                        // reset data var
                        data = data_string;

                    }
                    // else...data is of the following types and those do not get processed.
                    // (new Int8Array(), new Blob(), new FormData(), document, null)

                    // listen to request state
                    xhr.addEventListener('readystatechange', function(e) {
                        if (xhr.readyState === 4 && xhr.status === 200) resolve(xhr.responseText);
                        else if (xhr.status !== 200) reject(xhr.statusText); // http://www.html5rocks.com/en/tutorials/es6/promises/#toc-error-handling
                    }, false);

                    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
                    // possible data types: null, new Int8Array(), new Blob(), document, 'string', & new FormData()
                    xhr.send(data);
                });

            },

            // class methods
            "methods__": {},

            // class to extend
            "extend__": false

        });

        // return Ajax to add to glocal scope later...
        return Ajax;

    })();

    // add to global scope for ease of use
    window.Ajax = ajax;

})();

// =================================== usage

document.onreadystatechange = function() {

    "use strict";

    // all resources have loaded
    if (document.readyState == "complete") {

        console.log("document ready!");

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
            var xhr = Ajax({
                    "method": "POST",
                    "url": "test.php?files=true",
                    "data": form_data,
                    "files": true
                })
                .then(function(data) {
                    console.log("Server Response: ", data);
                    form.reset(); // reset form
                })
                .catch(function(error) {
                    console.log("XHR Error: ", error);
                });

        });

        // ----------------------------------------------- regular text data post

        var xhr = new Ajax({
                "method": "POST",
                "url": "test.php",
                // "data": { "msg": "Hello World!!", "name": "Selena Gomez" } // data in an object
                "data": "msg=Hello World!&name=Selena Gomez" // string data
            })
            .then(function(data) {
                console.log("Server Response: ", data);
            })
            .catch(function(error) {
                console.log("XHR Error: ", error);
            });

        // ----------------------------------------------- ajax get

        var xhr = new Ajax({
                "method": "GET",
                "url": "test.php?verified=false",
                "cache": false
            })
            .then(function(data) {
                console.log("Server Response: ", data);
            })
            .catch(function(error) {
                console.log("XHR Error: ", error);
            });

    }

};
