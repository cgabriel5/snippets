# String

Expands the String.prototype with needed string functionality.

### String Methods

**String.str_build** &mdash; `insert`, `join`, `prepend`, `wrap` a string.

```js

// inserts provided string|number at provided index
"Hello ".str_build("insert", "World!", 6); // Hello World!

// joins provided strings|numbers
"Hello ".str_build("join", "Wor", "ld", "!"); // Hello World!

// prepends provided strings|numbers
"456789".str_build("prepend", 1, 2, 3); // 321456789

// prepends provided strings|numbers
"html".str_build("wrap", "left->", "<-right"); // "left->html<-right"
```

**String.str_chomp** &mdash; Removes provided substring from the `left` or `right` of string. Or it can remove the `x` number of characters from either end.

```js
// chomps "some" from the left of string
"something.jpg".str_chomp("left", "some"); // "thing.jpg"
// if provided substring is not found at the left string
// is left untouch
"something.jpg".str_chomp("left", "somE"); // "something.jpg"
// chomps the first 3 chars from the left of string
"something.jpg".str_chomp("left", 3); //"ething.jpg"

// chomps "jpg" from the right of string
"something.jpg".str_chomp("right", "jpg"); // "something."
// if provided substring is not found at the right string
// is right untouch
"something.jpg".str_chomp("right", "JPG"); // "something.jpg"
// chomps the first 3 chars from the right of string
"something.jpg".str_chomp("right", 3); // "something."
```

**String.str_clear** &mdash; Removes white space.

```js
// removes white space from HTML
"<     div id=\"mainCont\">".str_clear("html"); // <div id="mainCont">

// removes white space from text
"This is a sentence. \n\n\n Some spaces.".str_clear("space"); // "This is a sentence. Some spaces."

// see that it works
var test = "This is some \n\n\n text !";
test = test.str_clear("space"); // "This is some text !"
test.replace(/\s|\n/g, "*"); // "This*is*some*text*!"
```

**String.str_convert** &mdash; A string conversion function. Provides multiple conversion types.

