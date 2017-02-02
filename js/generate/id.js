/**
 * @description [Generates a simple ID containing letters and numbers.]
 * @param  {Number} length [The length the ID should be. Max length is 22 characters]
 * @return {String}        [The newly generated ID.]
 * @source {http://stackoverflow.com/a/38622545}
 */
function id(length) {
    return Math.random().toString(36).substr(2, length);
}

// usage
var uid = id(20); // i.e. --> "zprotguorwevih7vgvydgq"