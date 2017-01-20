(function() {

    "use strict";

    var library = (function() {

        // =============================== Helper Functions

        /**
         * @description [Returns index of given value in provided array.]
         * @param  {Array}    array [The array to check against.]
         * @param  {Integer}  value [The value to check.]
         * @return {Integer}        [Returns the index value. -1 if not in array.]
         */
        function index(array, value) {
            return array.indexOf(value);
        }
        /**
         * @description [Checks if the given value is in provided array or string.]
         * @param  {Array|String}   iterable [The array or string to check against.]
         * @param  {Any}            value    [The value to check.]
         * @return {Boolean}                 [description]
         * @source [https://www.joezimjs.com/javascript/great-mystery-of-the-tilde/]
         * @source [http://stackoverflow.com/questions/12299665/what-does-a-tilde-do-
         * when-it-precedes-an-expression/12299717#12299717]
         */
        function includes(iterable, value) {
            return -~index(iterable, value);
        }
        /**
         * @description [Makes an Array from an array like object (ALO). ALO must have a length property
         *               for it to work.]
         * @param  {ALO} alo [The ALO.]
         * @return {Array}   [The created array.]
         */
        function to_array(alo) {
            // vars
            var true_array = [];
            // loop through ALO and pushing items into true_array
            for (var i = 0, l = alo.length; i < l; i++) true_array.push(alo[i]);
            return true_array;
        }
        /**
         * @description [Returns the data type of the object passed or compares against the data type
         *               if provided.]
         * @param  {Any} object         [The object to check.]
         * @param  {String} comparative [The data type to compare against. This parameter is optional.]
         * @return {String|Boolean}     [The data type of the object as a string. Or a boolean
         *                               indicating the state of the comparison.]
         */
        function dtype(object, comparative) {
            // will always return something like "[object {type}]"
            var check = Object.prototype.toString.call(object)
                .replace(/(\[object |\])/g, "")
                .toLowerCase();
            return (!comparative) ? check : (check === comparative.toLowerCase());
        }
        /**
         * @description [A class wrapper. Creates a class based on provided object containing class constructor__ and methods__.
         *               If class needs to extend another, provide it under the extend__ property.]
         * @param  {Object} cobject [The class object containing three properties: constructor__, methods__, and extend__.
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

        // =============================== Core Library Functions

        // =============================== Library Class

        var Library = class__({

            // class constructor
            "constructor__": function() {

                // cache arguments object
                var args = arguments;

                // if user does not invoke library with new keyword we use it for them by
                // returning a new instance of the library with the new keyword.
                if (!(this instanceof Library)) return new Library();

            },

            // class methods
            "methods__": {},

            // class to extend
            "extend__": false

        });

        // return library to add to global scope later...
        return Library;

    })();

    // =============================== Global Library Functions/Methods/Vars

    // =============================== Attach Library To Global Scope

    // add to global scope for ease of use
    // use global app var or create it if not present
    var app = (window.app || (window.app = {}));
    // get the libs object from within the app object
    // if it does not exist create it
    var libs = (app.libs || (app.libs = {}));
    // add the library to the libs object
    libs.YOUR_LIB_NAME = library;

})();
