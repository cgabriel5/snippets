/**
 * @description [Returns a random item from array.]
 * @param  {Array} array [The array to get item from.]
 * @return {Any}         [The randomly selected item.]
 */
function random(array) {
    // Creates a random number and multiplies it by the
    // arrays length (serves as the max possible index).
    // Finally, rounds the number down.
    return array[Math.floor(Math.random() * array.length)];
}

// example
console.log(random([1, 2, 3, 4]));

// ==================================================

// for the prototypal people
Array.prototype.random = function() {
    // Creates a random number and multiplies it by the
    // arrays length (serves as the max possible index).
    // Finally, rounds the number down.
    return this[Math.floor(Math.random() * this.length)];
}

// example
console.log([5, 6, 7, 8].random());