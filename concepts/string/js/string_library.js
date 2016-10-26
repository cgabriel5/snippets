"use strict";

var methods = window.methods_js;

/**
 * @description [Gets or checks the data type of the passed in object.]
 * @param  {Any} object         [The object to check.]
 * @param  {String} comparative [The data type to check against.]
 * @return {String|Boolean}     [Returns data type, true or false when using the comparative parameter.]
 *
 * @example: dtype("this is a string");           // string
 * @example: dtype([1, 2, 3]);                    // array
 * @example: dtype("this is a string", "string"); // true
 * @example: dtype("this is a string", "array");  // false
 */
window.dtype = function(object, comparative) {
    // will always return something like "[object {type}]"
    var check = Object.prototype.toString.call(object)
        .replace(/(\[object |\])/g, "")
        .toLowerCase();
    return (!comparative) ? check : (check === comparative);
};

// cache prototypes
var str = String.prototype,
    array = Array.prototype,
    number = Number.prototype;

var middleware = {

    /**
     * @description [Runs checks on the provided method to see if it is valid and
     *               checks that the provided paramaters follow the signature of
     *               of the provided child method.]
     * @param  {String} parent_method [The parent method being used.]
     * @param  {String} child_method  [The child method being used.]
     * @param  {ArgumentsObject} args  [The user passed in arguments/paramaters.]
     * @param  {Object} _             [A reference to the string object.]
     * @param  {Array} child_methods  [The list of child methods the parent method has.]
     * @return {String}               [The final string after running the child method.]
     */
    "scan": function(parent_method, child_method, args, _, child_methods) {

        // skip checks when using ! or @ symbols
        // ! => used internally, @ => used by user
        if (!-~["@", "!"].indexOf(child_method.charAt(0))) {

            // provided method must be one of the existing child methods
            middleware["method_check"](parent_method, child_method, Object.keys(child_methods).join("|"));
            // [2] check that the provided arguments are of the correct type
            middleware["argument_type_check"](args, child_methods);

        } else {

            // cause the console to warn the user argument checking was suspended
            if (child_method.charAt(0) === "@") console.warn("@ used with ".str_build("!join", child_method.str_chomp("!left", 1), "() to suspend argument type checking."));

        }

        // after running checks run the parent_method.child_method
        return middleware["execute"](parent_method, child_method, _, args);

    },

    /**
     * @description [Checks to see if the provided child method is indeed valid. If not an
     *               error is thrown.]
     * @param  {String} parent_method [The parent method being used.]
     * @param  {String} child_method  [The child method being used.]
     * @param  {Array} child_methods  [The list of child methods the parent method has.]
     * @return {Null|Error}           [If method does not pass checks an Error is thrown.]
     */
    "method_check": function(parent_method, child_method, child_methods) {

        // child_method must be provided; cannot be empty
        if (!child_method) throw "Error: No method supplied. ".str_build("!join", parent_method, "() requires one of the following methods: ", child_methods);
        // it must also be of string type
        if (!dtype(child_method, "string")) throw "Error: Method must be: ".str_build("!join", child_methods, ". <", dtype(child_method), "> was provided instead.");
        // it must an allowed method name
        // check to see if an ! is found in the start. this notes that the arguments wont be checked in the cargs function
        if (child_methods.indexOf(child_method.replace(/^[@|!]/, "").toLowerCase()) === -1) throw "Error: Supplied method".str_build("!join", " \"", child_method, "\" does not exist. ", parent_method, "() requires: ", child_methods);

    },

    /**
     * @description [Checks to see if provided arguments are of the proper child method
     *               signature type.]
     * @param  {ArgumentsObject} args [The user passed in arguments/paramaters.]
     * @param  {Array} child_methods  [The list of child methods the parent method has.]
     * @return {Null|Error}           [If a parameter does not follow the child method
     *                                 signature an Error is thrown.]
     */
    "argument_type_check": function(args, child_methods) {

        var child_method = args[0].toLowerCase();
        // check if parameters are allowed
        var arg_type_map = {},
            size = 0;
        // skip if the method does not have any parameters

        if (child_methods[child_method] !== null) {

            // start creating the arguments type map
            // get the types list. e.g. "1?,number;2?,string;3?,string;"
            var pre_map = child_methods[child_method]
                .str_chomp("!right", ";") // remove ending ;
                .split(";"); // split by ;

            // var pre_map = "1::2?,number|string".split(";");

            // loop through every number set
            for (var i = 0, l = pre_map.length; i < l; i++) {
                var pre_map_item = pre_map[i].split(","),
                    number = pre_map_item[0],
                    parameter_types = pre_map_item[1];

                // check if optional(?), limit(*), range(::)
                // @example: "1::*?,number|string"

                // check if the parameter is optional
                var is_optional = (number.str_is("!ewith", "?")) ? true : false;
                if (is_optional) number = number.str_chomp("!right", 1);

                // set the new limit to the amount of arguments passed
                // essentially function parameters take N number of parameters...
                // in other words takes limitless amount of parameters
                if (number.str_is("!ewith", "*")) number = number.str_chomp("!right", "*") + (args.length - 1);

                // expand range if exists
                number = (number.str_is("!in", "::")) ? number.str_convert("!num::range").split(",") : number.split(",");

                // loop through the number array to build arg_type_map
                for (var j = 0, ll = number.length; j < ll; j++) {
                    // cache the current paramater from the number array
                    var current_paramater_num = +number[j];
                    // if optional add "|undefined" to the parameters list
                    arg_type_map[current_paramater_num] = parameter_types + ((is_optional) ? ("|undefined") : "");
                    // increment the size of the paramater signature
                    size++;

                    if (is_optional) {
                        // if its undefined it means the argument was not provided
                        if (args[current_paramater_num] === undefined) {
                            // http://stackoverflow.com/questions/31163324/why-does-the-javascript-arguments-object-behave-so-strangely-when-you-try-to-mod
                            // the use of "use strict"; mitigates this issue
                            args[current_paramater_num] = undefined;
                            args.length = args.length + 1;
                        }
                    }

                }

            }

        }

        // set child method signature size
        arg_type_map.size = size;

        // check if the size and the arguments length match
        if (args.length - 1 > size /*extra params*/ || args.length - 1 < size /*missing params*/ ) {

            throw ((args.length - 1 > size) ? "Error: Extra parameter(s) supplied. " : "Error: Missing parameter(s). ")
                .str_build("!join", child_method, "() has a ", size, " parameter signature. ", (args.length - 1), " of ", size, " supplied.");

        }

        // now we check if the supplied parameters are of the allowed type(s)
        // we start at the second::1 argument because the first::0 parameter is the function method name
        for (var i = 1, l = args.length; i < l; i++) {
            if (arg_type_map[i].split("|").indexOf(dtype(args[i])) === -1) throw "Error: Parameter ".str_build("!join", i, " is of type ", dtype(args[i]), ". Only ", arg_type_map[i].str_chomp("!right", "|undefined"), " type(s) allowed.");
        }

        // everything of correct type(s) :)

    },

    /**
     * @description [Runs the child method on the provided string.]
     * @param  {String} parent_method [The parent method being used.]
     * @param  {String} child_method  [The child method being used.]
     * @param  {Object} _             [A reference to the string object.]
     * @param  {ArgumentsObject} args [The user passed in arguments/paramaters.]
     * @return {String}               [The final string after running the child method.]
     */
    "execute": function(parent_method, child_method, _, args) {

        // finally, run function
        return methods[parent_method][child_method.replace(/^[@|!]/, "").toLowerCase()]((dtype(_, "string") ? _.toString() : _), args);

    }

};

