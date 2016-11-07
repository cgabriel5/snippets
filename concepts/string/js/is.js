// ==============================================================================
// ============================== PRIMITIVE_CHECKS ==============================
// ==============================================================================

/**
 * @description [Gets the provided object's object type. If the second optional
 *               parameter is provided the function will check id the object is
 *               of the provided object.]
 * @param  {Any}    object      [The object to check.]
 * @param  {String} object_type [The type to check against.]
 * @return {String}             [The object's type.]
 */
Window.prototype.type = Window.prototype.type || function(object, object_type) {
    var dtype = Object.prototype.toString.call(object).split(/ |\]/)[1].toLowerCase();
    return (!object_type) ? dtype : (dtype === object_type.toLowerCase());
};
// ==============================================================================
/**
 * @description [Checks provided object for null or undefined values.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is set.]
 */
Window.prototype.isset = Window.prototype.isset || function(object) {
    return (object === null || object === undefined) ? false : true;
};
/**
 * @description [Checks provided object for null value.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object value is null.]
 */
Window.prototype.isNull = Window.prototype.isNull || function(object) {
    return (object === null) ? true : false;
};
/**
 * @description [Checks provided object for undefined value.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object value is undefined.]
 */
Window.prototype.isUndefined = Window.prototype.isUndefined || function(object) {
    return (object === undefined) ? true : false;
};
/**
 * @description [Checks provided object/expression for true value.]
 * @param  {Any}    object      [The object/expression to check.]
 * @return {Boolean}            [True=object/expression results in true value.]
 */
Window.prototype.isTrue = Window.prototype.isTrue || function(object) {
    return object === true;
};
/**
 * @description [Checks provided object/expression for false value.]
 * @param  {Any}    object      [The object/expression to check.]
 * @return {Boolean}            [True=object/expression results in false value.]
 */
Window.prototype.isFalse = Window.prototype.isFalse || function(object) {
    return object === false;
};
/**
 * @description [Checks provided object/expression for falsey value.
 *               ("", false, null, undefined, NaN, 0)]
 * @param  {Any}    object      [The object.]
 * @return {Boolean}            [True=object results in falsey value.]
 */
Window.prototype.isFalsey = Window.prototype.isFalsey || function(object) {
    return (isEmpty(object) || isFalse(object) || isNull(object) || isUndefined(object) || isNaN(object) || object === 0) ? true : false;
};
/**
 * @description [Checks provided object for Boolean value.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is a Boolean.]
 */
Window.prototype.isBoolean = Window.prototype.isBoolean || function(object) {
    return type(object, "boolean") ? true : false;
};
// ==============================================================================
/**
 * @description [Checks provided object prototype for Data type.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is of type Data.]
 */
Window.prototype.isDate = Window.prototype.isDate || function(object) {
    return type(object, "date") ? true : false;
};
/**
 * @description [Checks provided object prototype for Function type.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is of type Function.]
 */
Window.prototype.isFunction = Window.prototype.isFunction || function(object) {
    return type(object, "function") ? true : false;
};
/**
 * @description [Checks provided object prototype for Object type.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is of type Object.]
 */
Window.prototype.isPlainObject = Window.prototype.isPlainObject || function(object) {
    return type(object, "object") ? true : false;
};
/**
 * @description [Checks provided object prototype for HTMLElement type.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is of type HTMLElement.]
 */
Window.prototype.isElement = Window.prototype.isElement || function(object) {
    return (-~Object.prototype.toString.call(object).indexOf("HTML")) ? true : false;
};
/**
 * @description [Checks provided object prototype for String type.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is of type String.]
 */
Window.prototype.isString = Window.prototype.isString || function(object) {
    return type(object, "string") ? true : false;
};
/**
 * @description [Checks provided object prototype for RegExp type.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is of type RegExp.]
 */
Window.prototype.isRegex = Window.prototype.isRegex || function(object) {
    return type(object, "regexp") ? true : false;
};
/**
 * @description [Checks provided object prototype for Window type.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is of type Window.]
 */
