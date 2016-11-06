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
    return !isFinite(object);
};
// ==============================================================================
/**
 * @description [Checks if string only contains alpha characters.]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
String.prototype.isAlpha = String.prototype.isAlpha || function() {
    return (this.replace(/[a-z]/gi, "") === "") ? true : false;
};
/**
 * @description [Checks if string only contains letters + numbers (a-z0-9).]
 * @return {Boolean}            [True=passed check. Otherwise false.]
 */
String.prototype.isAlphaNum = String.prototype.isAlphaNum || function() {
    return (this.replace(/[a-z0-9]/gi, "") === "") ? true : false;
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