str.str_build = function str_build(child_method) {
    return middleware["scan"]("build", child_method, arguments, this, {
        "insert": "1,string|number;2,number",
        "join": "1::*,string|number",
        "prepend": "1::*,string|number",
        "wrap": "1::2,string|number"
    });
};

str.str_chomp = function str_chomp(child_method) {
    return middleware["scan"]("chomp", child_method, arguments, this, {
        "left": "1,string|number;",
        "right": "1,string|number;"
    });
};

str.str_clear = function str_clear(child_method) {
    return middleware["scan"]("clear", child_method, arguments, this, {
        "html": null,
        "space": null
    });
};

// http://coderstoolbox.net/number/
str.str_convert = function str_convert(child_method) {
    return middleware["scan"]("convert", child_method, arguments, this, {
        "num::range": null,
        "bin::oct": null,
        "bin::dec": null,
        "bin::hex": null,
        "dec::bin": "1?,number;2?,number;",
        "dec::oct": "1?,number;",
        "dec::hex": "1?,number",
        "oct::bin": null,
        "oct::dec": null,
        "oct::hex": null,
        "hex::bin": null,
        "hex::oct": null,
        "hex::dec": null,
        "hex::six": null,
        "rgba::argb": "1?,boolean",
        "argb::rgba": null,
        "rgb::hex": "1?,boolean",
        "hex::rgb": null,
        "rgb::hsl": null,
        "hsl::rgb": null,
        "rgb::hsv": null,
        "hsv::rgb": null,
        "hex::lighten": "1,number;2?,boolean;",
        "hex::darken": "1,number;2?,boolean;",
        "rgb::lighten": "1,number;",
        "rgb::darken": "1,number",
        "hsv::hwb": null,
        "rgb::hwb": null,
        "hwb::hsv": null,
        "::camel": null,
        "::cap": null,
        "::decap": null,
        "::class": null,
        "::dash": null,
        "::num": "1?,number",
        "::swap": null,
        "::slug": null,
        "::title": null,
        "::under": null
    });
};