Window.prototype.isWindow = Window.prototype.isWindow || function(object) {
    return type(object, "window") ? true : false;
};
// ==============================================================================
/**
 * @description [Checks provided object to see if it's Not-A-Number.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is NaN.]
 */
Window.prototype.isNaN = Window.prototype.isNaN || function(object) {
    return (type(object, "number") && object.toString() === "NaN") ? true : false;
};
/**
 * @description [Checks provided object to see if it's a number.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is a number.]
 * @source [cast,parse string to number]
 *         (http://stackoverflow.com/questions/12227594/which-is-better-numberx-or-parsefloatx)
 */
Window.prototype.isNumber = Window.prototype.isNumber || function(object) {
    // cant be null|undefined|Infinity|-Infinity|NaN && must be of type *number*
    return (!isNull(object) && !isUndefined(object) && !-~["-In", "Inf", "NaN"]
        .indexOf(object.toString().substr(0, 3)) && type(object, "number")) ? true : false;
};
/**
 * @description [Checks provided object to see if it's an integer (whole number).]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is a whole number.]
 */
Window.prototype.isInteger = Window.prototype.isInteger || function(object) {
    return (isNumber(object) && object % 1 === 0) ? true : false;
};
/**
 * @description [Checks provided object to see if it's a decimal number.]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is a decimal number.]
 */
Window.prototype.isDecimal = Window.prototype.isDecimal || function(object) {
    return (isNumber(object) && object % 1 !== 0) ? true : false;
};
/**
 * @description [Checks provided object to see if it's numeric (string that, when cast,
 *               is a valid number).]
 * @param  {Any}    object      [The object to check.]
 * @return {Boolean}            [True=object is a whole number.]
 */
Window.prototype.isNumeric = Window.prototype.isNumeric || function(object) {
    return (isNumber(Number(object))) ? true : false;
};
/**
 * @description [Checks whether provided number is a finite number.
 *               (Function does not cast to number).]
 * @param  {Number}  object     [The number to check.]
 * @return {Boolean}            [True=number is a finite number.]
 */
Window.prototype.isFiniteNumber = Window.prototype.isFiniteNumber || function(object) {
    return isNumber(object) && isFinite(object);
};
/**
 * @description [Checks whether provided number is an ifinite number.
 *               (Function does not cast to number).]
 * @param  {Number}  object     [The number to check.]
 * @return {Boolean}            [True=number is a finite number.]
 */
Window.prototype.isInfiniteNumber = Window.prototype.isInfiniteNumber || function(object) {
    return (object === Infinity || object === -Infinity);
};
// ==============================================================================
/**
 * @description [Checks if string only contains alpha characters.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
String.prototype.isAlpha = String.prototype.isAlpha || function() {
    return (this.replace(/[a-z]/gi, "") === "");
};
/**
 * @description [Checks if string only contains letters + numbers (a-z0-9).]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
String.prototype.isAlphaNum = String.prototype.isAlphaNum || function() {
    return (this.replace(/[a-z0-9]/gi, "") === "");
};
/**
 * @description [Checks if string only contains uppercased letters.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
String.prototype.isUpper = String.prototype.isUpper || function() {
    return this.replace(/[A-Z]/g, "") === "";
};
/**
 * @description [Checks if string only contains lowercased letters.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
String.prototype.isLower = String.prototype.isLower || function() {
    return this.replace(/[a-z]/g, "") === "";
};
/**
 * @description [Checks if string only contains numbers.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
String.prototype.isOnlyNumbers = String.prototype.isOnlyNumbers || function() {
    return !this.isEmpty() && !(/[^0-9]/).test(this);
};
/**
 * @description [Checks if string only contains numbers and spaces.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
String.prototype.isNumberSpace = String.prototype.isNumberSpace || function() {
    return (/\s/).test(this) && this.replace(/\s/g, "").isOnlyNumbers();
};
// ==============================================================================
/**
 * @description [Checks if provided string is empty.]
 * @param  {String}  trim_string [Flag indicating whether to trim string before check.]
 * @return {Boolean}             [True=string is empty.]
 */
