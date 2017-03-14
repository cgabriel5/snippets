/**
 * @description [Make the provided array unique.]
 * @param  {Array} array       [The array to clean.]
 * @param  {Boolean} flag_sort [Flag indicating whether the array needs to be sorted.]
 * @return {Array}   [The worked on array.]
 * @source [http://stackoverflow.com/questions/1960473/unique-values-in-an-array/39272981#39272981]
 * @source [http://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly/21595293#21595293]
 */
function make_unique(array, flag_sort) {
    // make array unique
    array = array.filter(function(x, i, a_) {
        return a_.indexOf(x) === i;
    });
    // sort the array if flag set
    // **Note: does not sort numbers
    if (flag_sort) {
        if (flag_sort === "alpha") {
            array = array.sort(function(a, b) {
                return a.localeCompare(b);
            });
        } else if (flag_sort === "number") {
            array.sort(function(a, b) {
                return a - b;
            });
        }
    }
    // return the array
    return array;
}

// ==================================================

// examples

var list = ["car", "array", "zombie", "apple", "array", "bat", "array"];
list = make_unique(list, "alpha"); // make unique and sort (alpha)
// output: ["apple", "array", "bat", "car", "zombie"]

var list = ["car", "array", "zombie", "apple", "array", "bat", "array"];
list = make_unique(list); // make unique
// output: ["car", "array", "zombie", "apple", "bat"]

var list = [1, 2, 4, 1, 6, 7, 2, 4, 3, 6];
list = make_unique(list);
// output: [1, 2, 4, 6, 7, 3]

var list = [1, 2, 4, 1, 6, 7, 2, 4, 3, 6];
list = make_unique(list, "number");
// output: [1, 2, 3, 4, 6, 7]
