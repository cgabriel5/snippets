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

// "insert": "[2::5, 1::*]string;5,string|number;"
// consle.log( Object.keys(window.methods.decode) );
str.str_build = function str_build(child_method) {
    return middleware["scan"]("build", child_method, arguments, this, {
        "insert": "1,string|number;2,number",
        "join": "1::*,string|number",
        "prepend": "1::*,string|number",
        "wrap": "1::2,string|number"
    });
};
// remove the provided prefix from the string :: from left or right side
/*
[Left]
"something.jpg".str_chomp("!left", "some"); //"thing.jpg"
"something.jpg".str_chomp("!left", 3); //"ething.jpg"
[Right]
"something.jpg".str_chomp("!right", 3); //"something."
"something.jpg".str_chomp("!right", "jpg"); //"something."
*/
// removes the left or right provided substring from the string
// or removes the left/right x chars provided
str.str_chomp = function str_chomp(child_method) {
    return middleware["scan"]("chomp", child_method, arguments, this, {
        "left": "1,string|number;",
        "right": "1,string|number;"
    });
};
/*
[HTML]
"<     div id="mainCont">".str_clear("!html"); //<div id="mainCont">
[Space]
"This is a sentence. \n\n\n Some spaces.".str_clear("!space"); //"This is a sentence. Some spaces."
*/
str.str_clear = function str_clear(child_method) {
    return middleware["scan"]("clear", child_method, arguments, this, {
        "html": null,
        "space": null
    });
    /*
var a = "some \n\n\n s dfsdfsd";
a = a.str_clear("!space"); //"some s dfsdfsd"
a.replace(/\s|\n/g, "*"); //"some*****s*dfsdfsd"
*/
};
// (?:')\[\d(::)?\d?]
// http://coderstoolbox.net/number/
str.str_convert = function str_convert(child_method) {
    return middleware["scan"]("convert", child_method, arguments, this, {
        "num::range": null, // "1::12".str_convert("num::range"); // "1,2,3,4,5,6,7,8,9,10,11,12"
        "bin::oct": null, // "10101010111.1110101".str_convert("bin::oct"); // "2527.724"
        "bin::dec": null, // "10101010111.1110101".str_convert("bin::dec"); // "1367.9140625"
        "bin::hex": null, // "10101010111.1110101".str_convert("bin::hex"); // "557.EA"
        "dec::bin": "1?,number;2?,number;", // "1367.9140625".str_convert("dec::bin"); // "10101010111.111010100000000"
        "dec::oct": "1?,number;", // "1367.9140625".str_convert("dec::oct"); // "2527.724000000000000"
        "dec::hex": "1?,number", // "1367.9140625".str_convert("dec::hex"); // "557.EA"
        "oct::bin": null, // "2527.724".str_convert("oct::bin"); // "10101010111.111010100"
        "oct::dec": null, // "2527.724".str_convert("oct::dec"); // "1367.9140625"
        "oct::hex": null, // "2527.724".str_convert("oct::hex"); // "557.EA0"
        "hex::bin": null, // "557.EA".str_convert("hex::bin"); // "10101010111.11101010"
        "hex::oct": null, // "557.EA".str_convert("hex::oct"); // "2527.724"
        "hex::dec": null, // "557.EA".str_convert("hex::dec"); // "1367.9140625"
        "hex::six": null, // "#325".str_convert("hex::six"); // "#332255"
        "rgba::argb": "1?,boolean", // "rgba(23, 111, 156, 1)".str_convert("rgba::argb"); // "FF176F9C" // "rgba(23, 111, 156, 1)".str_convert("rgba::argb", true); // "#FF176F9C"
        "argb::rgba": null, // "FF176F9C".str_convert("argb::rgba"); // "rgba(23,111,156,1)" // "#FF176F9C".str_convert("argb::rgba"); // "rgba(23,111,156,1)"
        "rgb::hex": "1?,boolean", // "rgba(23,111,156,1);".str_convert("rgb::hex"); "176F9C" // "rgba(23,111,156,1);".str_convert("rgb::hex", true); // "#176F9C"
        "hex::rgb": null, // "#176F9C".str_convert("hex::rgb"); // "rgba(23,111,156,1)"
        "rgb::hsl": null, // "rgba(23,111,156,1);".str_convert("rgb::hsl"); // "hsl(200.30075187969925,74.30167597765363%,35.09803921568628%)"
        "hsl::rgb": null, // "hsl(200.30075187969925,74.30167597765363%,35.09803921568628%)".str_convert("hsl::rgb"); // "rgba(23,111,156,1)"
        "rgb::hsv": null, // "rgba(23,111,156,1);".str_convert("rgb::hsv"); // "hsv(200.30075187969925,85.25641025641025%,61.1764705882353%)"
        "hsv::rgb": null, // "hsv(200.30075187969925,85.25641025641025%,61.1764705882353%)".str_convert("hsv::rgb"); // "rgba(23,111,156,1)"
        "hex::lighten": "1,number;2?,boolean;", // "336600".str_convert("hex::lighten", 10); // 4C9900
        "hex::darken": "1,number;2?,boolean;", // "336600".str_convert("hex::lighten", 10); // 193300
        "rgb::lighten": "1,number;", // "rgba(51,102,0,1)".str_convert("rgb::lighten", 10); "rgba(76,153,0,1)"
        "rgb::darken": "1,number", // "rgba(51,102,0,1)".str_convert("rgb::darken", 10); // "rgba(25,51,0,1)"
        "hsv::hwb": null, // "hsv(200.30075187969925,85.25641025641025%,61.1764705882353%)".str_convert("hsv::hwb"); // ["200.30075187969925", 9.019607843137258, 38.8235294117647]
        "rgb::hwb": null, // "rgba(23,111,156,1);".str_convert("rgb::hwb"); // ["200.30075187969925", 9.019607843137258, 38.8235294117647]
        "hwb::hsv": null, // "hwb(200.30075187969925, 9.019607843137258%, 38.8235294117647%);".str_convert("hwb::hsv"); // ["200.30075187969925", 85.25641025641025, 61.1764705882353]
        "::camel": null,
        /*"first_name".str_convert("::camel"); // "firstName"
"data_rate".str_convert("::camel"); //"dataRate"
"background-color".str_convert("::camel"); //"backgroundColor"
"-moz-something".str_convert("::camel"); //"MozSomething"
"_car_speed_".str_convert("::camel"); //"CarSpeed"
"yes_we_can".str_convert("::camel"); //"yesWeCan"*/
        "::cap": null,
        /*"what is up?".str_convert("::cap"); // "What is up?"
"What is up?".str_convert("::cap"); // "What is up?"*/
        "::decap": null,
        /*"What is up?".str_convert("::decap"); // "what is up?"
"what is up?".str_convert("::decap"); // "what is up?"*/
        // removes all punctuation chars then camelizes + capitalize
        "::class": null, // "object.names 3d".str_convert("::class");
        "::dash": null,
        /*"dataRate".str_convert("::dash"); //"data-rate"
"CarSpeed".str_convert("::dash"); //"-car-speed"
"yesWeCan".str_convert("::dash"); //"yes-we-can"
"backgroundColor".str_convert("::dash"); //"background-color"*/
        // inverts lower/upper case
        "::num": "1,arguments",
        "::swap": null, // "This is it.".str_convert("::swap"); //"tHIS IS IT."
        // removes accents and turns into a usable url slug
        "::slug": null, // "Global Thermonuclear Warfare".str_convert("::slug"); // "global-thermonuclear-warfare" // "Crème brûlée".str_convert("::slug"); // "creme-brulee"
        "::title": null, // "the lord of the tunks".str_convert("::title"); //"The Lord Of The Tunks"
        "::under": null
            /*"dataRate".str_convert("::under"); //"data_rate"
"CarSpeed".str_convert("::under"); //"_car_speed"
"yesWeCan".str_convert("::under"); //"yes_we_can"*/
    });
};
// "1 2 3 4 5 1 2 1".str_count("/", "1"); // 3
str.str_count = function str_count(child_method) { //needle) {
    return middleware["scan"]("count", child_method, arguments, this, {
        "/": "1,string;",
    });
};
// "SGVsbG8gV29ybGQh".str_decode("base64"); // Hello World!
str.str_decode = function str_decode(child_method) { // use_native
    return middleware["scan"]("decode", child_method, arguments, this, {
        "html": null,
        "json": null,
        "utf8": null,
        "base64": "1?,boolean"
    });
};
// "Hello World!".str_encode("base64"); // SGVsbG8gV29ybGQh
// "divsome text</div>".str_encode("html"); // &lt;div&gt;some text&lt;/div&gt;
// "{1:\"text\"}".str_encode("json"); // "{1:"text"}"
// "divsome text</div>".str_encode("utf8"); // divsome text</div>
str.str_encode = function str_encode(child_method) { // use_native
    return middleware["scan"]("encode", child_method, arguments, this, {
        "html": null,
        "json": null,
        "utf8": null,
        "base64": "1?,boolean"
    });
};
// "something.jpg".str_ensure("left", "-small"); // -smallsomething.jpg
// "something.jpg".str_ensure("left", "some"); // something.jpg
// "something.jpg".str_ensure("right", ".jpg"); // something.jpg
// "something.jpg".str_ensure("right", ".jpg.png"); // something.jpg.jpg.png
str.str_ensure = function str_ensure(child_method) { // direction, substr) {
    return middleware["scan"]("ensure", child_method, arguments, this, {
        "left": "1,string;",
        "right": "1,string;"
    });
};
// "this is the thing".str_ff("/", ["two", "in", "the"]); // in
// "this is the thing".str_ff("/", ["two", "the"]); // the
// "this is the thing".str_ff("/", ["two", "three"]); // null
str.str_ff = function str_ff(child_method) {
    return middleware["scan"]("ff", child_method, arguments, this, {
        "/": "1,array;",
    });
};
// "123456789.0006786".str_format("number", 1, ".", ","); // 123,456,789.0
// "Hello! My name is {0}".str_format("string", {0:"Timmy"}); // Hello! My name is Timmy
str.str_format = function str_format(child_method) {
    return middleware["scan"]("format", child_method, arguments, this, {
        "string": "1,object;",
        "number": "1?,number;2?,string;3?,string;" // bug here???
    });
};
// "How many letters are there?".str_freq("letters"); // {"H":1,"o":1,"w":1," ":4,"m":1,"a":2,"n":1,"y":1,"l":1,"e":5,"t":3,"r":3,"s":1,"h":1,"?":1}
// "How many letters are there?".str_freq("words"); // {"How":1,"many":1,"letters":1,"are":1,"there?":1}
str.str_freq = function str_freq(child_method) {
    return middleware["scan"]("freq", child_method, arguments, this, {
        "letters": null,
        "words": null
    });
};
/*
Function: gets the text between the supplied left and right parameters
Returns: string
Example: "Here is the [http://www.google.com]".str_get_between("![", "]"); // => "http://www.google.com"
Example: "Here { is the {http://www.google.com}".str_get_between("!{", "}"); // => " is the {http://www.google.com"
**NOTE**: left and right parameters must be provided
*/
// "-left-middle-right".str_grab("left", 5); // -left
// "-left-middle-right".str_grab("right", 6); // -right
str.str_grab = function str_grab(child_method) { // direction, left, right, recurs_string) {
    return middleware["scan"]("grab", child_method, arguments, this, {
        "between": "1::2,string;3?,boolean;",
        "left": "1,number;",
        "right": "1,number;"
    });
};
// "1234512345".str_index("left", "1"); // 0
// "1234512345".str_index("left", "1", true); // [0, 5]
// "1234512345".str_index("right", "1"); // 5
// "1234512345".str_index("right", "1", true); // [5, 0]
str.str_index = function str_index(child_method) { // , needle, all_indices) {
    return middleware["scan"]("index", child_method, arguments, this, {
        "left": "1,string;2?,boolean;",
        "right": "1,string;2?,boolean;"
    });
};
str.str_is = function str_is(child_method) {
    return middleware["scan"]("is", child_method, arguments, this, {
        "in": "1,string;", // "something.jpg".str_is("in", "some"); // true
        "ewith": "1,array;", // "something.jpg".str_is("ewith", ["jpg", "png"]); // true
        "sewith": "1,array;", // "something.jpg".str_is("sewith", ["-some", "some", "jpg", "png"]); // 1
        "swith": "1,array;", // "something.jpg".str_is("swith", ["-some", "some"]); // true
        "alpha": null, // "something.jpg".str_is("alpha"); // false // "somethingjpg".str_is("alpha"); // true
        "alphanum": null, // "something.jpg".str_is("alpha"); // false // "something3jpg".str_is("alpha"); // true
        "array": null, // ????
        "arguments": null, // ???
        "base64_string": null, // "aGVsbG8gd29ybGQ=".str_is("base64_string"); // true
        "bday": null, // ????
        "boolean": null, // ????
        "date": null, // ????
        "decimal": null, // "1.2".str_is("decimal"); // true
        "domain": null,
        "email": null, // "something@email.com".str_is("email"); // true
        "empty": null, // "".str_is("empty") // true
        "binary": null, //
        "digit": null, // "1010101".str_is("binary"); // true
        "octal": null, // "1674641".str_is("octal"); // true
        "hex": null, // "145FF".str_is("hex"); // true
        "hexcolor": null, // "145FFA".str_is("hexcolor"); // true
        "hexcolor8": null, // "145FFACC".str_is("hexcolor8"); // true
        "rgb": null, // ????? need to look back on the colors*****
        "ip": null, // ???
        "latin": null, // "Piqué".str_is("latin"); // true
        "leap_yr": null, // ???
        "lower": null, // "allarelowercase".str_is("lower"); // true
        "special_string": "1?,array;2?,boolean;", // ????
        "nan": null, // ???
        "null": null, // ???
        "number": null, // ???
        "number_space": null, // "1 2 3 4 5".str_is("number_space"); // true
        "numeric": null, // "AA.AA1212".str_is("numeric"); // true; numeric checks if it is any type of number
        "upper": null, // "HELLOWORLD".str_is("upper"); // true
        "url": null, // ????????????
        "falsy": null, // ???
        "finite": null, // ???
        "infinity": null, // ???
        "function": null, // ???
        "plain_object": null, // ???
        "equal": "1,<*>", // ???
        "same_type": "1,<*>", // ???
        "element": null, // ???
        "string": null, // "string??".str_is("string"); // true
        "regex": null, // ???
        "undefined": null, // ???
        "window": null, // ???
        "color_white": null, // ????????????
        "color_black": null, // ????????????
        "whole_number": null, // "12".str_is("whole_number"); // true
        "mimetype": "1::2,string;", // ?????
        "base64_url": null // ????????????
    });
};
//"california".str_length("min", 5); // true
// "california".str_length("min", 15); // false
//"california".str_length("max", 5); // false
// "california".str_length("max", 15); // true
// "california".str_length("range", 5, 15); // true
// "california".str_length("range", 15, 15); // false
// "california".str_length("exact", 15); // false
// "california".str_length("exact", 10); // true
// compare the length of the current string with a provided length
str.str_length = function str_length(child_method) {
    return middleware["scan"]("length", child_method, arguments, this, {
        "min": "1,number",
        "max": "1,number",
        "range": "1::2,number",
        "exact": "1,number",
    });
};
// "a".str_letter("prev"); // "z"
// "a".str_letter("next"); // "b"
// "A".str_letter("prev"); // "Z"
// "A".str_letter("next"); // "B"
str.str_letter = function str_letter(child_method) {
    return middleware["scan"]("letter", child_method, arguments, this, {
        "next": null,
        "prev": null,
    });
};
// "google".str_distance("leven", "oogle"); // 1
// https://en.wikipedia.org/wiki/Levenshtein_distance
// http://www.codeproject.com/Articles/13525/Fast-memory-efficient-Levenshtein-algorithm
// adapted to javascript
str.str_distance = function str_distance(child_method) { // string2) {
    return middleware["scan"]("distance", child_method, arguments, this, {
        "leven": "1,string;",
    });
};
/*
str.str_linkify = function str_linkify(attrs) {
    var string = this;
},
*/
// "string".str_pad("both", 4); // "    string    "
//"string".str_pad("both", 4, "-"); // "----string----"
// "string".str_pad("left", 4); // "    string"
// "string".str_pad("left", 4, "-"); // "----string"
// "string".str_pad("right", 4); // "string    "
// "string".str_pad("right", 4, "-"); // "string----"
str.str_pad = function str_pad(child_method) { // times, character, direction) {
    return middleware["scan"]("pad", child_method, arguments, this, {
        "both": "1,number;2?,string|number;",
        "left": "1,number;2?,string|number;",
        "right": "1,number;2?,string|number;"
    });
};
// "rgb(23, 24, 112);".str_parse("number"); // "23"
// "rgb(23, 24, 112);".str_parse("numbers"); // ["23", "24", "112"]
// "rgba(23, 24, 112, .45)".str_parse("rgb"); // ["23", "24", "112", ".45"]
// "rgba(23, 24, 112)".str_parse("rgb"); // ["23", "24", "112", "1"]
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
// "-cool".str_repeat("text", 4); // -cool-cool-cool-cool
// "-cool".str_repeat("text"); // ""
str.str_repeat = function str_repeat(child_method) { // , time) {
    return middleware["scan"]("repeat", child_method, arguments, this, {
        "text": "1?,number"
    });
};
// "00012345000".str_replace("all", {"000":"---"}); // ---12345---
// "00012345000".str_replace("left", "0", ""); // "12345000"
// "00012345000".str_replace("left", "0", "-");  // "-12345000"
// "000:00012345000".str_replace("left", "0", "-"); // "-:00012345000"
// "00012345000".str_replace("right", "0", ""); // "00012345"
// "00012345000".str_replace("right", "0", "-"); // "00012345-"
// "00012345000:000".str_replace("right", "0", "-"); // "00012345000:-"
str.str_replace = function str_replace(child_method) { // needle_map, direction) { //, needle_replacement) {
    return middleware["scan"]("replace", child_method, arguments, this, {
        "all": "1,object",
        "left": "1::2,string",
        "right": "1::2,string"
    });
    // return middleware["execute"]("replace", ((arguments.length === 1)) ? "all" : child_method, this, arguments);
};
// "123456789".str_reverse("/"); // "987654321"
str.str_reverse = function str_reverse(child_method) {
    return middleware["scan"]("reverse", child_method, arguments, this, {
        "/": null // use case for a simple string reverse
    });
};
// "youtube".str_split("chars"); // ["y", "o", "u", "t", "u", "b", "e"]
// "youtube".str_split("chunk", 2); // ["yo", "ut", "ub", "e"]
// "youtube\ninternet".str_split("lines"); // ["youtube", "internet"]
// "1.23".str_split("num"); // ["1", "23"]
// "Hello World!".str_split("words"); // ["Hello", "World!"]
str.str_split = function str_split(child_method) { // chunk_size
    return middleware["scan"]("split", child_method, arguments, this, {
        "chars": null,
        "chunk": "1,number;",
        "lines": null,
        "num": "1?,boolean",
        "words": "1?,string;",
    });
};
// "á, é, í, ó, ú, ü, ñ".str_strip("accents"); // "a, e, i, o, u, u, n"
// "Thi#@s is%# co*^ol.".str_strip("punctuation"); // "This is cool"
// "This is btext</b>. This text is in iitalics</i>.".str_strip("tags"); // "This is text. This text is in italics."
// "This is bbold</b> text. This text is in iitalics</i>.".str_strip("tags", "b|i"); // "This is bold text. This text is in italics."
str.str_strip = function str_strip(child_method) { /*tag_type*/
    // http://www.spanishdict.com/answers/100808/how-to-type-spanish-letters-and-accents-#.VlbQe3arSUl
    return middleware["scan"]("strip", child_method, arguments, this, {
        "accents": null,
        "punctuation": null,
        "tags": "1?,string",
    });
};
// "   This is some text.   ".str_trim("left"); // "This is some text.   "
// "   This is some text.   ".str_trim("right"); // "   This is some text."
// "   This    is       some           text.   ".str_trim("inner"); // "   This is some text.   "
str.str_trim = function str_trim(child_method) {
    return middleware["scan"]("trim", child_method, arguments, this, {
        "inner": null,
        "left": null,
        "right": null
    });
};
// "This is some text that needs to be shortened down.".str_truncate("by_chars", 15); // "This is some..."
// "This is some text that needs to be shortened down.".str_truncate("by_chars", 15, "..."); // "This is some..."
// "This is some text that needs to be shortened down.".str_truncate("by_words", 5); // "This is some text that..."
// "This is some text that needs to be shortened down.".str_truncate("by_words", 5, "..."); // "This is some text that..."
str.str_truncate = function str_truncate(child_method) { // har_count, ending
    return middleware["scan"]("truncate", child_method, arguments, this, {
        "by_chars": "1,number;2?,string;",
        "by_words": "1,number;2?,string;",
    });
};