String.prototype.isEmpty = String.prototype.isEmpty || function(trim_string) {
    return (((trim_string) ? this.trim() : this.toString()) === "") ? true : false;
};
/**
 * @description [Checks if provided array is empty.]
 * @return {Boolean}            [True=array is empty.]
 */
Array.prototype.isEmpty = Array.prototype.isEmpty || function() {
    return (!this.length) ? true : false;
};
/**
 * @description [Checks if provided object is empty.]
 * @return {Boolean}            [True=object is empty.]
 */
Object.prototype.isEmpty = Object.prototype.isEmpty || function() {
    return (!this.size()) ? true : false;
};

// ==============================================================================
// ============================== FILLER_FUNCTIONS ==============================
// ==============================================================================

/**
 * @description [Checks the number of key pairs and returns count.]
 * @return {Number}            [The number of key pairs.]
 */
Object.prototype.size = Object.prototype.size || function() {
    var object = this,
        i = 0;
    for (var key in object)
        if (object.hasOwnProperty(key)) i++;
    return i;
};
/**
 * @description [Checks the number of key pairs and returns count.]
 * @return {Number}            [The number of key pairs.]
 */
Object.prototype.keys = Object.prototype.keys || function() {
    var object = this,
        keys = [];
    for (var key in object)
        if (object.hasOwnProperty(key)) keys.push(key);
    return keys;
};
// ==============================================================================
/**
 * @description [Extends String.prototype to add .includes method. Method checks
 *               if provided substring is contained in the string where the method
 *               is ran.]
 * @param  {String} substring   [The needle to check if included.]
 * @param  {Number} start_index [This parameter is optional and defaults to 0.
 *                               The index to start search at. When an negative
 *                               number is provided the start index is the string
 *                               length + the provided negative index.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
String.prototype.includes = String.prototype.includes || function(substring, start_index) {
    return (-~this.indexOf(substring, ((start_index >= 0) ? start_index : (this.length + start_index)) || 0)) ? true : false;
};
/**
 * @description [Extends Array.prototype to add .includes method. Method checks
 *               if provided item is contained in the array where the method
 *               is ran.]
 * @param  {String} substring   [The needle to check if included.]
 * @param  {Number} start_index [This parameter is optional and defaults to 0.
 *                               The index to start search at. When an negative
 *                               number is provided the start index is the array
 *                               length + the provided negative index.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
Array.prototype.includes = Array.prototype.includes || function(substring, start_index) {
    return (-~this.indexOf(substring, ((start_index >= 0) ? start_index : (this.length + start_index)) || 0)) ? true : false;
};
/**
 * @description [Extends Object.prototype to add .includes method. Method checks
 *               if provided object contains the provided key.]
 * @param  {String} substring   [The key to check for.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
Object.prototype.includes = Object.prototype.includes || function(key_name) {
    var object = this;
    for (var key in object) {
        if (object.hasOwnProperty(key) && key === key_name) return true;
    }
    return false;
};
// ==============================================================================
/**
 * @description [Checks if string starts with provided substring.]
 * @param  {String} substring   [The string to check against.]
 * @param  {Number} start_index [This parameter is optional and defaults to 0.
 *                               The index to start search at.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
String.prototype.startsWith = String.prototype.startsWith || function(substring, start_index) {
    return this.substr((start_index || 0), substring.length) === substring;
};
/**
 * @description [Checks if string ends with provided substring.]
 * @param  {String} substring   [The string to check against.]
 * @param  {Number} start_index [This parameter is optional and defaults to 0.
 *                               The index to start search at.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
String.prototype.endsWith = String.prototype.endsWith || function(substring, start_index) {
    // determine what the string will be
    var string = (!start_index) ? this : this.substr(0, start_index);
    // get characters from the back and check against substring
    return (string.substr(string.length - substring.length) === substring) ? true : false;
};

// ==============================================================================
// ============================== COMPOSITE_CHECKS ==============================
// ==============================================================================

/**
 * @description [Checks if provided string contains latin characters.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 * @source http://semplicewebsites.com/removing-accents-javascript
 */
