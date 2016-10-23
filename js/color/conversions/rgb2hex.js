/**
 * @description [Converts RGB color to HEX equivalent.]
 * @param  {String}  rgb           [The RGB color to convert.]
 * @param  {Boolean} to_lowercase  [Flag indicating whether to return lowercase HEX.]
 * @return {String}                [The HEX color equivalent.]
 */
var rgb2hex = function(rgb, to_lowercase) {

    //parse the rgb
    var parts = rgb.replace(/rgba?|\(|\)|;/g, "").split(","),
        table = "0123456789ABCDEF".split(""),
        final_hex = [];

    // reuse rgb var to store parsed color components
    rgb = [parts[0] * 1, parts[1] * 1, parts[2] * 1];

    for (var i = 0, l = rgb.length; i < l; i++) {
        // cache the current color component + divide by 16
        var current_color_component = rgb[i];
        // divide current color component by 16
        var cc = Math.floor(current_color_component / 16);
        final_hex.push(table[cc] + "" + table[current_color_component - ((cc) * 16)]);
    }

    // if to_lowercase flag is provided lowercase the HEX value...else return upper case HEX
    return ("#" + final_hex.join(""))[!to_lowercase ? "toString" : "toLowerCase"]();

};

// examples

console.log(rgb2hex("rgb(45, 124, 223);", true)); // #2d7cdf
console.log(rgb2hex("rgb(45, 124, 223)", true)); // #2d7cdf
console.log(rgb2hex("(45, 124, 223);", true)); // #2d7cdf
console.log(rgb2hex("45, 124, 223", true)); // #2d7cdf

console.log(rgb2hex("rgb(45, 124, 223);")); // #2D7CDF
console.log(rgb2hex("rgb(45, 124, 223)")); // #2D7CDF
console.log(rgb2hex("(45, 124, 223);")); // #2D7CDF
console.log(rgb2hex("45, 124, 223")); // #2D7CDF
