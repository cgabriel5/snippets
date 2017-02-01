/**
 * @description [Returns the data type of the provided object.]
 * @param  {Any} object [The object to check.]
 * @return {String}    [The data type of the checked object.]
 */
var dtype = function(object) {
    // will always return something like "[object {type}]"
    return Object.prototype.toString.call(object)
        .replace(/(\[object |\])/g, "")
        .toLowerCase();
};
/**
 * @description [Check if the provided object is of the provided data types.]
 * @param  {Any} object [The object to check.]
 * @param  {String}  types  [The allowed data type the object may be.]
 * @return {Boolean}        [Boolean indicating whether the object is of the
 *                           allowed data types.]
 */
dtype.is = function(object, types) {
    // get the object type
    var type = this(object);
    // prepare the types
    types = "|" + types.toLowerCase().trim() + "|";
    // check if the object's type is in the list
    return Boolean((-~types.indexOf("|" + type + "|")));
};
/**
 * @description [Check if the provided object is not of the provided data types.]
 * @param  {Any} object [The object to check.]
 * @param  {String}  types  [The prohibited data types.]
 * @return {Boolean}        [Boolean indicating whether the object is not of the
 *                           allowed data types.]
 */
dtype.isnot = function(object, types) {
    // return the inverse of the is method
    return !(this.is(object, types));
};

// usage
dtype("this is a string"); // string
dtype([1, 2, 3]); // array
dtype.is("this is a string", "string|number"); // true
dtype.isnot("this is a string", "array"); // true