Window.prototype.isLatin = Window.prototype.isLatin || function() {
    var latin_map = window.latin_map,
        string = this;
    for (var i = 0, l = string.length; i < l; i++) {
        if (latin_map[string[i]]) return true;
    }
    return false;
};
/**
 * @description [Checks if provided string contains special characters (symbols).]
 * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
 *  @1 {Array} [The array of special characters to exclude from check.]
 *  @2 {Boolean} [Flag indicating whether to include numbers in check.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isSpecialString = Window.prototype.isSpecialString || function(args) { // exclude_characters, check_for_numbers) {
    var special_chars = ("`~!@#$%^&*()-_=+[]{}\\|;:\'\",.<>/? " + ((args[2]) ? "0123456789" : "")).split("");
    var exclude_characters = args[1] || [];
    for (var i = 0, l = exclude_characters.length; i < l; i++) {
        var remove_index = special_chars.indexOf(exclude_characters[i]);
        if (remove_index > -1) special_chars.splice(remove_index, 1);
    }
    var string = this;
    // now check if the string has any special chars
    for (var i = 0, l = special_chars.length; i < l; i++) {
        if (this.indexOf(special_chars[i]) > -1) return true;
    }
    return false;
};
/**
 * @description [Checks if string is a base64 string.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 * @source http://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
 */
String.prototype.isBase64String = String.prototype.isBase64String || function() {
    // can have padding; 1 or 2 == at the end of string
    if (!this || this.str_count("/", "!=") > 2) return false;
    // first remove the padding and check chars to be A-Za-z0-9+/
    return ((/[^a-zA-Z0-9\+\/]/).test(this.str_replace("!right", "=", ""))) ? false : true;
};
/**
 * @description [Checks to see if the provided string is a base64 URL.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isBase64URL = Window.prototype.isBase64URL || function() {
    var string = this;
    // split at ,
    var parts = string.split(","),
        first = parts[0],
        second = parts[1];
    // screen the forst part ==> data:image/png;base64
    // split the first part
    first = first.split(/:|;/);
    // must start with data:
    if (first[0] !== "data") return false;
    // second part must be a legit mime type
    var mimes = window.mimetypes,
        l = Object.keys(window.mimetypes).length,
        counter = 0;
    for (var key in mimes) {
        counter++;
        if (mimes[key].indexOf(first[1]) > -1) break;
        // return false if we have gone through all the mimetypes
        // and there is no match
        if (counter === l) return false;
    }
    // if ( !string.str_is_mimedtype(first[1]) ) return false;
    // third part must Base64
    if (first[2] !== "base64") return false;
    // we check the second part
    if (!second.str_is("!base64_string")) return false;
    return true;
};
// ==============================================================================

/**
 * @description [Checks if provided string is in binary format.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isBinary = Window.prototype.isBinary || function() {
    // only have 0-1 and/ or a radix(dot)
    return (!(/[^0-1\.-]/g).test(this) && (/^(-)?([0-1]+)?(\.[0-1]+)?$/).test(this) && this !== "-") ? true : false;
    // return (!(/[^0-1\.]/g).test(string) && string.str_count("/", ".") < 2) ? true : false;
};
/**
 * @description [Checks if provided string is an octal number.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isOctal = Window.prototype.isOctal || function() {
    var string = this;
    // only have 0-7 and/ or a radix(dot)
    return (!(/[^0-7\.-]/g).test(string) && (/^(-)?([0-7]+)?(\.[0-7]+)?$/).test(string) && string !== "-") ? true : false;
};
/**
 * @description [Checks if provided string is in hex format.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isHex = Window.prototype.isHex || function() {
    var string = this;
    // only have 0-9 and/ or a radix(dot)
    return (!(/[^a-f0-9\.x-]/gi).test(string) && (/^(-)?((0x)?(#)?[0-9a-f]+)?(\.[0-9a-f]+)?$/i).test(string) && string !== "-") ? true : false;
};
// ==============================================================================
/**
 * @description [Checks if provided array has a valid year/month/day.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 * @source http://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
 *
 * @source: valid formats
 * https://en.wikipedia.org/wiki/Date_and_time_representation_by_country#Date
 * it will account for leap years
 */