str.str_count = function str_count(child_method) { //needle) {
    return middleware["scan"]("count", child_method, arguments, this, {
        "/": "1,string;",
    });
};

str.str_decode = function str_decode(child_method) { // use_native
    return middleware["scan"]("decode", child_method, arguments, this, {
        "html": null,
        "json": null,
        "utf8": null,
        "base64": "1?,boolean"
    });
};

str.str_encode = function str_encode(child_method) { // use_native
    return middleware["scan"]("encode", child_method, arguments, this, {
        "html": null,
        "json": null,
        "utf8": null,
        "base64": "1?,boolean"
    });
};

str.str_ensure = function str_ensure(child_method) { // direction, substr) {
    return middleware["scan"]("ensure", child_method, arguments, this, {
        "left": "1,string;",
        "right": "1,string;"
    });
};

str.str_ff = function str_ff(child_method) {
    return middleware["scan"]("ff", child_method, arguments, this, {
        "/": "1,array;",
    });
};

str.str_format = function str_format(child_method) {
    return middleware["scan"]("format", child_method, arguments, this, {
        "string": "1,object;",
        "number": "1?,number;2?,string;3?,string;" // bug here???
    });
};

str.str_freq = function str_freq(child_method) {
    return middleware["scan"]("freq", child_method, arguments, this, {
        "letters": null,
        "words": null
    });
};

str.str_grab = function str_grab(child_method) { // direction, left, right, recurs_string) {
    return middleware["scan"]("grab", child_method, arguments, this, {
        "between": "1::2,string;3?,boolean;",
        "left": "1,number;",
        "right": "1,number;"
    });
};

str.str_index = function str_index(child_method) { // , needle, all_indices) {
    return middleware["scan"]("index", child_method, arguments, this, {
        "left": "1,string;2?,boolean;",
        "right": "1,string;2?,boolean;"
    });
};

