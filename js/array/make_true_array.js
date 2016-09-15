// method 1

/**
 * @description [Makes an Array from an array like object (ALO). ALO must have a length property for it to work.]
 * @param  {ALO} alo [The ALO.]
 * @return {Array}   [The created array.]
 * @source [http://stackoverflow.com/questions/960866/how-can-i-convert-the-arguments-object-to-an-array-in-javascript/960870#960870]
 */
function to_array(alo) {
    return Array.prototype.slice.call(alo);
}

// method 2

/**
 * @description [Makes an Array from an array like object (ALO). ALO must have a length property for it to work.]
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

// examples

console.log(to_array({ 0: "a", 1: "b", length: 2 }));

function test(a, b, c) {
    console.log(to_array(arguments)); // functions argument object
}
test("a", {}, 3);