Window.prototype.isValidBDay = Window.prototype.isValidBDay || function() {
    var string = this.split(/\-|;|\:|\s+|\.|,/);
    var year = string[0],
        month = string[1],
        day = string[2];
    if (!year || !month || !day) return false;
    // check if all strings are numeric
    if (!year.str_is("!numeric") || !month.str_is("!numeric") || !day.str_is("!numeric")) return 1;
    // check the lengths
    if ((year.str_convert("!::num") + "").length !== 4 || month.length > 2 || day.length > 2) return 2;
    // reset vars from string to numbers
    year = year * 1;
    month = month * 1;
    day = day * 1;
    // check that the month is between 1 and 12
    if (month < 1 || month > 12) return 3;
    // check that the day is possible in that month; February-leap-year-29-days
    // http://www.timeanddate.com/calendar/months/
    var month_max_days = [
        [1, 31],
        [2, 28],
        [3, 31],
        [4, 30],
        [5, 31],
        [6, 30],
        [7, 31],
        [8, 31],
        [9, 30],
        [10, 31],
        [11, 30],
        [12, 31]
    ];
    // gran the max day count for that month
    var check = month_max_days[month - 1][1];
    // if the year is a leay year and the month is February
    // we add an extra day
    if (month === 2 && (year + "").str_is("!leap_yr")) check += 1;
    // now we check the day is allowed
    if (day < 1 || day > check) return 4;
    // everything passed and we can
    return true;
};

/**
 * @description [Checks if provided string is in email format.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isEmail = Window.prototype.isEmail || function() {
    var string = this;
    /*
        Your email address can contain only letters,
        numbers, periods (.), hyphens (-),
        and underscores (_). It can't contain special
        characters, accented letters, or letters
        outside the Latin alphabet.
    */
    // string must be over 4 chars in length
    // http://stackoverflow.com/questions/2049502/what-characters-are-allowed-in-email-address
    // cannot have spaces...consecutive periods or start/end with a period
    if (string.length <= 4 || (/\s\xa0/g).test(string) || (/\.\.+/g).test(string) || string.str_is("!sewith", ["."])) return false;
    // must have a valid tld and tld must be the at the end of the string
    var tld = string.substring(string.lastIndexOf("."), string.length);
    // check if the tld is indeed valid
    if (window.suffix_list[tld.charAt(1).toLowerCase()].indexOf(tld) === -1) return false; // invalid tld
    // split the string at the @
    var parts = string.split("@"),
        username = parts[0],
        servername = parts[1].split(".");
    // there must only be two parts, else there are more than one "@"
    // and each part cannot be empty
    if (!username.length || !servername.length || parts.length !== 2) return false;
    // remove the last one as it is the valid tld
    servername.pop();
    // check the subdomains
    for (var i = 0, l = servername.length; i < l; i++) {
        if (!servername[i].str_is("!domain")) return false;
    }
    // now we check the username...must not contain any illegals chars...
    // only special chars allowed are ._-
    if (username.str_is("!special_string", [".", "_", "-"])) return false;
    // everything else looks good
    return true;
};
/**
 * @description [Checks to see if the provided mimetype and file extension are a valid match.]
 * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
 *  @1 {String} [The provided file extension.]
 *  @2 {String} [The provided mimetype to check against.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isValidMimeType = Window.prototype.isValidMimeType || function(args) {
    var m = window.mimetypes[args[1].str_ensure("!left", ".")];
    return (m && m.indexOf(args[2]) > -1) ? true : false;
};
/**
 * @description [Checks if number is a leap year.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 * @info http://www.timeanddate.com/date/leapyear.html
 */