str.str_is = function str_is(child_method) {
    return middleware["scan"]("is", child_method, arguments, this, {
        "in": "1,string;",
        "ewith": "1,array;",
        "sewith": "1,array;",
        "swith": "1,array;",
        "alpha": null,
        "alphanum": null,
        "array": null,
        "arguments": null,
        "base64_string": null,
        "bday": null,
        "boolean": null,
        "date": null,
        "decimal": null,
        "domain": null,
        "email": null,
        "empty": null,
        "binary": null,
        "digit": null,
        "octal": null,
        "hex": null,
        "hexcolor": null,
        "hexcolor8": null,
        "rgb": null,
        "ip": null,
        "latin": null,
        "leap_yr": null,
        "lower": null,
        "special_string": "1?,array;2?,boolean;",
        "nan": null,
        "null": null,
        "number": null,
        "number_space": null,
        "numeric": null,
        "upper": null,
        "url": null,
        "falsy": null,
        "finite": null,
        "infinity": null,
        "function": null,
        "plain_object": null,
        "equal": "1,<*>",
        "same_type": "1,<*>",
        "element": null,
        "string": null,
        "regex": null,
        "undefined": null,
        "window": null,
        "color_white": null,
        "color_black": null,
        "whole_number": null,
        "mimetype": "1::2,string;",
        "base64_url": null
    });
};

str.str_length = function str_length(child_method) {
    return middleware["scan"]("length", child_method, arguments, this, {
        "min": "1,number",
        "max": "1,number",
        "range": "1::2,number",
        "exact": "1,number",
    });
};

str.str_letter = function str_letter(child_method) {
    return middleware["scan"]("letter", child_method, arguments, this, {
        "next": null,
        "prev": null,
    });
};

// https://en.wikipedia.org/wiki/Levenshtein_distance
// http://www.codeproject.com/Articles/13525/Fast-memory-efficient-Levenshtein-algorithm
// adapted to javascript
str.str_distance = function str_distance(child_method) { // string2) {
    return middleware["scan"]("distance", child_method, arguments, this, {
        "leven": "1,string;",
    });
};

str.str_pad = function str_pad(child_method) { // times, character, direction) {
    return middleware["scan"]("pad", child_method, arguments, this, {
        "both": "1,number;2?,string|number;",
        "left": "1,number;2?,string|number;",
        "right": "1,number;2?,string|number;"
    });
};

str.str_parse = function str_parse(child_method) {
    return middleware["scan"]("parse", child_method, arguments, this, {
        "numbers": null,
        "number": "1?,boolean",
        "hsv": null,
        "hsl": null,
        "hwb": null,
        "rgb": null,
        "url": null
    });
};

str.str_repeat = function str_repeat(child_method) { // , time) {
    return middleware["scan"]("repeat", child_method, arguments, this, {
        "text": "1?,number"
    });
};

str.str_replace = function str_replace(child_method) { // needle_map, direction) { //, needle_replacement) {
    return middleware["scan"]("replace", child_method, arguments, this, {
        "all": "1,object",
        "left": "1::2,string",
        "right": "1::2,string"
    });
    // return middleware["execute"]("replace", ((arguments.length === 1)) ? "all" : child_method, this, arguments);
};

str.str_reverse = function str_reverse(child_method) {
    return middleware["scan"]("reverse", child_method, arguments, this, {
        "/": null // use case for a simple string reverse
    });
};

str.str_split = function str_split(child_method) { // chunk_size
    return middleware["scan"]("split", child_method, arguments, this, {
        "chars": null,
        "chunk": "1,number;",
        "lines": null,
        "num": "1?,boolean",
        "words": "1?,string;",
    });
};

str.str_strip = function str_strip(child_method) { /*tag_type*/
    // http://www.spanishdict.com/answers/100808/how-to-type-spanish-letters-and-accents-#.VlbQe3arSUl
    return middleware["scan"]("strip", child_method, arguments, this, {
        "accents": null,
        "punctuation": null,
        "tags": "1?,string",
    });
};

str.str_trim = function str_trim(child_method) {
    return middleware["scan"]("trim", child_method, arguments, this, {
        "inner": null,
        "left": null,
        "right": null
    });
};

str.str_truncate = function str_truncate(child_method) { // char_count, ending
    return middleware["scan"]("truncate", child_method, arguments, this, {
        "by_chars": "1,number;2?,string;",
        "by_words": "1,number;2?,string;",
    });
};

number.val = function val(child_method) {
    return middleware["scan"]("val", child_method, arguments, this, {
        'min': '1,number',
        'max': '1,number',
        'range': '1::2,number;',
        'exact': '1,number',
        'list': '1?,array'
    });
};