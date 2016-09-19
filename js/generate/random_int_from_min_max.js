/**
 * @description [Generates a random number between a given range (min, max). Min and max are both inclusive.]
 * @source [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random]
 * @source [http://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript/7228322#7228322]
 * @param  {Number} min [The minimum the random number can be.]
 * @param  {Number} max [The maximum the random number can be.]
 * @return {Number}     [The randomly generated number.]
 */
function random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// example
console.log(random_int(12, 15));