Number.prototype.isLeapYear = Number.prototype.isLeapYear || function() {
    // logic: must be divisible by 4 && if the number is a century number(%100) it must be divisible by %400
    return ((((this * 1) % 4)) || (!((this * 1) % 100) && ((this * 1) % 400))) ? false : true;
};
// ==============================================================================
/**
 * @description [Checks if an rgb color is more white than black.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 * @source http://stackoverflow.com/questions/9780632/how-do-i-determine-if-a-color-is-closer-to-white-or-black
 * @source http://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
 * @source https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness
 * @example black === (lessthan or equal 127)
 * @exmaple white === (greaterthan or equal to 128)
 */
Window.prototype.isColorWhite = Window.prototype.isColorWhite || function(array) {
    return ((0.2126 * array[0] + 0.7152 * array[1] + 0.0722 * array[2]) < 127) ? false : true;
};
/**
 * @description [Checks if an rgb color is more black than white.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isColorBlack = Window.prototype.isColorBlack || function(array) {
    return !(isColorWhite(array));
};
/**
 * @description [Checks if provided string is a hex color.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isColorHex = Window.prototype.isColorHex || function() {
    var string = this;
    return ((/^(#)?([a-f0-9]{3,6})$/i).test(string) && (string.str_chomp("!left", "#").str_length("!exact", 3) || string.str_chomp("!left", "#").str_length("!exact", 6))) ? true : false;
    // return ((/^#?([a-f0-9]{3}|[a-f0-9]{6})$/gi).test(string)) ? true : false;
};
/**
 * @description [Checks if provided string is a hex color with an alpha channel.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isColorHex8 = Window.prototype.isColorHex8 || function() {
    return ((/^(#)?([a-f0-9]{8})$/i).test(this)) ? true : false;
};
/**
 * @description [Checks if provided string is an rgb color.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isRGB = Window.prototype.isRGB || function() {
    return ((typeof this.str_parse("!rgb")) === "boolean") ? false : true;
};
// ==============================================================================
/**
 * @description [Checks if provided string is a domain name in format.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isDomain = Window.prototype.isDomain || function() {
    var string = this;
    // a legal domain cannot contain `~!@#$%^&*()_+=[]{}|\;:'",.<>/?
    // cannot start or end with a hyphen/dash but it can contain inner hyphens/dashes
    return (string && string.str_grab("!left", 1) !== "-" && string.str_grab("!right", 1) !== "-" && !string.str_is("!special_string", ["-"])) ? true : false;
};
/**
 * @description [Checks if provided string is in a URL format.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isURL = Window.prototype.isURL || function() {
    var test = this.str_parse("!url");
    return (test.length === 1 && test[0].valid === true) ? true : false;
};
/**
 * @description [Checks if provided string is in a valid ip address format.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isIP = Window.prototype.isIP || function(string) {
    // replace any illegal chars
    string = string.str_chomp("!left", "://");
    string = string.str_chomp("!left", "@");
    string = string.str_chomp("!left", "[");
    // turns 1::1:123.1.12.1: => 1::1:123.1.12.1
    if ((/\d:$/).test(string)) string = string.str_chomp("!right", ":");
    string = string.str_chomp("!right", "]:");
    string = string.str_chomp("!right", "/");
    // check if v4 or v6
    if (string.indexOf(":") > -1) {
        var ip6 = string;
        // if we have something like '1:1:1:::::122.1.1.1 it is invalid
        if ((/:{3,}/g).test(string)) return false;
        // v6
        // check for ipv4
        if (string.indexOf(".") > -1) {
            // get the last colon index
            var last_colon_index = string.lastIndexOf(":");
            // separate at the last colon index
            var ip6 = string.substring(0, last_colon_index + 1);
            // reset the ip6; remove the traling : if there is only one, e.g. 1::1: => 1::1, 1:: => 1::
            if (ip6.str_grab("!right", 1) === ":" && ip6.str_grab("!right", 2) !== "::") ip6 = ip6.str_chomp("!right", ":");
            var ip4 = string.substring(last_colon_index + 1, string.length);
            // check that the ip4 is in valid format
            if (!ip4.str_is("!ip")) return false; //"invalid ip4";
        }
        // now we check the ip6
        // check for :: compression
        var compression_count = ip6.str_count("/", "!::");
        if (compression_count > 1) return false; //too much compression
        // if compression exists we check for length, there should be only 8
        if (compression_count === 1) {
            var repeat = 0;
            if (ip6.str_grab("!left", 2) === "::") {
                // remove the :: from the left and split by :
                var parts = ip6.str_chomp("!left", "::").split(":"),
                    l = parts.length;
            } else if (ip6.str_grab("!grab", 2) === "::") {
                // remove the :: from the left and split by :
                var parts = ip6.str_chomp("!right", "::").split(":"),
                    l = parts.length;
            } else {
                // remove the :: from the left and split by :
                var parts = ip6.split("::"),
                    p_1 = parts[0].split(":"),
                    p_2 = parts[1].split(":"),
                    l = (p_1.length + p_2.length);
                parts = p_1.concat(p_2);
            }
            if (l >= 9) return false;
        } else {
            // just split at every :
            var parts = ip6.split(":"),
                l = parts.length;
            // this case must be 8 in length
            if (l !== 8) return false;
        }
        // now we check that each part has valid chars
        for (var i = 0; i < l; i++) {
            // check if they are a-f0-9 only
            if (parts[i].length >= 5 || (/[^a-f0-9]+/gi).test(parts[i])) {
                return false; // illegal char found
            }
        }
        // everything has passed mane
        return true;
    } else {
        // v4
        // split into parts
        string = string.split(".");
        if (string.length !== 4) return false; // need to have 4 parts
        // check if they are all numbers
        if (!string.join("").str_is("!numeric")) return false; // all parts need to be numbers
        // no we check if they are all between a range
        var one = string[0] * 1,
            two = string[1] * 1,
            three = string[2] * 1,
            four = string[3] * 1;
        if (((one <= -1 || one >= 256) || (two <= -1 || two >= 256) || (three <= -1 || three >= 256) || (four <= -1 || four >= 256))) {
            return false; // invalid number
        }
        return true;
    }
};

// ==============================================================================
/**
 * @description [Checks to see if 2 objects are idential in content.]
 * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
 *  @1 {Any} [The object to which compare with.]
 * @return {Boolean}        [True = passed check, otherwise false.]
 */