```js
// NUMBER CONVERSIONS

// convert binary number to octal
"10101010111.1110101".str_convert("bin::oct"); // "2527.724"
// convert binary number to decimal
"10101010111.1110101".str_convert("bin::dec"); // "1367.9140625"
// convert binary number to hexadecimal
"10101010111.1110101".str_convert("bin::hex"); // "557.EA"
// convert decimal number to binary
"1367.9140625".str_convert("dec::bin"); // "10101010111.1110101"
// convert decimal number to octal
"1367.9140625".str_convert("dec::oct"); // "2527.724"
// convert decimal number to hexadecimal
"1367.9140625".str_convert("dec::hex"); // "557.EA"
// convert octal number to binary
"2527.724".str_convert("oct::bin"); // "10101010111.111010100"
// convert octal number to decimal
"2527.724".str_convert("oct::dec"); // "1367.9140625"
// convert octal number to hexadecimal
"2527.724".str_convert("oct::hex"); // "557.EA"
// convert hexadecimal number to binary
"557.EA".str_convert("hex::bin"); // "10101010111.1110101"
// convert hexadecimal number to octal
"557.EA".str_convert("hex::oct"); // "2527.724"
// convert hexadecimal number to decimal
"557.EA".str_convert("hex::dec"); // "1367.9140625"

// EXPANSION

// expand a number range
"1::12".str_convert("num::range"); // "1,2,3,4,5,6,7,8,9,10,11,12"
// expand 3 character hexadecimal color code to 6 characters
"#325".str_convert("hex::six"); // "#332255"

// COLOR CONVERSIONS

// convert rgba to argb color code
"rgba(23, 111, 156, 1)".str_convert("rgba::argb"); // "FF176F9C"
"rgba(23, 111, 156, 1)".str_convert("rgba::argb", true); // "#FF176F9C"
// convert argb to rgba color code
"FF176F9C".str_convert("argb::rgba"); // "rgba(23,111,156,1)"
"#FF176F9C".str_convert("argb::rgba"); // "rgba(23,111,156,1)"
// convert rgb to hex color code
"rgba(23,111,156,1);".str_convert("rgb::hex"); // "176F9C"
"rgba(23,111,156,1);".str_convert("rgb::hex", true); // "#176F9C"
// convert hex to rgb color code
"#176F9C".str_convert("hex::rgb"); // "rgba(23,111,156,1)"
// convert rgb to hsl color code
"rgba(23,111,156,1);".str_convert("rgb::hsl"); // "hsl(200.30075187969925,74.30167597765363%,35.09803921568628%)"
// convert hsl to rgb color code
"hsl(200.30075187969925,74.30167597765363%,35.09803921568628%)".str_convert("hsl::rgb"); // "rgba(23,111,156,1)"
// convert rgb to hsv color code
"rgba(23,111,156,1);".str_convert("rgb::hsv"); // "hsv(200.30075187969925,85.25641025641025%,61.1764705882353%)"
// convert hsv to rgb color code
"hsv(200.30075187969925,85.25641025641025%,61.1764705882353%)".str_convert("hsv::rgb"); // "rgba(23,111,156,1)"
// lighten hex by provided percentage
"336600".str_convert("hex::lighten", 10); // 4C9900
// darken hex by provided percentage
"336600".str_convert("hex::darken", 10); // 193300
// lighten rgb by provided percentage
"rgba(51,102,0,1)".str_convert("rgb::lighten", 10); // "rgba(76,153,0,1)"
// darken rgb by provided percentage
"rgba(51,102,0,1)".str_convert("rgb::darken", 10); // "rgba(25,51,0,1)"
// convert hsv to hwb color code
"hsv(200.30075187969925,85.25641025641025%,61.1764705882353%)".str_convert("hsv::hwb"); // ["200.30075187969925", 9.019607843137258, 38.8235294117647]
// convert rgb to hwb color code
"rgba(23,111,156,1);".str_convert("rgb::hwb"); // ["200.30075187969925", 9.019607843137258, 38.8235294117647]
// convert hwb to hsv color code
"hwb(200.30075187969925, 9.019607843137258%, 38.8235294117647%);".str_convert("hwb::hsv"); // ["200.30075187969925", 85.25641025641025, 61.1764705882353]

// TO NUMBER CONVERSIONS

// converts string to provided base, defaults to decimal
"12".str_convert("::num", 16); // 18
"12".str_convert("::num"); // 12

// FORMAT CONVERSIONS

// camelize string
"first_name".str_convert("::camel"); // "firstName"
"data_rate".str_convert("::camel"); // "dataRate"
"background-color".str_convert("::camel"); // "backgroundColor"
"-moz-something".str_convert("::camel"); // "MozSomething"
"_car_speed_".str_convert("::camel"); // "CarSpeed"
"yes_we_can".str_convert("::camel"); // "yesWeCan"
// capitalize string
"what is up?".str_convert("::cap"); // "What is up?"
// decapitalize string
"What is up?".str_convert("::decap"); // "what is up?"
// removes all punctuation chars then camelizes + capitalize
"object.names 3d".str_convert("::class");
// dasherize string
"dataRate".str_convert("::dash"); // "data-rate"
"CarSpeed".str_convert("::dash"); // "-car-speed"
"yesWeCan".str_convert("::dash"); // "yes-we-can"
"backgroundColor".str_convert("::dash"); // "background-color"
// inverts upper/lowercase letters
"This is it.".str_convert("::swap"); //"tHIS IS IT."
// turns string into a url slug (also removes accents)
"Global Thermonuclear Warfare".str_convert("::slug"); // "global-thermonuclear-warfare"
"Crème brûlée".str_convert("::slug"); // "creme-brulee"
// turns string into a title
"the lord of the tunks".str_convert("::title"); //"The Lord Of The Tunks"
// underscores string
"dataRate".str_convert("::under"); //"data_rate"
"CarSpeed".str_convert("::under"); //"_car_speed"
"yesWeCan".str_convert("::under"); //"yes_we_can"
```

**String.str_count** &mdash; Count the occurances of a substring. 

```js
"1 2 3 4 5 1 2 1".str_count("/", "1"); // 3
```

**String.str_decode** &mdash; Decode `base64`, `html`, `json`, or `utf8` string. 

```js
"SGVsbG8gV29ybGQh".str_decode("base64"); // Hello World!
```

**String.str_encode** &mdash; Encodes string in `base64`, `html`, `json`, or `utf8`. 

```js
"Hello World!".str_encode("base64"); // SGVsbG8gV29ybGQh
"divsome text</div>".str_encode("html"); // &lt;div&gt;some text&lt;/div&gt;
"{1:\"text\"}".str_encode("json"); // "{1:"text"}"
"divsome text</div>".str_encode("utf8"); // divsome text</div>
```

**String.str_ensure** &mdash; Ensures string ends or starts with provided prefix or suffix.

```js
"something.jpg".str_ensure("left", "-small"); // -smallsomething.jpg
"something.jpg".str_ensure("left", "some"); // something.jpg
"something.jpg".str_ensure("right", ".jpg"); // something.jpg
"something.jpg".str_ensure("right", ".jpg.png"); // something.jpg.jpg.png
```

**String.str_ff** &mdash; Returns the first item found in the string.

```js
"this is the thing".str_ff("/", ["two", "in", "the"]); // in
"this is the thing".str_ff("/", ["two", "the"]); // the
"this is the thing".str_ff("/", ["two", "three"]); // null
```

