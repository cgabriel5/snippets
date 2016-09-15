/**
 * @description [Shuffles provided array.]
 * @source [http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript/6274398#6274398]
 * @source [https://bost.ocks.org/mike/shuffle/]
 * @param {Array} array [The array to shuffle.]
 * @return {Array} array [Returns shuffled array.]
 */
function shuffle(array) {
    var counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

// example
console.log(shuffle([1, 2, 3, 4]));

// ==================================================

// for the prototypal people
Array.prototype.shuffle = function() {
    var counter = this.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = this[counter];
        this[counter] = this[index];
        this[index] = temp;
    }
    return this;
};

// example
console.log([5, 6, 7, 8].shuffle());
