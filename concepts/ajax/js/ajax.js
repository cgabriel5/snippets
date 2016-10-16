(function() {
    "use strict";

    var xhr_pool = {};

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

        // // get HTTP errors list from: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        // var e = document.querySelectorAll("dl");
        // var http_errors = {};
        // e.forEach(function(v) {
        //     var elements = v.children;
        //     var l = elements.length;
        //     for (var i = 0; i < l; i += 2) {
        //         var error_name_parts = elements[i].firstChild.firstChild.textContent.replace(/ /, ":").split(":"),
        //             error_name_num = error_name_parts[0],
        //             error_name_short_desc = error_name_parts[1],
        //             error_desc = elements[i + 1].textContent;
        //         http_errors[error_name_num] = [error_name_short_desc, error_desc];
        //     }
        // });
        // JSON.stringify(http_errors).replace(/'/g, "\\'");

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
                    process_data = options.processData, // default: true for strings and objects containing key:value pairs
                    id = options.id || null; // is uses wants to track request to abort

                // make new xhr request
                var xhr = new XMLHttpRequest();

                // add xhr to pool
                if (id) xhr_pool[id] = xhr;

                // set the xhr stage to pending (init xhr)
                xhr.stage = "pending"; // http://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved

                // wrap XHR in a Promise
                return new Promise(function(resolve, reject) {

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

                    // -------------------------

                    // listen to request state
                    // http://stackoverflow.com/questions/14946291/can-one-replace-xhr-onreadystatechange-with-xhr-onload-for-ajax-calls
                    // http://stackoverflow.com/questions/9181090/is-onload-equal-to-readystate-4-in-xmlhttprequest

                    // xhr.addEventListener("progress", function(e) {
                    //     if (e.lengthComputable) {
                    //         var percent = e.loaded / e.total;
                    //     } else {
                    //         // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
                    //         // Unable to compute progress information since the total size is unknown
                    //     }
                    // });

                    // listen for request completion
                    // http://stackoverflow.com/questions/6783053/xmlhttprequest-is-always-calling-load-event-listener-even-when-response-has-e/21025981#21025981
                    xhr.addEventListener("load", function(e) { // once finished resolve promise
                        this.stage = this.stage + ";fulfilled;resolved";
                        resolve(xhr);
                    }, false);

                    // **Note: user must handle HTTP request error response on their own.
                    // this is really only invoked for network-level errors.
                    xhr.addEventListener("error", function(e) { // reject on network errors
                        this.stage = this.stage + ";fulfilled;rejected";
                        // check internet connection here https://davidwalsh.name/detecting-online
                        reject(xhr); // http://www.html5rocks.com/en/tutorials/es6/promises/#toc-error-handling
                    }, false);

                    // xhr.addEventListener("abort", xhr_abort_fn);

                    // -------------------------

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

    // function to abort the xhr
    function abort_xhr(xhr, id) {
        if (!xhr) return; // // return if no xhr request with the provided id exists
        xhr.abort(); // abort xhr
        xhr.stage = xhr.stage + ";aborted"; // update the stage
        delete xhr_pool[id]; // remove xhr from pool
        return xhr; // return the xhr
    }

    // http://stackoverflow.com/questions/32497035/abort-ajax-request-in-a-promise
    // add cancel (abort) method to promise
    ajax.cancel = function(id, fn) {
        if (!arguments.length) { // no length cancel all
            // loop through all xhrs and abort
            for (var xhr_name in xhr_pool) abort_xhr(xhr_pool[xhr_name], xhr_name);
            return;
        }
        // single xhr abort...
        var xhr = abort_xhr(xhr_pool[id], id);
        if (fn) fn.call(xhr, xhr); // if fn provided invoke it
    };

    // add to global scope for ease of use
    window.Ajax = ajax;

})();