Window.prototype.isEqual = Window.prototype.isEqual || function(args) {
    var string = this;
    var i, e, a = string,
        l = a.length,
        b = args[1],
        type1, type2, ll;
    if (l !== b.length) return false;
    while (l--) {
        //i = a.shift();
        //e = b.shift();
        i = a[l];
        e = b[l];
        type1 = dtype(i);
        type2 = dtype(e);
        if (type1 === type2) {
            //check number type
            if (type1 === "array") {
                ll = i.length; //, j, jj;
                if (ll !== e.length) return false;
                while (ll--) {
                    if (dtype(i[ll]) === dtype(e[ll]) && (![i[ll]].str_is("!equal", [e[ll]]))) {
                        return false;
                    }
                }
            } else if (type1 === "object") {
                var r = [],
                    s = [],
                    u = [],
                    v = [],
                    keys = Object.keys(i),
                    len = keys.length,
                    keys1 = Object.keys(e),
                    len1 = keys1.length,
                    j = -1;
                while (j < len) {
                    j++;
                    r.push(keys[j]);
                    s.push(i[keys[j]]);
                    u.push(keys[j]);
                    v.push(e[keys[j]]);
                }
                if (!r.str_is("!equal", u) || !s.str_is("!equal", v)) {
                    return false;
                }
            } else {
                if (i + "" !== e + "") {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
    return true;
};