**String.str_format** &mdash; Formats string.

```js
"123456789.0006786".str_format("number", 1, ".", ","); // 123,456,789.0
"Hello! My name is {0}".str_format("string", {0:"Timmy"}); // Hello! My name is Timmy
```

**String.str_freq** &mdash; Returns the frequency of the letters or words used within the string.

```js
"How many letters are there?".str_freq("letters"); // {"H":1,"o":1,"w":1," ":4,"m":1,"a":2,"n":1,"y":1,"l":1,"e":5,"t":3,"r":3,"s":1,"h":1,"?":1}
"How many letters are there?".str_freq("words"); // {"How":1,"many":1,"letters":1,"are":1,"there?":1}
```

**String.str_grab** &mdash; Grab text from the `left`, `right`, or `between` the string. Both right and left sides must be provided when using `between`.

```js
"-left-middle-right".str_grab("left", 5); // -left
"-left-middle-right".str_grab("right", 6); // -right
"Here { is the {http://www.google.com}".str_grab("between", "{", "}"); // " is the {http://www.google.com"
"Here is the [http://www.google.com]".str_grab("between", "[", "]"); // "http://www.google.com"
```

**String.str_index** &mdash; Get the index of the provided substring from the `left` or the `right`. Can also return all the indices of the substring.

```js
"1234512345".str_index("left", "1"); // 0
"1234512345".str_index("left", "1", true); // [0, 5] => all indices
"1234512345".str_index("right", "1"); // 5
"1234512345".str_index("right", "1", true); // [5, 0] => all indices
```

**String.str_is** &mdash; A comparative string function. Provides multiple check types.

```js
// INCLUDE CHECKS

// checks if substring is in string
"something.jpg".str_is("in", "some"); // true

// checks if string starts with any of the items in provided array
"something.jpg".str_is("swith", ["-some", "some"]); // true
// checks if string ends with any of the items in provided array
"something.jpg".str_is("ewith", ["jpg", "png"]); // true
// checks if string starts/ends with any of the items in provided array
"something.jpg".str_is("sewith", ["-some", "some", "jpg", "png"]); // 1
"something.jpg".str_is("sewith", ["-some", "jpg", "png"]); // 2
"something.jpg".str_is("sewith", ["-some"]); // false

// FORMAT CHECKS

// checks if strings contains alpha characters
"something.jpg".str_is("alpha"); // false
"somethingjpg".str_is("alpha"); // true

// checks if strings contains alphanumeric characters
"something.jpg".str_is("alphanum"); // false
"something3jpg".str_is("alphanum"); // true

// checks if string is empty
"".str_is("empty") // true

// checks if string is base64
"aGVsbG8gd29ybGQ=".str_is("base64_string"); // true
// checks if string is in email format
"something@email.com".str_is("email"); // true
// checks if string contains latin characters
"Piqué".str_is("latin"); // true

// Number format checks

// checks if string is a decimal
"1.2".str_is("decimal"); // true
// checks if string is a whole number
"12".str_is("whole_number"); // true
// checks if string is in binary format
"1010101".str_is("binary"); // true
// checks if string is in octal format
"1674641".str_is("octal"); // true
// checks if string is in hex format
"145FF".str_is("hex"); // true
// checks if string is in hex color format
"145FFA".str_is("hexcolor"); // true
// checks is string is in hexcolor8 format
"145FFACC".str_is("hexcolor8"); // true
// checks if string contains only numbers and spaces
"1 2 3 4 5".str_is("number_space"); // true
// checks if string is numeric
"AA.AA1212".str_is("numeric"); // true; numeric checks if it is any type of number

// checks if all string characters are lowercase
"allarelower".str_is("lower"); // true
// checks if all string characters are uppercase
"ALLAREUPPER".str_is("upper"); // true

// checks if string is really a string
"string".str_is("string"); // true

// checks if string includes any special characters
"#hashtag".str_is("special_string", ["#"], false); // false
"#hashtag".str_is("special_string", [], false); // true

"array": null, // ????
"arguments": null, // ???
"bday": null, // ????
"boolean": null, // ????
"date": null, // ????
"domain": null,
"digit": null, //
"rgb": null, // ????? need to look back on the colors*****
"ip": null, // ???
"leap_yr": null, // ???
"nan": null, // ???
"null": null, // ???
"number": null, // ???
"url": null, // ????????????
"falsy": null, // ???
"finite": null, // ???
"infinity": null, // ???
"function": null, // ???
"plain_object": null, // ???
"equal": "1,<*>", // ???
"same_type": "1,<*>", // ???
"element": null, // ???
"regex": null, // ???
"undefined": null, // ???
"window": null, // ???
"color_white": null, // ????????????
"color_black": null, // ????????????
"mimetype": "1::2,string;", // ?????
"base64_url": null // ????????????
```

