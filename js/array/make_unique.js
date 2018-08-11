/**
 * Make the provided array unique.
 *
 * @param  {array} array - The array to clean.
 * @param  {boolean} flag_sort - Flag indicating whether the array needs to be sorted.
 * @return {array} - The worked on array.
 *
 * @resource [http://stackoverflow.com/questions/1960473/unique-values-in-an-array/39272981#39272981]
 * @ersource [http://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly/21595293#21595293]
 */
var make_unique = function(array, flag_sort) {
    // Make array unique.
    array = array.filter(function(x, i, a_) {
        return a_.indexOf(x) === i;
    });

    // Sort the array if flag set.
    // **Note: does not sort numbers.
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

    // Return the array.
    return array;
};

// Usage.

var list = ["car", "array", "zombie", "apple", "array", "bat", "array"];
list = make_unique(list, "alpha"); // Make unique and sort (alpha).
// Output: ["apple", "array", "bat", "car", "zombie"]

var list = ["car", "array", "zombie", "apple", "array", "bat", "array"];
list = make_unique(list); // Make unique.
// Output: ["car", "array", "zombie", "apple", "bat"]

var list = [1, 2, 4, 1, 6, 7, 2, 4, 3, 6];
list = make_unique(list);
// Output: [1, 2, 4, 6, 7, 3]

var list = [1, 2, 4, 1, 6, 7, 2, 4, 3, 6];
list = make_unique(list, "number");
// Output: [1, 2, 3, 4, 6, 7]
