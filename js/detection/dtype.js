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
};

// usage
dtype("this is a string"); // string
dtype([1, 2, 3]); // array
dtype("this is a string", "string"); // true
dtype("this is a string", "array"); // false