**String.str_length** &mdash; Compares the length of the current string with the provided length.

```js
"california".str_length("min", 5); // true
"california".str_length("min", 15); // false
"california".str_length("max", 5); // false
"california".str_length("max", 15); // true
"california".str_length("range", 5, 15); // true
"california".str_length("range", 15, 15); // false
"california".str_length("exact", 15); // false
"california".str_length("exact", 10); // true
```

**String.str_letter** &mdash; Get the `previous` or `next` letter in the alphabet.

```js
"a".str_letter("prev"); // "z"
"a".str_letter("next"); // "b"
"A".str_letter("prev"); // "Z"
"A".str_letter("next"); // "B"
```

**String.str_distance** &mdash; Get the `levenshtein distance` between two strings.

```js
"google".str_distance("leven", "oogle"); // 1
```

**String.str_pad** &mdash; Pad string on the `left`, `right`, or `both` sides. 

```js
"string".str_pad("both", 4); // "    string    "
"string".str_pad("both", 4, "-"); // "----string----"
"string".str_pad("left", 4); // "    string"
"string".str_pad("left", 4, "-"); // "----string"
"string".str_pad("right", 4); // "string    "
"string".str_pad("right", 4, "-"); // "string----"
```

**String.str_parse** &mdash; Parse `numbers`, `number`, `hsv`, `hsl`, `hwb`, `rgb`, `url`. 

```js
"rgb(23, 24, 112);".str_parse("number"); // "23"
"rgb(23, 24, 112);".str_parse("numbers"); // ["23", "24", "112"]
"rgba(23, 24, 112, .45)".str_parse("rgb"); // ["23", "24", "112", ".45"]
"rgba(23, 24, 112)".str_parse("rgb"); // ["23", "24", "112", "1"]
```

**String.str_repeat** &mdash; Repeat string the x times provided.

```js
"-cool".str_repeat("text", 4); // -cool-cool-cool-cool
"-cool".str_repeat("text"); // ""
```

**String.str_replace** &mdash; Replace map items in string.

```js
"00012345000".str_replace("all", {"000":"---"}); // ---12345---
"00012345000".str_replace("left", "0", ""); // "12345000"
"00012345000".str_replace("left", "0", "-");  // "-12345000"
"000:00012345000".str_replace("left", "0", "-"); // "-:00012345000"
"00012345000".str_replace("right", "0", ""); // "00012345"
"00012345000".str_replace("right", "0", "-"); // "00012345-"
"00012345000:000".str_replace("right", "0", "-"); // "00012345000:-"
```

**String.str_reverse** &mdash; Reverses string.

```js
"123456789".str_reverse("/"); // "987654321"
```

**String.str_split** &mdash; Split string by `characters`, `chunks`, `lines`, `number`, or `words`.

```js
"youtube".str_split("chars"); // ["y", "o", "u", "t", "u", "b", "e"]
"youtube".str_split("chunk", 2); // ["yo", "ut", "ub", "e"]
"youtube\ninternet".str_split("lines"); // ["youtube", "internet"]
"1.23".str_split("num"); // ["1", "23", false]
"-1.23".str_split("num"); // ["1", "23", true]
".23".str_split("num"); // ["0", "23", false]
"23".str_split("num"); // ["23", "0", false]
"1.0".str_split("num"); // ["1", "0", false]
"Hello World!".str_split("words"); // ["Hello", "World!"]
```

**String.str_strip** &mdash; Strip string of `accents`, `punctuation`, or `tags`.

```js
"á, é, í, ó, ú, ü, ñ".str_strip("accents"); // "a, e, i, o, u, u, n"
"Thi#@s is%# co*^ol.".str_strip("punctuation"); // "This is cool"
"This is <b>bold text</b>. This text is in <i>italics</i>.".str_strip("tags"); // "This is text. This text is in italics."
"This is <b>bold text</b>. This text is in <i>italics</i>.".str_strip("tags", "b|i"); // "This is bold text. This text is in italics."
```

**String.str_trim** &mdash; Trim string from the `left`, `inner`, or `right` side.

```js
"   This is some text.   ".str_trim("left"); // "This is some text.   "
"   This is some text.   ".str_trim("right"); // "   This is some text."
"   This    is       some           text.   ".str_trim("inner"); // "   This is some text.   "
```

**String.str_truncate** &mdash; Trucates string by `characters` or by `words`.

```js
// example string
var str = "This is some text that needs to be shortened down."; 

str.str_truncate("by_chars", 15); // "This is some..."
str.str_truncate("by_chars", 15, "..."); // "This is some..."
str.str_truncate("by_words", 5); // "This is some text that..."
str.str_truncate("by_words", 5, "..."); // "This is some text that..."
```