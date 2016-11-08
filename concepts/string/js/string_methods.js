(function() {
    "use strict";
    var constants = {
        // [source](http://semplicewebsites.com/sites/default/files/latinise_compact.js_.txt)
        "LATIN_MAP": { "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "ẞ": "SS", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ß": "ss", "ɡ": "g", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x" },
        // [mimetype list](http://www.sitepoint.com/web-foundations/mime-types-complete-list/)
        "MIMETYPES": { ".3dm": ["x-world/x-3dmf"], ".3dmf": ["x-world/x-3dmf"], ".a": ["application/octet-stream"], ".aab": ["application/x-authorware-bin"], ".aam": ["application/x-authorware-map"], ".aas": ["application/x-authorware-seg"], ".abc": ["text/vnd.abc"], ".acgi": ["text/html"], ".afl": ["video/animaflex"], ".ai": ["application/postscript"], ".aif": ["audio/aiff", "audio/x-aiff"], ".aifc": ["audio/aiff", "audio/x-aiff"], ".aiff": ["audio/aiff", "audio/x-aiff"], ".aim": ["application/x-aim"], ".aip": ["text/x-audiosoft-intra"], ".ani": ["application/x-navi-animation"], ".aos": ["application/x-nokia-9000-communicator-add-on-software"], ".aps": ["application/mime"], ".arc": ["application/octet-stream"], ".arj": ["application/arj", "application/octet-stream"], ".art": ["image/x-jg"], ".asf": ["video/x-ms-asf"], ".asm": ["text/x-asm"], ".asp": ["text/asp"], ".asx": ["application/x-mplayer2", "video/x-ms-asf", "video/x-ms-asf-plugin"], ".au": ["audio/basic", "audio/x-au"], ".avi": ["application/x-troff-msvideo", "video/avi", "video/msvideo", "video/x-msvideo"], ".avs": ["video/avs-video"], ".bcpio": ["application/x-bcpio"], ".bin": ["application/mac-binary", "application/macbinary", "application/octet-stream", "application/x-binary", "application/x-macbinary"], ".bm": ["image/bmp"], ".bmp": ["image/bmp", "image/x-windows-bmp"], ".boo": ["application/book"], ".book": ["application/book"], ".boz": ["application/x-bzip2"], ".bsh": ["application/x-bsh"], ".bz": ["application/x-bzip"], ".bz2": ["application/x-bzip2"], ".c": ["text/plain", "text/x-c"], ".c++": ["text/plain"], ".cat": ["application/vnd.ms-pki.seccat"], ".cc": ["text/plain", "text/x-c"], ".ccad": ["application/clariscad"], ".cco": ["application/x-cocoa"], ".cdf": ["application/cdf", "application/x-cdf", "application/x-netcdf"], ".cer": ["application/pkix-cert", "application/x-x509-ca-cert"], ".cha": ["application/x-chat"], ".chat": ["application/x-chat"], ".class": ["application/java", "application/java-byte-code", "application/x-java-class"], ".com": ["application/octet-stream", "text/plain"], ".conf": ["text/plain"], ".cpio": ["application/x-cpio"], ".cpp": ["text/x-c"], ".cpt": ["application/mac-compactpro", "application/x-compactpro", "application/x-cpt"], ".crl": ["application/pkcs-crl", "application/pkix-crl"], ".crt": ["application/pkix-cert", "application/x-x509-ca-cert", "application/x-x509-user-cert"], ".csh": ["application/x-csh", "text/x-script.csh"], ".css": ["application/x-pointplus", "text/css"], ".cxx": ["text/plain"], ".dcr": ["application/x-director"], ".deepv": ["application/x-deepv"], ".def": ["text/plain"], ".der": ["application/x-x509-ca-cert"], ".dif": ["video/x-dv"], ".dir": ["application/x-director"], ".dl": ["video/dl", "video/x-dl"], ".doc": ["application/msword"], ".dot": ["application/msword"], ".dp": ["application/commonground"], ".drw": ["application/drafting"], ".dump": ["application/octet-stream"], ".dv": ["video/x-dv"], ".dvi": ["application/x-dvi"], ".dwf": ["drawing/x-dwf (old)", "model/vnd.dwf"], ".dwg": ["application/acad", "image/vnd.dwg", "image/x-dwg"], ".dxf": ["application/dxf", "image/vnd.dwg", "image/x-dwg"], ".dxr": ["application/x-director"], ".el": ["text/x-script.elisp"], ".elc": ["application/x-bytecode.elisp (compiled elisp)", "application/x-elc"], ".env": ["application/x-envoy"], ".eps": ["application/postscript"], ".es": ["application/x-esrehber"], ".etx": ["text/x-setext"], ".evy": ["application/envoy", "application/x-envoy"], ".exe": ["application/octet-stream"], ".f": ["text/plain", "text/x-fortran"], ".f77": ["text/x-fortran"], ".f90": ["text/plain", "text/x-fortran"], ".fdf": ["application/vnd.fdf"], ".fif": ["application/fractals", "image/fif"], ".fli": ["video/fli", "video/x-fli"], ".flo": ["image/florian"], ".flx": ["text/vnd.fmi.flexstor"], ".fmf": ["video/x-atomic3d-feature"], ".for": ["text/plain", "text/x-fortran"], ".fpx": ["image/vnd.fpx", "image/vnd.net-fpx"], ".frl": ["application/freeloader"], ".funk": ["audio/make"], ".g": ["text/plain"], ".g3": ["image/g3fax"], ".gif": ["image/gif"], ".gl": ["video/gl", "video/x-gl"], ".gsd": ["audio/x-gsm"], ".gsm": ["audio/x-gsm"], ".gsp": ["application/x-gsp"], ".gss": ["application/x-gss"], ".gtar": ["application/x-gtar"], ".gz": ["application/x-compressed", "application/x-gzip"], ".gzip": ["application/x-gzip", "multipart/x-gzip"], ".h": ["text/plain", "text/x-h"], ".hdf": ["application/x-hdf"], ".help": ["application/x-helpfile"], ".hgl": ["application/vnd.hp-hpgl"], ".hh": ["text/plain", "text/x-h"], ".hlb": ["text/x-script"], ".hlp": ["application/hlp", "application/x-helpfile", "application/x-winhelp"], ".hpg": ["application/vnd.hp-hpgl"], ".hpgl": ["application/vnd.hp-hpgl"], ".hqx": ["application/binhex", "application/binhex4", "application/mac-binhex", "application/mac-binhex40", "application/x-binhex40", "application/x-mac-binhex40"], ".hta": ["application/hta"], ".htc": ["text/x-component"], ".htm": ["text/html"], ".html": ["text/html"], ".htmls": ["text/html"], ".htt": ["text/webviewhtml"], ".htx": ["text/html"], ".ice": ["x-conference/x-cooltalk"], ".ico": ["image/x-icon"], ".idc": ["text/plain"], ".ief": ["image/ief"], ".iefs": ["image/ief"], ".iges": ["application/iges", "model/iges"], ".igs": ["application/iges", "model/iges"], ".ima": ["application/x-ima"], ".imap": ["application/x-httpd-imap"], ".inf": ["application/inf"], ".ins": ["application/x-internett-signup"], ".ip": ["application/x-ip2"], ".isu": ["video/x-isvideo"], ".it": ["audio/it"], ".iv": ["application/x-inventor"], ".ivr": ["i-world/i-vrml"], ".ivy": ["application/x-livescreen"], ".jam": ["audio/x-jam"], ".jav": ["text/plain", "text/x-java-source"], ".java": ["text/plain", "text/x-java-source"], ".jcm": ["application/x-java-commerce"], ".jfif": ["image/jpeg", "image/pjpeg"], ".jfif-tbnl": ["image/jpeg"], ".jpe": ["image/jpeg", "image/pjpeg"], ".jpeg": ["image/jpeg", "image/pjpeg"], ".jpg": ["image/jpeg", "image/pjpeg"], ".jps": ["image/x-jps"], ".js": ["application/x-javascript", "application/javascript", "application/ecmascript", "text/javascript", "text/ecmascript"], ".jut": ["image/jutvision"], ".kar": ["audio/midi", "music/x-karaoke"], ".ksh": ["application/x-ksh", "text/x-script.ksh"], ".la": ["audio/nspaudio", "audio/x-nspaudio"], ".lam": ["audio/x-liveaudio"], ".latex": ["application/x-latex"], ".lha": ["application/lha", "application/octet-stream", "application/x-lha"], ".lhx": ["application/octet-stream"], ".list": ["text/plain"], ".lma": ["audio/nspaudio", "audio/x-nspaudio"], ".log": ["text/plain"], ".lsp": ["application/x-lisp", "text/x-script.lisp"], ".lst": ["text/plain"], ".lsx": ["text/x-la-asf"], ".ltx": ["application/x-latex"], ".lzh": ["application/octet-stream", "application/x-lzh"], ".lzx": ["application/lzx", "application/octet-stream", "application/x-lzx"], ".m": ["text/plain", "text/x-m"], ".m1v": ["video/mpeg"], ".m2a": ["audio/mpeg"], ".m2v": ["video/mpeg"], ".m3u": ["audio/x-mpequrl"], ".man": ["application/x-troff-man"], ".map": ["application/x-navimap"], ".mar": ["text/plain"], ".mbd": ["application/mbedlet"], ".mc$": ["application/x-magic-cap-package-1.0"], ".mcd": ["application/mcad", "application/x-mathcad"], ".mcf": ["image/vasa", "text/mcf"], ".mcp": ["application/netmc"], ".me": ["application/x-troff-me"], ".mht": ["message/rfc822"], ".mhtml": ["message/rfc822"], ".mid": ["application/x-midi", "audio/midi", "audio/x-mid", "audio/x-midi", "music/crescendo", "x-music/x-midi"], ".midi": ["application/x-midi", "audio/midi", "audio/x-mid", "audio/x-midi", "music/crescendo", "x-music/x-midi"], ".mif": ["application/x-frame", "application/x-mif"], ".mime": ["message/rfc822", "www/mime"], ".mjf": ["audio/x-vnd.audioexplosion.mjuicemediafile"], ".mjpg": ["video/x-motion-jpeg"], ".mm": ["application/base64", "application/x-meme"], ".mme": ["application/base64"], ".mod": ["audio/mod", "audio/x-mod"], ".moov": ["video/quicktime"], ".mov": ["video/quicktime"], ".movie": ["video/x-sgi-movie"], ".mp2": ["audio/mpeg", "audio/x-mpeg", "video/mpeg", "video/x-mpeg", "video/x-mpeq2a"], ".mp3": ["audio/mpeg3", "audio/x-mpeg-3", "video/mpeg", "video/x-mpeg"], ".mpa": ["audio/mpeg", "video/mpeg"], ".mpc": ["application/x-project"], ".mpe": ["video/mpeg"], ".mpeg": ["video/mpeg"], ".mpg": ["audio/mpeg", "video/mpeg"], ".mpga": ["audio/mpeg"], ".mpp": ["application/vnd.ms-project"], ".mpt": ["application/x-project"], ".mpv": ["application/x-project"], ".mpx": ["application/x-project"], ".mrc": ["application/marc"], ".ms": ["application/x-troff-ms"], ".mv": ["video/x-sgi-movie"], ".my": ["audio/make"], ".mzz": ["application/x-vnd.audioexplosion.mzz"], ".nap": ["image/naplps"], ".naplps": ["image/naplps"], ".nc": ["application/x-netcdf"], ".ncm": ["application/vnd.nokia.configuration-message"], ".nif": ["image/x-niff"], ".niff": ["image/x-niff"], ".nix": ["application/x-mix-transfer"], ".nsc": ["application/x-conference"], ".nvd": ["application/x-navidoc"], ".o": ["application/octet-stream"], ".oda": ["application/oda"], ".omc": ["application/x-omc"], ".omcd": ["application/x-omcdatamaker"], ".omcr": ["application/x-omcregerator"], ".p": ["text/x-pascal"], ".p10": ["application/pkcs10", "application/x-pkcs10"], ".p12": ["application/pkcs-12", "application/x-pkcs12"], ".p7a": ["application/x-pkcs7-signature"], ".p7c": ["application/pkcs7-mime", "application/x-pkcs7-mime"], ".p7m": ["application/pkcs7-mime", "application/x-pkcs7-mime"], ".p7r": ["application/x-pkcs7-certreqresp"], ".p7s": ["application/pkcs7-signature"], ".part": ["application/pro_eng"], ".pas": ["text/pascal"], ".pbm": ["image/x-portable-bitmap"], ".pcl": ["application/vnd.hp-pcl", "application/x-pcl"], ".pct": ["image/x-pict"], ".pcx": ["image/x-pcx"], ".pdb": ["chemical/x-pdb"], ".pdf": ["application/pdf"], ".pfunk": ["audio/make", "audio/make.my.funk"], ".pgm": ["image/x-portable-graymap", "image/x-portable-greymap"], ".pic": ["image/pict"], ".pict": ["image/pict"], ".pkg": ["application/x-newton-compatible-pkg"], ".pko": ["application/vnd.ms-pki.pko"], ".pl": ["text/plain", "text/x-script.perl"], ".plx": ["application/x-pixclscript"], ".pm": ["image/x-xpixmap", "text/x-script.perl-module"], ".pm4": ["application/x-pagemaker"], ".pm5": ["application/x-pagemaker"], ".png": ["image/png"], ".pnm": ["application/x-portable-anymap", "image/x-portable-anymap"], ".pot": ["application/mspowerpoint", "application/vnd.ms-powerpoint"], ".pov": ["model/x-pov"], ".ppa": ["application/vnd.ms-powerpoint"], ".ppm": ["image/x-portable-pixmap"], ".pps": ["application/mspowerpoint", "application/vnd.ms-powerpoint"], ".ppt": ["application/mspowerpoint", "application/powerpoint", "application/vnd.ms-powerpoint", "application/x-mspowerpoint"], ".ppz": ["application/mspowerpoint"], ".pre": ["application/x-freelance"], ".prt": ["application/pro_eng"], ".ps": ["application/postscript"], ".psd": ["application/octet-stream"], ".pvu": ["paleovu/x-pv"], ".pwz": ["application/vnd.ms-powerpoint"], ".py": ["text/x-script.phyton"], ".pyc": ["application/x-bytecode.python"], ".qcp": ["audio/vnd.qcelp"], ".qd3": ["x-world/x-3dmf"], ".qd3d": ["x-world/x-3dmf"], ".qif": ["image/x-quicktime"], ".qt": ["video/quicktime"], ".qtc": ["video/x-qtc"], ".qti": ["image/x-quicktime"], ".qtif": ["image/x-quicktime"], ".ra": ["audio/x-pn-realaudio", "audio/x-pn-realaudio-plugin", "audio/x-realaudio"], ".ram": ["audio/x-pn-realaudio"], ".ras": ["application/x-cmu-raster", "image/cmu-raster", "image/x-cmu-raster"], ".rast": ["image/cmu-raster"], ".rexx": ["text/x-script.rexx"], ".rf": ["image/vnd.rn-realflash"], ".rgb": ["image/x-rgb"], ".rm": ["application/vnd.rn-realmedia", "audio/x-pn-realaudio"], ".rmi": ["audio/mid"], ".rmm": ["audio/x-pn-realaudio"], ".rmp": ["audio/x-pn-realaudio", "audio/x-pn-realaudio-plugin"], ".rng": ["application/ringing-tones", "application/vnd.nokia.ringing-tone"], ".rnx": ["application/vnd.rn-realplayer"], ".roff": ["application/x-troff"], ".rp": ["image/vnd.rn-realpix"], ".rpm": ["audio/x-pn-realaudio-plugin"], ".rt": ["text/richtext", "text/vnd.rn-realtext"], ".rtf": ["application/rtf", "application/x-rtf", "text/richtext"], ".rtx": ["application/rtf", "text/richtext"], ".rv": ["video/vnd.rn-realvideo"], ".s": ["text/x-asm"], ".s3m": ["audio/s3m"], ".saveme": ["application/octet-stream"], ".sbk": ["application/x-tbook"], ".scm": ["application/x-lotusscreencam", "text/x-script.guile", "text/x-script.scheme", "video/x-scm"], ".sdml": ["text/plain"], ".sdp": ["application/sdp", "application/x-sdp"], ".sdr": ["application/sounder"], ".sea": ["application/sea", "application/x-sea"], ".set": ["application/set"], ".sgm": ["text/sgml", "text/x-sgml"], ".sgml": ["text/sgml", "text/x-sgml"], ".sh": ["application/x-bsh", "application/x-sh", "application/x-shar", "text/x-script.sh"], ".shar": ["application/x-bsh", "application/x-shar"], ".shtml": ["text/html", "text/x-server-parsed-html"], ".sid": ["audio/x-psid"], ".sit": ["application/x-sit", "application/x-stuffit"], ".skd": ["application/x-koan"], ".skm": ["application/x-koan"], ".skp": ["application/x-koan"], ".skt": ["application/x-koan"], ".sl": ["application/x-seelogo"], ".smi": ["application/smil"], ".smil": ["application/smil"], ".snd": ["audio/basic", "audio/x-adpcm"], ".sol": ["application/solids"], ".spc": ["application/x-pkcs7-certificates", "text/x-speech"], ".spl": ["application/futuresplash"], ".spr": ["application/x-sprite"], ".sprite": ["application/x-sprite"], ".src": ["application/x-wais-source"], ".ssi": ["text/x-server-parsed-html"], ".ssm": ["application/streamingmedia"], ".sst": ["application/vnd.ms-pki.certstore"], ".step": ["application/step"], ".stl": ["application/sla", "application/vnd.ms-pki.stl", "application/x-navistyle"], ".stp": ["application/step"], ".sv4cpio": ["application/x-sv4cpio"], ".sv4crc": ["application/x-sv4crc"], ".svf": ["image/vnd.dwg", "image/x-dwg"], ".svr": ["application/x-world", "x-world/x-svr"], ".swf": ["application/x-shockwave-flash"], ".t": ["application/x-troff"], ".talk": ["text/x-speech"], ".tar": ["application/x-tar"], ".tbk": ["application/toolbook", "application/x-tbook"], ".tcl": ["application/x-tcl", "text/x-script.tcl"], ".tcsh": ["text/x-script.tcsh"], ".tex": ["application/x-tex"], ".texi": ["application/x-texinfo"], ".texinfo": ["application/x-texinfo"], ".text": ["application/plain", "text/plain"], ".tgz": ["application/gnutar", "application/x-compressed"], ".tif": ["image/tiff", "image/x-tiff"], ".tiff": ["image/tiff", "image/x-tiff"], ".tr": ["application/x-troff"], ".tsi": ["audio/tsp-audio"], ".tsp": ["application/dsptype", "audio/tsplayer"], ".tsv": ["text/tab-separated-values"], ".turbot": ["image/florian"], ".txt": ["text/plain"], ".uil": ["text/x-uil"], ".uni": ["text/uri-list"], ".unis": ["text/uri-list"], ".unv": ["application/i-deas"], ".uri": ["text/uri-list"], ".uris": ["text/uri-list"], ".ustar": ["application/x-ustar", "multipart/x-ustar"], ".uu": ["application/octet-stream", "text/x-uuencode"], ".uue": ["text/x-uuencode"], ".vcd": ["application/x-cdlink"], ".vcs": ["text/x-vcalendar"], ".vda": ["application/vda"], ".vdo": ["video/vdo"], ".vew": ["application/groupwise"], ".viv": ["video/vivo", "video/vnd.vivo"], ".vivo": ["video/vivo", "video/vnd.vivo"], ".vmd": ["application/vocaltec-media-desc"], ".vmf": ["application/vocaltec-media-file"], ".voc": ["audio/voc", "audio/x-voc"], ".vos": ["video/vosaic"], ".vox": ["audio/voxware"], ".vqe": ["audio/x-twinvq-plugin"], ".vqf": ["audio/x-twinvq"], ".vql": ["audio/x-twinvq-plugin"], ".vrml": ["application/x-vrml", "model/vrml", "x-world/x-vrml"], ".vrt": ["x-world/x-vrt"], ".vsd": ["application/x-visio"], ".vst": ["application/x-visio"], ".vsw": ["application/x-visio"], ".w60": ["application/wordperfect6.0"], ".w61": ["application/wordperfect6.1"], ".w6w": ["application/msword"], ".wav": ["audio/wav", "audio/x-wav"], ".wb1": ["application/x-qpro"], ".wbmp": ["image/vnd.wap.wbmp"], ".web": ["application/vnd.xara"], ".wiz": ["application/msword"], ".wk1": ["application/x-123"], ".wmf": ["windows/metafile"], ".wml": ["text/vnd.wap.wml"], ".wmlc": ["application/vnd.wap.wmlc"], ".wmls": ["text/vnd.wap.wmlscript"], ".wmlsc": ["application/vnd.wap.wmlscriptc"], ".word": ["application/msword"], ".wp": ["application/wordperfect"], ".wp5": ["application/wordperfect", "application/wordperfect6.0"], ".wp6": ["application/wordperfect"], ".wpd": ["application/wordperfect", "application/x-wpwin"], ".wq1": ["application/x-lotus"], ".wri": ["application/mswrite", "application/x-wri"], ".wrl": ["application/x-world", "model/vrml", "x-world/x-vrml"], ".wrz": ["model/vrml", "x-world/x-vrml"], ".wsc": ["text/scriplet"], ".wsrc": ["application/x-wais-source"], ".wtk": ["application/x-wintalk"], ".xbm": ["image/x-xbitmap", "image/x-xbm", "image/xbm"], ".xdr": ["video/x-amt-demorun"], ".xgz": ["xgl/drawing"], ".xif": ["image/vnd.xiff"], ".xl": ["application/excel"], ".xla": ["application/excel", "application/x-excel", "application/x-msexcel"], ".xlb": ["application/excel", "application/vnd.ms-excel", "application/x-excel"], ".xlc": ["application/excel", "application/vnd.ms-excel", "application/x-excel"], ".xld": ["application/excel", "application/x-excel"], ".xlk": ["application/excel", "application/x-excel"], ".xll": ["application/excel", "application/vnd.ms-excel", "application/x-excel"], ".xlm": ["application/excel", "application/vnd.ms-excel", "application/x-excel"], ".xls": ["application/excel", "application/vnd.ms-excel", "application/x-excel", "application/x-msexcel"], ".xlt": ["application/excel", "application/x-excel"], ".xlv": ["application/excel", "application/x-excel"], ".xlw": ["application/excel", "application/vnd.ms-excel", "application/x-excel", "application/x-msexcel"], ".xm": ["audio/xm"], ".xml": ["application/xml", "text/xml"], ".xmz": ["xgl/movie"], ".xpix": ["application/x-vnd.ls-xpix"], ".xpm": ["image/x-xpixmap", "image/xpm"], ".x-png": ["image/png"], ".xsr": ["video/x-amt-showrun"], ".xwd": ["image/x-xwd", "image/x-xwindowdump"], ".xyz": ["chemical/x-pdb"], ".z": ["application/x-compress", "application/x-compressed"], ".zip": ["application/x-compressed", "application/x-zip-compressed", "application/zip", "multipart/x-zip"], ".zoo": ["application/octet-stream"], ".zsh": ["text/x-script.zsh"] }
    };
    window.methods_js = {
        "build": {
            /**
             * @description [Inserts provided string|number at provided index.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String|Number} [The provided string|number to insert.]
             *  @2 {Number} [The provided insertion index.]
             * @return {String} [The string with the inserted substring.]
             */
            "insert": function(args) {
                return this.substr(0, args[2]).str_build("!join", args[1], this.substr(args[2]));
            },
            /**
             * @description [Joins provided substrings with current string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1::Infinity {String|Number} [The N amount of strings to join.]
             * @return {String} [The joined string.]
             */
            "join": function(args) {
                // create an array to store substrings and join later
                var parts = [this];
                for (var i = 1, l = args.length; i < l; i++) {
                    parts.push(args[i]);
                }
                return parts.join("");
            },
            /**
             * @description [Prepend provided substrings to current string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1::Infinity {String|Number} [The N amount of strings|numbers to prepend.]
             * @return {String} [The prepended to string.]
             */
            "prepend": function(args) {
                var substrings = [],
                    i = args.length--;
                while (i > 0) {
                    substrings.push(args[i]);
                    i--;
                }
                return substrings.join("").str_build("!join", this);
            },
            /**
             * @description [Wraps string with the provided left and right stirngs|numbers.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1::Infinity {String|Number} [The string|number to wrap left side with.]
             *  @2::Infinity {String|Number} [The string|number to wrap right side with.]
             * @return {String} [The wrapped string.]
             */
            "wrap": function(args) {
                return (args[1] || "").str_build("!join", this, (args[2] || ""));
            }
        },
        "clear": {
            /**
             * @description [Removes extra space in HTML string.]
             * @return {String} [The cleaned out HTML string.]
             */
            "html": function() {
                return this.trim().str_replace("!raw", {
                    "0": ["><", /\>[\s\xa0]+</, "g"],
                    "1": [">", /[\s\xa0]+>/, "g"], // <div id="main"  > => <div id="mane">
                    "2": ["<", /<[\s\xa0]+/, "g"], // <     div id="main"> => <div id="mane">
                    "3": ["</", /<\/[\s\xa0]+/, "g"] // dfsdfsd</   div>" => dfsdfsd</div>"
                });
            },
            /**
             * @description [Removes extra space in a regular string.]
             * @return {String} [The cleaned out string.]
             */
            "space": function() {
                // http://stringjs.com
                // http://www.javascripter.net/faq/regularexpressionsyntax.htm
                return this.replace(/[\s\xa0]+/g, " ").trim();
            }
        },
        "convert": {
            /**
             * @description [Expands provided range.]
             * @return {String} [The expanded range.]
             */
            "num::range": function() {
                var parts = this.split("::"),
                    start = +parts[0],
                    end = +parts[1],
                    numbers = [];
                for (var i = start, l = end + 1; i < l; i++) numbers.push(i + ",");
                return numbers.join("").str_chomp("!right", ",");
            },
            /**
             * @description [Converts provided binary string to an octal string.]
             * @return {String} [The octal number in string format.]
             */
            "bin::oct": function() {
                // given "number" must be a string.. just make sure
                var string = this + "";
                // must only contain 1 and 0s and/or a single dot
                if (!string.str_is("!binary")) return NaN;
                // get the number pars
                var parts = string.str_split("!num", true),
                    number = parts[0] || "0",
                    decimal = parts[1] || "0",
                    is_negative = parts[2];
                var f = function(num, pad_dir, is_number, dec, is_neg) {
                    // make sure the string is a multiple of three
                    // http://stackoverflow.com/questions/3254047/round-number-up-to-the-nearest-multiple-of-3
                    // seprate into groups of three
                    var len = num.length;
                    if (len % 3 !== 0) {
                        // we need to padd the num
                        var pad_count = (Math.ceil(len / 3.0) * 3) - len;
                        num = num.str_pad(pad_dir, pad_count, "0");
                    }
                    // chop the num into chunks of 3 chars
                    var groups = num.str_split("!chunk", 3);
                    // loop through each finding its octal equivalent
                    var octal_equivalents = ["000", "001", "010", "011", "100", "101", "110", "111"],
                        final_oct = [];
                    for (var i = 0, l = groups.length; i < l; i++) {
                        // https://www.youtube.com/watch?v=W_NpD248CdE
                        final_oct.push("" + octal_equivalents.indexOf(groups[i]));
                    }
                    if (!is_number) { // the decimal
                        var decimal_part = final_oct.join("");
                        return (decimal_part.str_replace("!all", {
                            "0": ""
                        }) === "") ? "0" : decimal_part.str_replace("!right", "0", "");
                    } else { // for the decimal; is_number===true
                        var number_part = final_oct.join("").str_replace("!left", "0", ""),
                            sign = (((number_part === "" && dec !== "0") || is_neg) ? "-" : ""),
                            seperator = (dec === "0" ? "" : ".");
                        var final_num = sign.str_build("!join", (number_part === "" ? "0" : number_part), seperator, (dec === "0" ? "" : dec));
                        return ((final_num === "" || final_num === "-0") ? "0" : final_num);
                    }
                };
                return f(number, "!left", true, decimal = f(decimal, "!right", false) /*the decimal*/ , is_negative);
            },
            /**
             * @description [Converts provided binary string to a decimal string.]
             * @return {String} [The decimal number in string format.]
             */
            "bin::dec": function() {
                // given "number" must be a string.. just make sure
                var string = this + "";
                // must only contain 1 and 0s and/or a single dot
                if (!string.str_is("!binary")) return NaN;
                // get the number parts
                var parts = string.str_split("!num", true),
                    number = parts[0],
                    decimal = parts[1],
                    is_negative = parts[2];
                var f = function(num, is_number, dec, is_neg) {
                    num = num.split("");
                    var sum = 0;
                    if (is_number) {
                        var pow = num.length - 1;
                        for (var i = 0, l = num.length; i < l; i++) {
                            // starts from the right at 0, goes to the left
                            if (num[i] === "1") sum += Math.pow(2, pow);
                            pow--;
                        }
                        num = sum + "";
                    } else { // the decimal
                        var pow = 1;
                        for (var i = 0, l = num.length; i < l; i++) {
                            if (num[i] === "1") {
                                // starting from the left with -1, goes to the right
                                // https://www.youtube.com/watch?v=cQD3KRPOKNI
                                sum += Math.pow(2, -pow);
                            }
                            pow++;
                        }
                        // remove the leading 0
                        num = ((sum + "").str_chomp("!left", "0."));
                    }
                    if (!is_number) { // the decimal
                        var decimal_part = num;
                        return (decimal_part.str_replace("!all", {
                            "0": ""
                        }) === "") ? "0" : decimal_part.str_replace("!right", "0", "");
                    } else { // for the decimal; is_number===true
                        var number_part = num.str_replace("!left", "0", ""),
                            sign = (((number_part === "" && dec !== "0") || is_neg) ? "-" : ""),
                            seperator = (dec === "0" ? "" : ".");
                        var final_num = sign.str_build("!join", (number_part === "" ? "0" : number_part), seperator, (dec === "0" ? "" : dec));
                        return ((final_num === "" || final_num === "-0") ? "0" : final_num);
                    }
                };
                return f(number, true, decimal = f(decimal, false) /*the decimal*/ , is_negative);
            },
            /**
             * @description [Converts provided binary string to a hexadecimal string.]
             * @return {String} [The hexadecimal number in string format.]
             */
            "bin::hex": function() {
                // given "number" must be a string.. just make sure
                var string = this + "";
                // must only contain 1 and 0s and/or a single dot
                if (!string.str_is("!binary")) return NaN;
                // get the number pars
                var parts = string.str_split("!num", true),
                    number = parts[0],
                    decimal = parts[1],
                    is_negative = parts[2];
                var f = function(num, pad_dir, is_number, dec, is_neg) {
                    // make sure the string is a multiple of three
                    // http://stackoverflow.com/questions/3254047/round-number-up-to-the-nearest-multiple-of-3
                    // seprate into groups of three
                    var len = num.length;
                    if (len % 4 !== 0) {
                        // we need to padd the num
                        var pad_count = (Math.ceil(len / 4.0) * 4) - len;
                        num = num.str_pad(pad_dir, pad_count, "0");
                    }
                    // chop the num into chunks of 3 chars
                    var groups = num.str_split("!chunk", 4);
                    // loop through each finding its octal equivalent
                    var hex_list = "0123456789ABCDEF",
                        final_hex = [];
                    for (var i = 0, l = groups.length; i < l; i++) {
                        // https://www.youtube.com/watch?v=W_NpD248CdE
                        var sum_inner = 0,
                            pow_inner = 3,
                            c = groups[i];
                        for (var j = 0; j < 4; j++) {
                            if (c[j] === "1") {
                                sum_inner += Math.pow(2, pow_inner);
                            }
                            pow_inner--;
                        }
                        final_hex.push(hex_list.charAt(sum_inner));
                    }
                    if (!is_number) { // the decimal
                        var decimal_part = final_hex.join("");
                        return (decimal_part.str_replace("!all", {
                            "0": ""
                        }) === "") ? "0" : decimal_part.str_replace("!right", "0", "");
                    } else { // for the decimal; is_number===true
                        var number_part = final_hex.join("").str_replace("!left", "0", ""),
                            sign = (((number_part === "" && dec !== "0") || is_neg) ? "-" : ""),
                            seperator = (dec === "0" ? "" : ".");
                        var final_num = sign.str_build("!join", (number_part === "" ? "0" : number_part), seperator, (dec === "0" ? "" : dec));
                        return ((final_num === "" || final_num === "-0") ? "0" : final_num);
                    }
                };
                return f(number, "!left", true, decimal = f(decimal, "!right", false) /*the decimal*/ , is_negative);
            },
            /**
             * @description [Converts provided decimal string to a binary string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The amount of decimals to use. (15 is the default decimal)]
             *  @2 {Number} [The base of conversion to use. (2 (binary is of base 2) is the default)]
             * @return {String} [The binary number in string format.]
             */
            "dec::bin": function(args) {
                var error_limit = args[1],
                    base_of = args[2] || 2;
                // given "number" must be a string.. just make sure
                var string = this + "";
                // must only contain 1 and 0s and/or a single dot
                if (!string.str_is("!digit")) return NaN;
                // get the number pars
                var parts = string.str_split("!num", true),
                    number = parts[0],
                    decimal = parts[1],
                    is_negative = parts[2];
                var f = function(num, is_number, dec, is_neg) {
                    if (is_number) {
                        // ex. 40.25 => 50.2
                        // find the max placevalue
                        var list = [];
                        for (var i = 0;; i++) {
                            var pow = Math.pow(base_of, i);
                            list.push(pow);
                            if (num <= pow) break;
                        }
                        var octal_array = [],
                            c;
                        for (var i = list.length - 1; i > -1; i--) {
                            c = list[i];
                            octal_array.push((Math.floor(num / c)) + "");
                            num = num % c;
                        }
                        if (base_of !== 16) num = octal_array.join("").str_replace("!left", "0", "");
                        else {
                            // loop through and replace A-F
                            var hex_list = "0123456789ABCDEF",
                                hex_array = [];
                            for (var i = 0, l = octal_array.length; i < l; i++) {
                                hex_array.push(hex_list.charAt(octal_array[i]));
                            }
                            num = hex_array.join("").replace(/^0+/g, "");
                        }
                    } else {
                        num = +("0." + (num + ""));
                        var dec_list = [],
                            dec;
                        // get the decimal
                        // http://stackoverflow.com/questions/22759609/javascript-more-accurate-value-of-pi
                        // javascript has a 15 length limit for decimals
                        // but because this is our model we can go as far as the use wants...
                        // the number will, however, be cut back to 10-15 when converted to a number
                        for (var limit = (error_limit || 15); limit > 0; limit--) {
                            // formula (decimal * b).str_split("!num", true);
                            dec = ("" + (num * base_of)).str_split("!num", true);
                            num = +("0." + dec[1]);
                            dec_list.push(dec[0] + "");
                        }
                        if (base_of !== 16) num = dec_list.join("");
                        else {
                            // proof of validation; PI example works
                            // http://stackoverflow.com/questions/20650954/how-to-convert-decimal-fractions-to-hexadecimal-fractions
                            // loop through and replace A-F
                            var hex_list = "0123456789ABCDEF";
                            var hex_array = [];
                            for (var i = 0, l = dec_list.length; i < l; i++) {
                                hex_array.push(hex_list.charAt(dec_list[i]));
                            }
                            num = hex_array.join("");
                        }
                        // remove the traling 0's
                        num = num.str_replace("!right", "0", "");
                    }
                    if (!is_number) { // the decimal
                        var decimal_part = num;
                        return (decimal_part.str_replace("!all", {
                            "0": ""
                        }) === "") ? "0" : decimal_part.str_replace("!right", "0", "");
                    } else { // for the decimal; is_number===true
                        var number_part = num.str_replace("!left", "0", ""),
                            sign = (((number_part === "" && dec !== "0") || is_neg) ? "-" : ""),
                            seperator = (dec === "0" ? "" : ".");
                        var final_num = sign.str_build("!join", (number_part === "" ? "0" : number_part), seperator, (dec === "0" ? "" : dec));
                        return ((final_num === "" || final_num === "-0") ? "0" : final_num);
                    }
                };
                return f(number, true, decimal = f(decimal, false) /*the decimal*/ , is_negative);
            },
            /**
             * @description [Converts provided decimal string to an octal string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The amount of decimals to use. (15 is the default decimal)]
             * @return {String} [The octal number in string format.]
             */
            "dec::oct": function(args) {
                return this.str_convert("!dec::bin", args[1] /*error_limit*/ , 8);
            },
            /**
             * @description [Converts provided decimal string to a hexadecimal string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The amount of decimals to use. (15 is the default decimal)]
             * @return {String} [The hexadecimal number in string format.]
             */
            "dec::hex": function(args) {
                return this.str_convert("!dec::bin", args[1] /*error_limit*/ , 16);
            },
            /**
             * @description [Converts provided octal string to a binary string.]
             * @return {String} [The binary number in string format.]
             */
            "oct::bin": function() {
                // given "number" must be a string.. just make sure
                var string = this + "";
                // must only contain numbers 0-7 and/or a single dot
                if (!string.str_is("!octal")) return NaN;
                // get the number parts
                var parts = string.str_split("!num", true),
                    number = parts[0],
                    decimal = parts[1],
                    is_negative = parts[2];
                var f = function(num, is_number, dec, is_neg) {
                    var groups = num.split("");
                    // loop through each finding its octal equivalent
                    var octal_equivalents = ["000", "001", "010", "011", "100", "101", "110", "111"],
                        final_oct = [];
                    for (var i = 0, l = groups.length; i < l; i++) {
                        // https://www.youtube.com/watch?v=9jho2TkH6AU
                        final_oct.push(octal_equivalents[groups[i]]);
                    }
                    if (!is_number) { // the decimal
                        var decimal_part = final_oct.join("");
                        return (decimal_part.str_replace("!all", {
                            "0": ""
                        }) === "") ? "0" : decimal_part.str_replace("!right", "0", "");
                    } else { // for the decimal; is_number===true
                        var number_part = final_oct.join("").str_replace("!left", "0", ""),
                            sign = (((number_part === "" && dec !== "0") || is_neg) ? "-" : ""),
                            seperator = (dec === "0" ? "" : ".");
                        var final_num = sign.str_build("!join", (number_part === "" ? "0" : number_part), seperator, (dec === "0" ? "" : dec));
                        return ((final_num === "" || final_num === "-0") ? "0" : final_num);
                    }
                };
                return f(number, true, decimal = f(decimal, false) /*the decimal*/ , is_negative);
            },
            /**
             * @description [Converts provided octal string to a decimal string.]
             * @return {String} [The decimal number in string format.]
             */
            "oct::dec": function() {
                // given "number" must be a string.. just make sure
                var string = this + "";
                // must only contain numbers 0-7 and/or a single dot
                if (!string.str_is("!octal")) return NaN;
                // get the number pars
                var parts = string.str_split("!num", true),
                    number = parts[0],
                    decimal = parts[1],
                    is_negative = parts[2];
                var f = function(num, is_number, dec, is_neg) {
                    if (is_number) {
                        num = num.split("");
                        // loop through each finding its octal equivalent
                        var final_number = 0,
                            pow = num.length - 1;
                        for (var i = 0, l = num.length; i < l; i++) {
                            // https://www.youtube.com/watch?v=9jho2TkH6AU
                            final_number += (+num[i]) * Math.pow(8, pow);
                            pow--;
                        }
                        num = final_number + "";
                    } else { // the decimal
                        // now we find the decimal
                        // decimal = (decimal+"").split(".")[1];
                        var final_number = 0,
                            pow = 1;
                        for (var i = 0, l = num.length; i < l; i++) {
                            // https://www.youtube.com/watch?v=QIkfAkcfy0w
                            // formula (n * b^-counter )
                            final_number += (+num[i]) * Math.pow(8, -pow);
                            pow++;
                        }
                        // remove the leading 0
                        num = (final_number + "").str_chomp("!left", "0.");
                        // num = (final_number+"").str_split("!num")[1];
                    }
                    if (!is_number) { // the decimal
                        var decimal_part = num;
                        return (decimal_part.str_replace("!all", {
                            "0": ""
                        }) === "") ? "0" : decimal_part.str_replace("!right", "0", "");
                    } else { // for the decimal; is_number===true
                        var number_part = num.str_replace("!left", "0", ""),
                            sign = (((number_part === "" && dec !== "0") || is_neg) ? "-" : ""),
                            seperator = (dec === "0" ? "" : ".");
                        var final_num = sign.str_build("!join", (number_part === "" ? "0" : number_part), seperator, (dec === "0" ? "" : dec));
                        return ((final_num === "" || final_num === "-0") ? "0" : final_num);
                    }
                };
                return f(number, true, decimal = f(decimal, false) /*the decimal*/ , is_negative);
            },
            /**
             * @description [Converts provided octal string to a hexadecimal string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The amount of decimals to use. (15 is the default decimal)]
             * @return {String} [The hexadecimal number in string format.]
             */
            "oct::hex": function(args) {
                var error_limit = args[1];
                // turn to binary then from binary to hex
                return this.str_convert("!oct::bin", error_limit).str_convert("!bin::hex", error_limit);
            },
            /**
             * @description [Converts provided hexadecimal string to a binary string.]
             * @return {String} [The binary number in string format.]
             */
            "hex::bin": function() {
                // given "number" must be a string.. just make sure
                var string = this + "";
                // must only contain 1 and 0s and/or a single dot
                if (!string.str_is("!hex")) return NaN;
                // get the number pars
                var parts = string.str_split("!num", true),
                    number = parts[0],
                    decimal = parts[1],
                    is_negative = parts[2];
                // check if number starts with a negative
                if (is_negative) string = string.str_chomp("!left", 1);
                var f = function(num, is_number, dec, is_neg) {
                    var list = num.toUpperCase().split("");
                    // loop through each finding its octal equivalent
                    var hex_list = "0123456789ABCDEF",
                        final_hex = [];
                    for (var i = 0, l = list.length; i < l; i++) {
                        // https://www.youtube.com/watch?v=W_NpD248CdE
                        var sum_inner = "",
                            pow_inner = 3,
                            c = hex_list.indexOf(list[i]);
                        for (var j = 0; j < 4; j++) {
                            var x = Math.floor(c / Math.pow(2, pow_inner));
                            if (x === 1) {
                                sum_inner += "1";
                                c -= Math.pow(2, pow_inner);
                            } else {
                                sum_inner += "0";
                            }
                            pow_inner--;
                        }
                        final_hex.push(sum_inner);
                    }
                    if (!is_number) { // the decimal
                        var decimal_part = final_hex.join("");
                        return (decimal_part.str_replace("!all", {
                            "0": ""
                        }) === "") ? "0" : decimal_part.str_replace("!right", "0", "");
                    } else { // for the decimal; is_number===true
                        var number_part = final_hex.join("").str_replace("!left", "0", ""),
                            sign = (((number_part === "" && dec !== "0") || is_neg) ? "-" : ""),
                            seperator = (dec === "0" ? "" : ".");
                        var final_num = sign.str_build("!join", (number_part === "" ? "0" : number_part), seperator, (dec === "0" ? "" : dec));
                        return ((final_num === "" || final_num === "-0") ? "0" : final_num);
                    }
                };
                return f(number, true, decimal = f(decimal, false) /*the decimal*/ , is_negative);
            },
            /**
             * @description [Converts provided hexadecimal string to a octal string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The amount of decimals to use. (15 is the default decimal)]
             * @return {String} [The octal number in string format.]
             */
            "hex::oct": function(args) {
                var error_limit = args[1];
                // convert to binary then from binary to octal
                return this.str_convert("!hex::bin", error_limit).str_convert("!bin::oct", error_limit);
            },
            /**
             * @description [Converts provided hexadecimal string to a decimal string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The amount of decimals to use. (15 is the default decimal)]
             * @return {String} [The decimal number in string format.]
             */
            "hex::dec": function(args) {
                var error_limit = args[1];
                // convert to binary then from binary to dec
                return this.str_convert("!hex::bin", error_limit).str_convert("!bin::dec", error_limit);
            },
            /**
             * @description [Converts 3 character hexadecimal color code into a 6 character color code.]
             * @return {String} [The expanded hexadecimal color code.]
             */
            "hex::six": function() {
                var string = this.str_chomp("!left", "#"),
                    char1 = string[0],
                    char2 = string[1],
                    char3 = string[2];
                return "#".str_build("!join", char1, char1, char2, char2, char3, char3);
            },
            /**
             * @description [Converts provided rgba to argb color code.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Boolean} [Flag indicating whether to return color code with hash symbol.]
             * @return {String} [The argb color code.]
             *
             * @sources http://rland.me.uk/cross-browser-alpha-transparent-background-10-2011/
             * @sources http://beijingyoung.com/articles/rgba-argb-converter/
             */
            "rgba::argb": function(args) {
                var string = this;
                // check wether a string or an array is supplied
                var type = Object.prototype.toString.call(string);
                if (type.str_is("!in", "String")) {
                    // parse the string into rgb parts
                    var rgb = string.str_parse("!rgb");
                    if (!rgb) return NaN; // could not parse the supplied rgb string
                } else if (type.str_is("!in", "Array")) {
                    var rgb = string;
                }
                var r = rgb[0],
                    g = rgb[1],
                    b = rgb[2],
                    a = rgb[3];
                // the alpha must be multiplied by 255 then converte to hex
                return (((args[1] /*add_hash*/ ) ? "#" : "") + (("" + (~~(a * 255))).str_convert("!dec::hex")) + ((r.str_convert("!dec::hex") || "00") + (g.str_convert("!dec::hex") || "00") + (b.str_convert("!dec::hex") || "00"))).replace(/\./g, "");
            },
            /**
             * @description [Converts provided argb to rgba color code.]
             * @return {String} [The rgba color code.]
             */
            "argb::rgba": function() {
                var string = this;
                // check that the strig supplied is in the #AARRGGBB format
                if (!string.str_is("!hexcolor8")) return false;
                // remove the #
                string = string.str_chomp("!left", "#");
                // split the string into groups of 2
                var groups = string.str_split("!chunk", 2);
                var a = groups[0],
                    r = groups[1],
                    g = groups[2],
                    b = groups[3];
                // the alpha must be multiplied by 255 then converte to hex
                return "rgba(".str_build("!join", (r.str_convert("!hex::dec") || "0"), ",", (g.str_convert("!hex::dec") || "0"), ",", (b.str_convert("!hex::dec") || "0"), ",", ~~((a.str_convert("!hex::dec") * 1) / 255), ")");
            },
            /**
             * @description [Converts provided rgba to hex color code.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Boolean} [Flag indicating whether to return color code with hash symbol.]
             * @return {String} [The hex color code.]
             */
            "rgb::hex": function(args) {
                var string = this;
                // check wether a string or an array is supplied
                var type = Object.prototype.toString.call(string);
                if (type.str_is("!in", "String")) {
                    // parse the string into rgb parts
                    var rgb = string.str_parse("!rgb");
                    if (!rgb) return NaN; // could not parse the supplied rgb string
                } else if (type.str_is("!in", "Array")) {
                    var rgb = string;
                }
                var r = rgb[0].str_convert("!dec::hex"),
                    g = rgb[1].str_convert("!dec::hex"),
                    b = rgb[2].str_convert("!dec::hex");
                if (r && r.length === 1) r = "0" + r;
                if (g && g.length === 1) g = "0" + g;
                if (b && b.length === 1) b = "0" + b;
                return ((args[1] /*add_hash*/ ) ? "#" : "").str_build("!join", (r || "00"), (g || "00"), (b || "00")); //.replace(/\./g, ""); BUG HERE
            },
            // take the rgb value e.g. 221 and divide by 16 => (221/16)
            // (221/16) and round down => Math.floor(221/16);
            // lookup the value in the list, in this case 13 => D
            // to get th second value we take find the remainder
            // for example, 221 - ((221/16) * 16)
            // then use the remainder to find the second value in the list
            /**
             * @description [Converts provided hex to rgb color code.]
             * @return {String} [The rgb color code.]
             */
            "hex::rgb": function(string) {
                var string = this;
                string = string.str_chomp("!left", "#");
                // hex string must be either 3 or 6 chars in length
                if (!string.str_length("!exact", 6)) {
                    // must be 3 then
                    if (!string.str_length("!exact", 3)) return NaN;
                }
                // format the string if length is 3
                if (string.str_length("!exact", 3)) string = string.str_convert("!hex::six");
                // chop into groups of 2
                var groups = string.str_split("!chunk", 2);
                // var groups = string.toString().str_split("!chunk", 2);
                return ("rgba(".str_build("!join", groups[0].str_convert("!hex::dec"), ",", groups[1].str_convert("!hex::dec"), ",", groups[2].str_convert("!hex::dec"), ",1)"));
            },
            // // http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
            // rgb_2_hsl = function() {
            //     // check wether a string or an array is supplied
            //     var type = Object.prototype.toString.call(string);
            //     if (type.str_is("!in", "String")) {
            //         // parse the string into rgb parts
            //         var rgb = string.str_parse("!rgb");
            //         if (!rgb) return NaN; // could not parse the supplied rgb string
            //     } else if (type.str_is("!in", "Array")) {
            //         var rgb = string;
            //     }
            //     var hue, saturation, luminace;
            //     // #1 Convert the RGB values to the range 0-1, this can be done by dividing the value by 255 for 8-bit color depth
            //     var r = (+rgb[0])/255,
            //         g = (+rgb[1])/255,
            //         b = (+rgb[2])/255;
            //     // #2 Find the minimum and maximum values of R, G and B.
            //     var min = Math.min(r, g, b),
            //         max = Math.max(r, g, b);
            //     // #3 Now calculate the Luminace value by adding the max and min values and divide by 2.
            //     luminace = (max + min)/2;
            //     // #4 The next step is to find the Saturation.
            //     // If the min and max value are the same, it means that there is no saturation.
            //     // If all RGB values are equal you have a shade of grey.
            //     // Depending on how bright it’s somewhere between black and white.
            //     // If there is no Saturation, we don’t need to calculate the Hue. So we set it to 0 degrees.
            //     if ( min === max ) {
            //         // no saturation or hue stop here and return
            //         hue = saturation = 0;
            //     }else {
            //     // #5 Now we know that there is Saturation we need to do check the level of the Luminance in order to select the correct formula.
            //     // If Luminance is smaller then 0.5, then Saturation = (max-min)/(max+min)
            //     // If Luminance is bigger then 0.5. then Saturation = ( max-min)/(2.0-max-min)
            //         saturation = ( luminace < 0.5 ) ? (max-min)/(max+min) : (max-min)/(2.0-max-min);
            //     // #6 Two done, one to go. We still need to calculate the Hue.
            //     // The Hue formula is depending on what RGB color channel is the max value. The three different formulas are:
            //     // If Red is max, then Hue = (G-B)/(max-min)
            //     // If Green is max, then Hue = 2.0 + (B-R)/(max-min)
            //     // If Blue is max, then Hue = 4.0 + (R-G)/(max-min)
            //     // The Hue value you get needs to be multiplied by 60 to convert it to degrees on the color circle
            //     // If Hue becomes negative you need to add 360 to, because a circle has 360 degrees.
            //     }
            //     return [hue, saturation, luminace];
            // }
            // http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
            // mirror: http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
            // https://github.com/mjackson/mjijackson.github.com/blob/master/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript.txt
            // ---
            // title: RGB to HSL and RGB to HSV Color Model Conversion Algorithms in JavaScript
            // author: Michael J. I. Jackson
            // published: 2008-02-10 16:01
            // updated: 2009-01-03 00:52
            // tags: [color, javascript]
            // ---
            // Here is a set of additive color model conversion algorithms that I found published on [Wikipedia][wp] and have implemented in JavaScript. It was surprisingly difficult to find these actually implemented anywhere in compact, efficient, and bug-free code, so I wrote my own. These should be easily portable to other programming languages if desired.
            // [wp]: http://en.wikipedia.org/wiki/HSL_color_space "HSL color space"
            /**
             * Converts an RGB color value to HSL. Conversion formula
             * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
             * Assumes r, g, and b are contained in the set [0, 255] and
             * returns h, s, and l in the set [0, 1].
             *
             * @param   Number  r       The red color value
             * @param   Number  g       The green color value
             * @param   Number  b       The blue color value
             * @return  Array           The HSL representation
             */
            /**
             * @description [Converts provided rgb to hsl color code.]
             * @return {String} [The hsl color code.]
             */
            "rgb::hsl": function() {
                var string = this;
                // check wether a string or an array is supplied
                var type = Object.prototype.toString.call(string);
                if (type.str_is("!in", "String")) {
                    // parse the string into rgb parts
                    var rgb = string.str_parse("!rgb");
                    if (!rgb) return NaN; // could not parse the supplied rgb string
                } else if (type.str_is("!in", "Array")) {
                    var rgb = string;
                }
                var r = (+rgb[0]) / 255,
                    g = (+rgb[1]) / 255,
                    b = (+rgb[2]) / 255;
                // r /= 255, g /= 255, b /= 255;
                var max = Math.max(r, g, b),
                    min = Math.min(r, g, b);
                var h, s, l = (max + min) / 2;
                if (max == min) {
                    h = s = 0; // achromatic
                } else {
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }
                    h /= 6;
                }
                // hue must be multiplied by 360 => The hue is the proportion of the distance around the edge of the hexagon which passes through the projected point, originally measured on the range [0, 1] but now typically measured in degrees [0°, 360°].
                // Saturation and Luminance are measured in percentages so simply multiply by 100
                return "hsl(".str_build("!join", (h * 360), ",", (s * 100), "%,", (l * 100), "%)");
            },
            /**
             * Converts an HSL color value to RGB. Conversion formula
             * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
             * Assumes h, s, and l are contained in the set [0, 1] and
             * returns r, g, and b in the set [0, 255].
             *
             * @param   Number  h       The hue
             * @param   Number  s       The saturation
             * @param   Number  l       The lightness
             * @return  Array           The RGB representation
             */
            /**
             * @description [Converts provided hsl to rgb color code.]
             * @return {String} [The rgb color code.]
             */
            "hsl::rgb": function() {
                var string = this;
                // check wether a string or an array is supplied
                var type = Object.prototype.toString.call(string);
                if (type.str_is("!in", "String")) {
                    // parse the string into rgb parts
                    var hsl = string.str_parse("!hsl");
                    if (!hsl) return NaN; // could not parse the supplied rgb string
                } else if (type.str_is("!in", "Array")) {
                    var hsl = string;
                }
                var h = (+hsl[0]) / 360,
                    s = (+hsl[1]) / 100,
                    l = (+hsl[2]) / 100;
                var r, g, b;
                if (s == 0) {
                    r = g = b = l; // achromatic
                } else {
                    var hue2rgb = function(p, q, t) {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                    };
                    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    var p = 2 * l - q;
                    r = hue2rgb(p, q, h + 1 / 3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1 / 3);
                }
                return "rgba(".str_build("!join", ~~(r * 255), ",", ~~(g * 255), ",", ~~(b * 255), ",1)");
                // return [r * 255, g * 255, b * 255];
            },
            // online calc reference http://www.rapidtables.com/convert/color/rgb-to-hsv.htm
            /**
             * Converts an RGB color value to HSV. Conversion formula
             * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
             * Assumes r, g, and b are contained in the set [0, 255] and
             * returns h, s, and v in the set [0, 1].
             *
             * @param   Number  r       The red color value
             * @param   Number  g       The green color value
             * @param   Number  b       The blue color value
             * @return  Array           The HSV representation
             */
            /**
             * @description [Converts provided rgb to hsv color code.]
             * @return {String} [The hsv color code.]
             */
            "rgb::hsv": function() {
                var string = this;
                // check wether a string or an array is supplied
                var type = Object.prototype.toString.call(string);
                if (type.str_is("!in", "String")) {
                    // parse the string into rgb parts
                    var rgb = string.str_parse("!rgb");
                    if (!rgb) return NaN; // could not parse the supplied rgb string
                } else if (type.str_is("!in", "Array")) {
                    var rgb = string;
                }
                var r = (+rgb[0]) / 255,
                    g = (+rgb[1]) / 255,
                    b = (+rgb[2]) / 255;
                // r = r/255, g = g/255, b = b/255;
                var max = Math.max(r, g, b),
                    min = Math.min(r, g, b);
                var h, s, v = max;
                var d = max - min;
                s = ((max === 0) ? 0 : d / max);
                if (max == min) {
                    h = 0; // achromatic
                } else {
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }
                    h /= 6;
                }
                // hue must be multiplied by 360 => The hue is the proportion of the distance around the edge of the hexagon which passes through the projected point, originally measured on the range [0, 1] but now typically measured in degrees [0°, 360°].
                // Saturation and Luminance are measured in percentages so simply multiply by 100
                return "hsv(".str_build("!join", (h * 360), ",", (s * 100), "%,", (v * 100), "%)");
            },
            /**
             * Converts an HSV color value to RGB. Conversion formula
             * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
             * Assumes h, s, and v are contained in the set [0, 1] and
             * returns r, g, and b in the set [0, 255].
             *
             * @param   Number  h       The hue
             * @param   Number  s       The saturation
             * @param   Number  v       The value
             * @return  Array           The RGB representation
             */
            /**
             * @description [Converts provided hsv to rgb color code.]
             * @return {String} [The rgb color code.]
             */
            "hsv::rgb": function() {
                var string = this;
                // check wether a string or an array is supplied
                var type = Object.prototype.toString.call(string);
                if (type.str_is("!in", "String")) {
                    // parse the string into rgb parts
                    var hsv = string.str_parse("!hsv");
                    if (!hsv) return NaN; // could not parse the supplied rgb string
                } else if (type.str_is("!in", "Array")) {
                    var hsv = string;
                }
                var h = (+hsv[0]) / 360,
                    s = (+hsv[1]) / 100,
                    v = (+hsv[2]) / 100;
                var r, g, b;
                var i = Math.floor(h * 6);
                var f = h * 6 - i;
                var p = v * (1 - s);
                var q = v * (1 - f * s);
                var t = v * (1 - (1 - f) * s);
                switch (i % 6) {
                    case 0:
                        r = v, g = t, b = p;
                        break;
                    case 1:
                        r = q, g = v, b = p;
                        break;
                    case 2:
                        r = p, g = v, b = t;
                        break;
                    case 3:
                        r = p, g = q, b = v;
                        break;
                    case 4:
                        r = t, g = p, b = v;
                        break;
                    case 5:
                        r = v, g = p, b = q;
                        break;
                }
                return "rgba(".str_build("!join", ~~(r * 255), ",", ~~(g * 255), ",", ~~(b * 255), ",1)");
                // return [r * 255, g * 255, b * 255];
            },
            /**
             * @description [Lightens provided hexadecimal color code.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The percentage amount of which to lighten by.]
             * @return {String} [The lightened hex color code.]
             */
            "hex::lighten": function(args) {
                var string = this;
                var to_rgb = args[2] || false,
                    percent_amount = (args[1] || 0);
                // turn into rgb
                // if (!to_rgb) string = string.str_convert("!hex::rgb");
                string = string.str_convert("!hex::rgb");
                // turn rgb into hsl
                string = string.str_convert("!rgb::hsl");
                // parse the hsl
                string = string.str_parse("!hsl");
                // turn back to rgb
                var new_percent = (string[2] * 1 + percent_amount);
                string = "hsl(".str_build("!join", string[0], ",", string[1], "%,", (new_percent > 100 ? 100 : new_percent), "%)").str_convert("!hsl::rgb");
                // if (to_rgb) return string;
                // finally turn back to hex
                return (to_rgb ? "#" : "") + string.str_convert("!rgb::hex");
            },
            /**
             * @description [Darkens provided hexadecimal color code.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The percentage amount of which to darken by.]
             * @return {String} [The darkened hex color code.]
             */
            "hex::darken": function(args) {
                var string = this;
                var to_rgb = args[2],
                    percent_amount = (args[1] || 0);
                // turn into rgb
                // if (!to_rgb) string = string.str_convert("!hex::rgb");
                string = string.str_convert("!hex::rgb");
                // turn rgb into hsl
                string = string.str_convert("!rgb::hsl");
                // parse the hsl
                string = string.str_parse("!hsl");
                // turn back to rgb
                var new_percent = (string[2] * 1 - percent_amount);
                string = "hsl(".str_build("!join", string[0], ",", string[1], "%,", (new_percent < 0 ? 0 : new_percent), "%)").str_convert("!hsl::rgb");
                // if (to_rgb) return string;
                // finally turn back to hex
                return (to_rgb ? "#" : "") + string.str_convert("!rgb::hex");
            },
            /**
             * @description [Lightens provided rgb color code.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The percentage amount of which to lighten by.]
             * @return {String} [The lightened rgb color code.]
             */
            "rgb::lighten": function(args) {
                return this.str_convert("!rgb::hex").str_convert("!hex::lighten", args[1] /*percent_amount*/ ).str_convert("!hex::rgb");
            },
            /**
             * @description [Darkens provided rgb color code.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The percentage amount of which to darken by.]
             * @return {String} [The darkened rgb color code.]
             */
            "rgb::darken": function(args) {
                return this.str_convert("!rgb::hex").str_convert("!hex::darken", args[1] /*percent_amount*/ ).str_convert("!hex::rgb");
            },
            /**
             * @description [Converts provided hsv to hwb color code.]
             * @return {String} [The hwb color code.]
             * @source https://en.wikipedia.org/wiki/HWB_color_model
             * @source http://fettblog.eu/hwb-colors/
             */
            "hsv::hwb": function() {
                // parse to get the parts
                var parts = this.str_parse("!hsv");
                var h = parts[0],
                    s = parts[1] / 100,
                    v = parts[2] / 100;
                return [h, Math.abs((1 - s) * v) * 100, Math.abs(1 - v) * 100];
            },
            /**
             * @description [Converts provided rgb to hwb color code.]
             * @return {String} [The hwb color code.]
             */
            "rgb::hwb": function() {
                // convert to hsv
                var string = this.str_convert("!rgb::hsv");
                // then convert to hwm from hsv
                return string.str_convert("!hsv::hwb");
            },
            /**
             * @description [Converts provided hwb to hsv color code.]
             * @return {String} [The hsv color code.]
             */
            "hwb::hsv": function() {
                // parse to get the parts
                var parts = this.str_parse("!hwb");
                var h = parts[0],
                    w = parts[1] / 100,
                    b = parts[2] / 100;
                return [h, Math.abs(1 - ((w) / (1 - b))) * 100, Math.abs(1 - b) * 100];
            },
            /**
             * @description [Camelizes provided string.]
             * @return {String} [The camelized string.]
             */
            "::camel": function() {
                var string = this;
                var new_string = "",
                    seperators = ["_", "-"];
                for (var i = 0, l = string.length; i < l; i++) {
                    // if the current char is a _ or -
                    if (seperators.indexOf(string[i]) !== -1) {
                        if (string[i + 1]) {
                            new_string += string[i + 1].toUpperCase();
                            i++;
                        }
                        // regular char
                    } else new_string += string[i];
                }
                return new_string;
            },
            /**
             * @description [Capitalizes provided string.]
             * @return {String} [The capitalized string.]
             */
            "::cap": function() {
                // upperCase the first char
                return this.charAt(0).toUpperCase() + this.slice(1);
            },
            /**
             * @description [Decapitalizes provided string.]
             * @return {String} [The decapitalized string.]
             */
            "::decap": function() {
                // lowerCase the first char
                return this.charAt(0).toLowerCase() + this.slice(1);
            },
            /**
             * @description [Classify provided string.]
             * @return {String} [The classified string.]
             */
            "::class": function() {
                // split at anyting but text chars...basically punctuation
                var parts = this.split(/[\`\~\!\@\#\$\%\^\&\*\(\)\_\-\+\=\[\]\{\}\\\|\;\:\'\"\,\.\<\>\/\?|\s\xa0]+/),
                    new_string = [];
                for (var i = 0, l = parts.length; i < l; i++) {
                    new_string.push(parts[i].str_convert("!::cap"));
                }
                return new_string.join("");
            },
            /**
             * @description [Dasherize provided string.]
             * @return {String} [The dasherized string.]
             */
            "::dash": function() {
                var string = this;
                var new_string = "";
                for (var i = 0, l = string.length; i < l; i++) {
                    // if the current char is a _ or -
                    if (string[i] === string[i].toUpperCase()) {
                        if (string[i + 1]) {
                            new_string += ("-" + string[i].toLowerCase());
                        }
                        // regular char
                    } else new_string += string[i];
                }
                return new_string;
            },
            /**
             * @description [Converts string to a number.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The base to convert to. (The default it set to return a decimal, therefore
             *               10 is the default base.)]
             * @return {Number} [The number converted from a string.]
             */
            "::num": function(args) {
                return parseInt(this, (args[1] || 10));
            },
            /**
             * @description [Swaps letter casing on provided string.]
             * @return {String} [The letter cased swapped string.]
             */
            "::swap": function() {
                var string = this;
                var new_string_parts = [],
                    c;
                for (var i = 0, l = string.length; i < l; i++) {
                    c = string[i];
                    if (c === c.toLowerCase()) new_string_parts.push(c.toUpperCase());
                    else new_string_parts.push(c.toLowerCase());
                }
                return new_string_parts.join("");
            },
            /**
             * @description [Slugifies provided string.]
             * @return {String} [The slugified string.]
             */
            "::slug": function() {
                return this.str_strip("!accents").toLowerCase().trim().replace(/[\s\xa0]+/g, "-");
            },
            /**
             * @description [Titlelizes the provided string.]
             * @return {String} [The titlelized string.]
             */
            "::title": function() {
                var string = this;
                var new_string = [];
                string = string.split(" ");
                for (var i = 0, l = string.length; i < l; i++) {
                    new_string.push(string[i].str_convert("!::cap"));
                }
                return new_string.join(" ");
            },
            /**
             * @description [Underscores provided string.]
             * @return {String} [The underscored string.]
             */
            "::under": function() {
                    var string = this;
                    var new_string = "";
                    for (var i = 0, l = string.length; i < l; i++) {
                        // if the current char is a _ or -
                        if (string[i] === string[i].toUpperCase()) {
                            if (string[i + 1]) {
                                new_string += ("_" + string[i].toLowerCase());
                            }
                            // regular char
                        } else new_string += string[i];
                    }
                    return new_string;
                }
                // rgb2hsv(hwb2rgb(args));
                // hwb_rgb = function() {
                //     // first convert to hsv
                //     string = string.str_parse_hwb(string);
                //     // then convert to hsv
                //     string = string.str_(  );
                //     // first convert to hsv
                //     string = string.str_rgb_2_hsv(string);
                //     // then parse hsv
                //     var parts = string.str_parse_hsv(string);
                //     var h = parts[0],
                //         s = parts[1]/100,
                //         v = parts[2]/100;
                //     return [ h, Math.abs((1-s)*v)*100, Math.abs(1-v)*100 ];
                // },
                // https://github.com/MoOx/color-convert/blob/master/conversions.js
                // https://github.com/MoOx/color-convert
                // function cmyk2rgb(cmyk) {
                //   var c = cmyk[0] / 100,
                //       m = cmyk[1] / 100,
                //       y = cmyk[2] / 100,
                //       k = cmyk[3] / 100,
                //       r, g, b;
                //   r = 1 - Math.min(1, c * (1 - k) + k);
                //   g = 1 - Math.min(1, m * (1 - k) + k);
                //   b = 1 - Math.min(1, y * (1 - k) + k);
                //   return [r * 255, g * 255, b * 255];
                // }
                // function rgb2cmyk(rgb) {
                //   var r = rgb[0] / 255,
                //       g = rgb[1] / 255,
                //       b = rgb[2] / 255,
                //       c, m, y, k;
                //   k = Math.min(1 - r, 1 - g, 1 - b);
                //   c = (1 - r - k) / (1 - k) || 0;
                //   m = (1 - g - k) / (1 - k) || 0;
                //   y = (1 - b - k) / (1 - k) || 0;
                //   return [c * 100, m * 100, y * 100, k * 100];
                // }
                // rgb_lighten = function(percent) {
                //     var rgb = string.str_parse("!rgb"),
                //         r_ = (~~(rgb[0] * 1 + (255 - rgb[0] * 1) * (percent / 100))),
                //         g_ = (~~(rgb[1] * 1 + (255 - rgb[1] * 1) * (percent / 100))),
                //         b_ = (~~(rgb[2] * 1 + (255 - rgb[2] * 1) * (percent / 100)));
                //     return string.str_build("!join", "rgb(", ((r_ > 255) ? "255" : r_), ",", ((g_ > 255) ? "255" : g_), ",", ((b_ > 255) ? "255" : b_), ")");
                // },
                // rgb_darken = function(percent) {
                //     var rgb = string.str_parse("!rgb"),
                //         r_ = (~~(rgb[0] * 1 - (255 - rgb[0] * 1) * (percent / 100))),
                //         g_ = (~~(rgb[1] * 1 - (255 - rgb[1] * 1) * (percent / 100))),
                //         b_ = (~~(rgb[2] * 1 - (255 - rgb[2] * 1) * (percent / 100)));
                //     return string.str_build("!join", "rgb(", ((r_ < 0) ? "0" : r_), ",", ((g_ < 0) ? "0" : g_), ",", ((b_ < 0) ? "0" : b_), ")");
                // },
                // hex_lighten = function(percent) {},
                //3F83A3
        },
        "count": {
            /**
             * @description [Counts the occurances of a substring in a string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The needle to count in the string.]
             * @return {Number} [The number of occurances in the string]
             */
            "/": function(args) {
                return this.split(args[1]).length - 1;
            }
        },
        "decode": {
            /**
             * @description [Decodes provided encoded HTML string.]
             * @return {String} [The decoded HTML string.]
             */
            "html": function() {
                var entities = {
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": "\"",
                    "&#39;": "'",
                    "&amp;": "&"
                };
                return this.replace(/&lt;|&gt;|&quot;|&#39;|&amp;/g, function(entity) {
                    return entities[entity];
                });
            },
            /**
             * @description [Decodes provided JSON encoded string.]
             * @return {String} [The decoded JSON string.]
             */
            "json": function() {
                try {
                    return JSON.parse(this);
                } catch (e) {
                    return ("json " + e);
                }
            },
            /**
             *
             *  Base64 encode / decode :: encode_utf8 function
             *  http://www.webtoolkit.info/
             *
             *  Code has been modified to fix bugs found by stackoverflow users
             *  http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
             *
             **/
            /**
             * @description [Decodes provided UTF8 encoded string.]
             * @return {String} [The decoded UTF8 string.]
             */
            "utf8": function() {
                var string = "",
                    i = 0,
                    c = 0,
                    c1 = 0,
                    c2 = 0;
                while (i < this.length) {
                    c = this.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if ((c > 191) && (c < 224)) {
                        c1 = this.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
                        i += 2;
                    } else {
                        c1 = this.charCodeAt(i + 1);
                        c2 = this.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
                        i += 3;
                    }
                }
                return string;
            },
            /**
             *
             *  Base64 encode / decode
             *  http://www.webtoolkit.info/
             *
             *  Code has been modified to fix bugs found by stackoverflow users
             *  http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
             *
             **/
            /**
             * @description [Decodes provided base64 encoded string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Boolean} [Flag indicating whether to use browser native method.]
             * @return {String} [The decoded base64 string.]
             */
            "base64": function(args) {
                var string = this;
                // use the native base64 encode; supported only in IE 10+ and moder browsers (chrome, ff...)
                if (args[1]) return window.atob(string);
                var output = "",
                    chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0,
                    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                string = string.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < string.length) {
                    enc1 = _keyStr.indexOf(string.charAt(i++));
                    enc2 = _keyStr.indexOf(string.charAt(i++));
                    enc3 = _keyStr.indexOf(string.charAt(i++));
                    enc4 = _keyStr.indexOf(string.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                return output.str_decode("!utf8");
            }
        },
        "encode": {
            /**
             * @description [Encodes provided string.]
             * @return {String} [The HTML encoded string.]
             */
            "html": function() {
                var entities = {
                    "<": "lt",
                    ">": "gt",
                    "\"": "quot",
                    "'": "#39",
                    "&": "amp"
                };
                return this.replace(/[<>"'&]/g, function(entity) {
                    return "&" + entities[entity] + ";";
                });
            },
            /**
             * @description [Encodes provided string.]
             * @return {String} [The JSON encoded string.]
             */
            "json": function() {
                try {
                    return JSON.stringify(this);
                } catch (e) {
                    return ("json " + e);
                }
            },
            /**
             *
             *  Base64 encode / decode :: encode_utf8 function
             *  http://www.webtoolkit.info/
             *
             *  Code has been modified to fix bugs found by stackoverflow users
             *  http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
             *
             **/
            /**
             * @description [Encodes provided string.]
             * @return {String} [The UTF8 encoded string.]
             */
            "utf8": function() {
                //string = string.replace(/\r\n/g,"\n"); // comment out to allow for safe binary encodings/decodings
                var utftext = "",
                    string = this;
                for (var n = 0, l = string.length; n < l; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                }
                return utftext;
            },
            /**
             *
             *  Base64 encode / decode
             *  http://www.webtoolkit.info/
             *
             *  Code has been modified to fix bugs found by stackoverflow users
             *  http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
             *
             **/
            /**
             * @description [Encodes provided string.]
             * @return {String} [The base64 encoded string.]
             */
            "base64": function(string, args) { // use_native) {
                // use the native base64 encode; supported only in IE 10+ and moder browsers (chrome, ff...)
                if (args[1]) return window.btoa(string);
                var output = "",
                    chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0,
                    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                string = string.str_encode("!utf8");
                while (i < string.length) {
                    chr1 = string.charCodeAt(i++);
                    chr2 = string.charCodeAt(i++);
                    chr3 = string.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
                }
                return output;
            }
        },
        "reverse": {
            /**
             * @description [Reverses provided string.]
             * @return {String} [The reversed string.]
             */
            "/": function() {
                var string = this;
                var new_string = "";
                for (var i = 0, l = string.length; i < l; i++) {
                    new_string = string[i] + new_string;
                }
                // var new_string = "";
                // for (var i = string.length; i > -1; i--) {
                //     new_string += string[i];
                // }
                return new_string;
            }
        },
        "split": {
            /**
             * @description [Splits string by the its characters.]
             * @return {Array} [An array contaning the string characters.]
             */
            "chars": function() {
                return this.split("");
            },
            /**
             * @description [Splits string by chunking it.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The size to chunk by.]
             * @return {Array} [An array containing string chunks.]
             */
            "chunk": function(args) { // chunk_size) {
                return this.match(new RegExp(("." + ".?".str_repeat("!text", Math.abs(args[1]) - 1)), "g"));
            },
            /**
             * @description [Splits string its lines.]
             * @return {Array} [An array contaning the string parts.]
             */
            "lines": function() {
                return this.split(/\r\n|\n\r|\r|\n/);
            },
            /**
             * @description [Splits string number into its parts (number and decimal).]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Boolean} [Flag indicating whether to fill in...???NEEDS FIXING::CONFUSING::NECESSARY?]
             * @return {Array} [An array containing string chunks.]
             */
            "num": function(args) {
                // if (string.str_is("!decimal") && string.str_is("!numeric")) {
                if (this.str_is("!numeric")) {
                    var parts = this.split("."),
                        fill_in = args[1];
                    // check if negative
                    return [(parts[0].str_chomp("!left", "-") || (fill_in ? "0" : "0")), (parts[1] || (fill_in ? "0" : "0")), (parts[0].charAt(0) === "-") ? true : false];
                }
                return NaN;
                // if (string.str_is("!decimal")) {
                //     return [ (string.split(".")[0] || (fill_in ? "0" : "")), ( (string.split(".")[1].str_grab("!between", 0, (n || -1))) || (fill_in ? "0" : "") )];
                // } else {
                //     return [string, "0"];
                // }
            },
            /**
             * @description [Splits string by its words.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The provided amount of whitespace to split by. Defaults to max amount.]
             * @return {Array} [An array containing string parts.]
             */
            "words": function(args) {
                return this.trim().split(args[1] || (/[\s\xa0]+/));
            }
        },
        "chomp": {
            /**
             * @description [Removes prefix from provided string. If a number is provided the number
             *               amount of characters will be removed.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String|Number} [The provided string or amount of characters to remove.]
             * @return {String}        [The string with the prefix or x amount of characters removed.]
             */
            "left": function(args) {
                // if the prefix is a number we just chomp back those x chars
                // else if string remove that prefix from string
                var string = this,
                    prefix = args[1];
                return (dtype(prefix, "string") && string.indexOf(prefix) === 0) ? string.slice(prefix.length) : (dtype(prefix, "number") ? string.slice(Math.abs(prefix)) : string);
            },
            /**
             * @description [Removes suffix from provided string. If a number is provided the number
             *               amount of characters will be removed.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String|Number} [The provided string or amount of characters to remove.]
             * @return {String}        [The string with the suffix or x amount of characters removed.]
             */
            "right": function(args) {
                // if the suffix is a number we just chomp back those x chars
                // else if string remove that suffix from string
                var string = this,
                    suffix = args[1];
                return (dtype(suffix, "string") && string.str_grab("!right", suffix.length) === suffix) ? string.str_grab("!between", 0, string.length - suffix.length) : (dtype(suffix, "number") ? string.substr(0, string.length - Math.abs(suffix)) : string);
            }
        },
        "ff": {
            /**
             * @description [Provided a list of strings, functions returns the first match in list.
             *               Hence, returns the first found string in provided string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Array} [The array of needles to too for in string.]
             * @return {String|Null}        [The found needle of null if nothing is found.]
             */
            "/": function(args) {
                var list = args[1];
                for (var i = 0, l = list.length; i < l; i++) {
                    if (this.indexOf(list[i]) !== -1) return list[i];
                }
                return null;
            }
        },
        "ensure": {
            /**
             * @description [Ensures string has provided prefix.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The prefix the string should have.]
             * @return {String}        [The string with ensured prefix.]
             */
            "left": function(args) {
                var string = this,
                    prefix = args[1];
                return (string.str_grab("!left", prefix.length) === prefix) ? string : prefix + string;
            },
            /**
             * @description [Ensures string has provided suffix.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The prefix the string should have.]
             * @return {String}        [The string with ensured suffix.]
             */
            "right": function(args) {
                var string = this,
                    suffix = args[1];
                return (string.str_grab("!right", suffix.length) === suffix) ? string : string + suffix;
            }
        },
        "format": {
            /**
             * @description [Formats provided string with the provided map.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Object} [The object containing the string replacements.]
             * @return {String}        [The formated string.]
             * @note: allow string formating either way => {0:"anthony"} or {"name":"anthony"}
             */
            "string": function(args) {
                var format_map = args[1];
                return this.replace(/{(\d+)}/g, function(match, index) {
                    return format_map[index];
                });
            },
            /**
             * @description [Formats number string into a money format.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Object} [The amount of decimals to include. (default = 2)]
             *  @2 {Object} [The decimal seperator. (default = .)]
             *  @3 {Object} [The order separater. (default = ,)]
             * @return {String}        [The formated string.]
             */
            "number": function(args) {
                var string = this,
                    deci = "00",
                    check = string.indexOf(".");
                decimals = Math.abs(args[1]) || 2;
                if (check !== -1) {
                    deci = string.substring(check + 1, string.length);
                    string = string.substring(0, check);
                }
                // if decimals is provided add it
                if (decimals) {
                    // if the deci is longer than the decimals wanted we
                    // cut it down
                    if (deci.length > decimals) deci = deci.str_grab("!between", 0, decimals);
                    else {
                        // we need to pad the decimal with traling 0's
                        var repeat = decimals - deci.length;
                        // alert("asdas");
                        deci = deci.str_pad("!right", repeat, "0");
                    }
                }
                var new_string = "",
                    counter = 0,
                    order_seperator = args[3] || ",",
                    decimal_seperator = args[2] || ".";
                for (var i = string.length - 1; i >= 0; i--) {
                    if (counter === 3) {
                        new_string += (order_seperator + string[i]);
                        counter = 0;
                    } else new_string += string[i];
                    counter++;
                }
                return new_string.split("").reverse().join("") + decimal_seperator + deci;
            }
        },
        "freq": {
            /**
             * @description [Finds the frequency of the letters in provided string.]
             * @return {Object}        [Object containing the letters' frequencies.]
             */
            "letters": function() {
                var string = this,
                    hz_map = {};
                for (var i = 0, l = string.length; i < l; i++) {
                    if (!hz_map[string[i]]) {
                        // this is the first of its type
                        hz_map[string[i]] = 1;
                    } else {
                        hz_map[string[i]] = hz_map[string[i]] + 1;
                    }
                }
                return hz_map;
            },
            /**
             * @description [Finds the frequency of the words in provided string.]
             * @return {Object}        [Object containing the words' frequencies.]
             * @bug: edge case "this is pretty cool mane haha. like it really is mane haha".str_freq("!words"); (remove punctuation?)
             */
            "words": function(string) {
                var string = this,
                    hz_map = {};
                string = string.split(" ");
                for (var i = 0, l = string.length; i < l; i++) {
                    if (!hz_map[string[i]]) {
                        // this is the first of its type
                        hz_map[string[i]] = 1;
                    } else {
                        hz_map[string[i]] = hz_map[string[i]] + 1;
                    }
                }
                return hz_map;
            }
        },
        "grab": {
            /**
             * @description [Grabs anything from string that is between the provided left and right substrings.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The left starting point of what to grab.]
             *  @2 {String} [The right ending point of what to grab.]
             *  @3 {String} [Used internally, will cause function to act in a recursive manner.]
             * @return {String}        [The string of grabbed characters.]
             */
            "between": function(args) {
                var string = this,
                    left = args[1],
                    right = args[2];
                if (typeof left === "string" && typeof right === "string") {
                    var string = args[3] || string;
                    // get the left position
                    var left_pos = (left === "") ? 0 : ((left) ? string.indexOf(left) : -1);
                    // get the right position
                    var right_pos = (right === "") ? (string.length) : ((right) ? string.indexOf(right) : -1);
                    // return empty string if the left or right bounds are not found
                    if (left_pos === -1 || right_pos === -1) return "";
                    // if the right position is smaller than the left recurs...
                    if (right_pos < left_pos) {
                        return (string.substring(right_pos + 1)).str_grab("!between", left, right, string.substring(right_pos + 1));
                    }
                    // add the left_pos to the lenght of the length of the
                    // left bound ... stop at the right_pos index
                    return string.substring(left_pos + left.length, right_pos);
                } else {
                    var start = left,
                        end = right;
                    // index positions
                    // if the start is negative alias right()
                    if (start < 0) return string.str_grab("!right", (!end) ? string.length + start : Math.abs(end));
                    // if (start === -1) return string.str_right(string, ((!end) ? string.length : Math.abs(end)));
                    return string.substring(start, ((end === -1 || !end /*get to the end of the string*/ ) ? string.length : end))
                }
            },
            /**
             * @description [Grabs the N amount of characters of string from the left.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The N amount of characters to grab from string.]
             * @return {String}        [The string of grabbed characters.]
             */
            "left": function(args) {
                var n = args[1];
                return (n > 0) ? this.substr(0, n) : this.str_grab("!left", -n);
            },
            /**
             * @description [Grabs the N amount of characters of string from the right.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The N amount of characters to grab from string.]
             * @return {String}        [The string of grabbed characters.]
             */
            "right": function(args) {
                var n = args[1];
                return (n > 0) ? this.slice(-n) : this.str_grab("!right", -n);
            }
        },
        "index": {
            /**
             * @description [Find the index of the provided needle in the provided string starting
             *               from the left.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Boolean} [Flag indicating whether to return all indices of the needle.]
             * @return {Number|Array}        [The string of grabbed characters.]
             */
            "left": function(args) {
                if (!args[2]) return this.indexOf(args[1]);
                var indices = [],
                    i = -1;
                // http://stackoverflow.com/questions/10710345/finding-all-indexes-of-a-specified-character-within-a-string
                while ((i = this.indexOf(args[1], i + 1)) >= 0) {
                    indices.push(i);
                }
                // if the indices array is empty here, it was not found within the string
                return indices;
            },
            /**
             * @description [Find the index of the provided needle in the provided string starting
             *               from the right.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Boolean} [Flag indicating whether to return all indices of the needle.]
             * @return {Number|Array}        [The string of grabbed characters.]
             */
            "right": function(args) {
                if (!args[2]) return this.lastIndexOf(args[1]); // - this.length; --> get the actual position from the right?
                // find them all from the left then simply reverse the array
                return this.str_index("!left", args[1], true).reverse();
            }
        },
        "is": {
            /**
             * @description [Checks whether provided string is found in current string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The needle.]
             * @return {Boolean}        [True means found, else false.]
             */
            "in": function(args) {
                return (-~this.indexOf(args[1])) ? true : false;
            },
            /**
             * @description [Checks if string ends with of any of the strings in the provided array of strings.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Array} [The array of strings the string can end with.]
             * @return {Boolean}        [True means string ends with a string in the provided array. Else false.]
             */
            "ewith": function(args) {
                var ending_strings_array = args[1];
                // loop through each suffix and check if the string ends with it
                for (var i = 0, l = ending_strings_array.length; i < l; i++) {
                    if (this.str_grab("!right", ending_strings_array[i].length) === ending_strings_array[i]) return true;
                }
                return false;
            },
            /**
             * @description [Checks if string starts/ends with of any of the strings in the provided array of strings.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Array} [The array of strings the string can start/end with.]
             * @return {Number|Boolean}        [flase means it does not start/end with.
             *                                  1 = startswith, 2 = endswith]
             */
            "sewith": function(args) {
                var starts = this.str_is("!swith", args[1]),
                    ends = this.str_is("!ewith", args[1]);
                if (starts) return 1; //return "^" + starts;
                if (ends) return 2; //return ends + "$";
                return false;
            },
            /**
             * @description [Checks if string starts with of any of the strings in the provided array of strings.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Array} [The array of strings the string can end with.]
             * @return {Boolean}        [True means string starts with a string in the provided array. Else false.]
             */
            "swith": function(args) {
                var list = args[1];
                // loop through each prefix and check if the string starts with it
                for (var i = 0, l = list.length; i < l; i++) {
                    if (this.str_grab("!left", list[i].length) === list[i]) return true;
                }
                return false;
            },
            /**
             * @description [Checks if string only contains letters (a-z).]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "alpha": function() {
                return (dtype(this, "string") && this.trim().replace(/[a-z]/gi, "") === "") ? true : false;
            },
            /**
             * @description [Checks if string only contains letters + numbers (a-z0-9).]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "alphanum": function() {
                return (dtype(this, "string") && this.trim().replace(/[a-z0-9]/gi, "") === "") ? true : false;
            },
            /**
             * @description [Checks if object is an Array.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             * @non_string
             */
            "array": function() {
                return (dtype(this, "array")) ? true : false;
            },
            /**
             * @description [Checks if object is an ArgumentsObject.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             * @non_string
             */
            "arguments": function() {
                return (dtype(this, "arguments")) ? true : false;
            },
            /**
             * @description [Checks if string is a base64 string.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             * @source http://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
             */
            "base64_string": function() {
                // can have padding; 1 or 2 == at the end of string
                if (!this || this.str_count("/", "!=") > 2) return false;
                // first remove the padding and check chars to be A-Za-z0-9+/
                if ((/[^a-zA-Z0-9\+\/]/).test(this.str_replace("!right", "=", ""))) return false;
                return true;
            },
            /**
             * @description [Checks if provided array has a valid year/month/day.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             * @source http://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
             *
             * @source: valid formats
             * https://en.wikipedia.org/wiki/Date_and_time_representation_by_country#Date
             * it will account for leap years
             */
            "bday": function() {
                var string = this.split(/\-|;|\:|\s+|\.|,/);
                var year = string[0],
                    month = string[1],
                    day = string[2];
                if (!year || !month || !day) return false;
                // check if all strings are numeric
                if (!year.str_is("!numeric") || !month.str_is("!numeric") || !day.str_is("!numeric")) return 1;
                // check the lengths
                if ((year.str_convert("!::num") + "").length !== 4 || month.length > 2 || day.length > 2) return 2;
                // reset vars from string to numbers
                year = year * 1;
                month = month * 1;
                day = day * 1;
                // check that the month is between 1 and 12
                if (month < 1 || month > 12) return 3;
                // check that the day is possible in that month; February-leap-year-29-days
                // http://www.timeanddate.com/calendar/months/
                var month_max_days = [
                    [1, 31],
                    [2, 28],
                    [3, 31],
                    [4, 30],
                    [5, 31],
                    [6, 30],
                    [7, 31],
                    [8, 31],
                    [9, 30],
                    [10, 31],
                    [11, 30],
                    [12, 31]
                ];
                // gran the max day count for that month
                var check = month_max_days[month - 1][1];
                // if the year is a leay year and the month is February
                // we add an extra day
                if (month === 2 && (year + "").str_is("!leap_yr")) check += 1;
                // now we check the day is allowed
                if (day < 1 || day > check) return 4;
                // everything passed and we can
                return true;
            },
            /**
             * @description [Checks if object is a Boolean.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             * @non_string
             */
            "boolean": function() {
                return (dtype(this, "boolean")) ? true : false;
            },
            /**
             * @description [Checks if object is a Date object.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             * @non_string
             */
            "date": function() {
                return (dtype(this, "date")) ? true : false;
            },
            /**
             * @description [Checks if string is a decimal integer.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "decimal": function() {
                return (this.str_is("!numeric") && this.str_is("!in", ".")) ? true : false;
                // return (string.str_is("!numeric") /*&& string * 1 % 1 !== 0*/) ? true : false;
            },
            /**
             * @description [Checks if provided string is a domain name in format.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "domain": function() {
                var string = this;
                // a legal domain cannot contain `~!@#$%^&*()_+=[]{}|\;:'",.<>/?
                // cannot start or end with a hyphen/dash but it can contain inner hyphens/dashes
                return (string && string.str_grab("!left", 1) !== "-" && string.str_grab("!right", 1) !== "-" && !string.str_is("!special_string", ["-"])) ? true : false;
            },
            /**
             * @description [Checks if provided string is in email format.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "email": function() {
                var string = this;
                /*
                    Your email address can contain only letters,
                    numbers, periods (.), hyphens (-),
                    and underscores (_). It can't contain special
                    characters, accented letters, or letters
                    outside the Latin alphabet.
                */
                // string must be over 4 chars in length
                // http://stackoverflow.com/questions/2049502/what-characters-are-allowed-in-email-address
                // cannot have spaces...consecutive periods or start/end with a period
                if (string.length <= 4 || (/\s\xa0/g).test(string) || (/\.\.+/g).test(string) || string.str_is("!sewith", ["."])) return false;
                // must have a valid tld and tld must be the at the end of the string
                var tld = string.substring(string.lastIndexOf("."), string.length);
                // check if the tld is indeed valid
                if (window.suffix_list[tld.charAt(1).toLowerCase()].indexOf(tld) === -1) return false; // invalid tld
                // split the string at the @
                var parts = string.split("@"),
                    username = parts[0],
                    servername = parts[1].split(".");
                // there must only be two parts, else there are more than one "@"
                // and each part cannot be empty
                if (!username.length || !servername.length || parts.length !== 2) return false;
                // remove the last one as it is the valid tld
                servername.pop();
                // check the subdomains
                for (var i = 0, l = servername.length; i < l; i++) {
                    if (!servername[i].str_is("!domain")) return false;
                }
                // now we check the username...must not contain any illegals chars...
                // only special chars allowed are ._-
                if (username.str_is("!special_string", [".", "_", "-"])) return false;
                // everything else looks good
                return true;
            },
            /**
             * @description [Checks if provided string is empty.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "empty": function() {
                // should it account for spaces???? "   ";false vs "";true
                return (this === undefined || this === null || this.replace(/[\s\xa0]+/g, "") === "") ? true : false;
            },
            /**
             * @description [Checks if provided string is in binary format.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "binary": function() {
                // only have 0-1 and/ or a radix(dot)
                return (!(/[^0-1\.-]/g).test(this) && (/^(-)?([0-1]+)?(\.[0-1]+)?$/).test(this) && this !== "-") ? true : false;
                // return (!(/[^0-1\.]/g).test(string) && string.str_count("/", ".") < 2) ? true : false;
            },
            /**
             * @description [Checks if provided string is a decimal number.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "digit": function() {
                // only have 0-9 and/ or a radix(dot)
                var string = this;
                return (!(/[^0-9\.-]/g).test(string) && (/^(-)?([0-9]+)?(\.[0-9]+)?$/).test(string) && string !== "-") ? true : false;
            },
            /**
             * @description [Checks if provided string is an octal number.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "octal": function() {
                var string = this;
                // only have 0-7 and/ or a radix(dot)
                return (!(/[^0-7\.-]/g).test(string) && (/^(-)?([0-7]+)?(\.[0-7]+)?$/).test(string) && string !== "-") ? true : false;
            },
            /**
             * @description [Checks if provided string is in hex format.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "hex": function() {
                var string = this;
                // only have 0-9 and/ or a radix(dot)
                return (!(/[^a-f0-9\.x-]/gi).test(string) && (/^(-)?((0x)?(#)?[0-9a-f]+)?(\.[0-9a-f]+)?$/i).test(string) && string !== "-") ? true : false;
            },
            /**
             * @description [Checks if provided string is a hex color.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "hexcolor": function() {
                var string = this;
                return ((/^(#)?([a-f0-9]{3,6})$/i).test(string) && (string.str_chomp("!left", "#").str_length("!exact", 3) || string.str_chomp("!left", "#").str_length("!exact", 6))) ? true : false;
                // return ((/^#?([a-f0-9]{3}|[a-f0-9]{6})$/gi).test(string)) ? true : false;
            },
            /**
             * @description [Checks if provided string is a hex color with an alpha channel.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "hexcolor8": function() {
                return ((/^(#)?([a-f0-9]{8})$/i).test(this)) ? true : false;
            },
            /**
             * @description [Checks if provided string is an rgb color.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "rgb": function() {
                return ((typeof this.str_parse("!rgb")) === "boolean") ? false : true;
            },
            /**
             * @description [Checks if provided string is in a valid ip address format.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "ip": function(string) {
                // replace any illegal chars
                string = string.str_chomp("!left", "://");
                string = string.str_chomp("!left", "@");
                string = string.str_chomp("!left", "[");
                // turns 1::1:123.1.12.1: => 1::1:123.1.12.1
                if ((/\d:$/).test(string)) string = string.str_chomp("!right", ":");
                string = string.str_chomp("!right", "]:");
                string = string.str_chomp("!right", "/");
                // check if v4 or v6
                if (string.indexOf(":") > -1) {
                    var ip6 = string;
                    // if we have something like '1:1:1:::::122.1.1.1 it is invalid
                    if ((/:{3,}/g).test(string)) return false;
                    // v6
                    // check for ipv4
                    if (string.indexOf(".") > -1) {
                        // get the last colon index
                        var last_colon_index = string.lastIndexOf(":");
                        // separate at the last colon index
                        var ip6 = string.substring(0, last_colon_index + 1);
                        // reset the ip6; remove the traling : if there is only one, e.g. 1::1: => 1::1, 1:: => 1::
                        if (ip6.str_grab("!right", 1) === ":" && ip6.str_grab("!right", 2) !== "::") ip6 = ip6.str_chomp("!right", ":");
                        var ip4 = string.substring(last_colon_index + 1, string.length);
                        // check that the ip4 is in valid format
                        if (!ip4.str_is("!ip")) return false; //"invalid ip4";
                    }
                    // now we check the ip6
                    // check for :: compression
                    var compression_count = ip6.str_count("/", "!::");
                    if (compression_count > 1) return false; //too much compression
                    // if compression exists we check for length, there should be only 8
                    if (compression_count === 1) {
                        var repeat = 0;
                        if (ip6.str_grab("!left", 2) === "::") {
                            // remove the :: from the left and split by :
                            var parts = ip6.str_chomp("!left", "::").split(":"),
                                l = parts.length;
                        } else if (ip6.str_grab("!grab", 2) === "::") {
                            // remove the :: from the left and split by :
                            var parts = ip6.str_chomp("!right", "::").split(":"),
                                l = parts.length;
                        } else {
                            // remove the :: from the left and split by :
                            var parts = ip6.split("::"),
                                p_1 = parts[0].split(":"),
                                p_2 = parts[1].split(":"),
                                l = (p_1.length + p_2.length);
                            parts = p_1.concat(p_2);
                        }
                        if (l >= 9) return false;
                    } else {
                        // just split at every :
                        var parts = ip6.split(":"),
                            l = parts.length;
                        // this case must be 8 in length
                        if (l !== 8) return false;
                    }
                    // now we check that each part has valid chars
                    for (var i = 0; i < l; i++) {
                        // check if they are a-f0-9 only
                        if (parts[i].length >= 5 || (/[^a-f0-9]+/gi).test(parts[i])) {
                            return false; // illegal char found
                        }
                    }
                    // everything has passed mane
                    return true;
                } else {
                    // v4
                    // split into parts
                    string = string.split(".");
                    if (string.length !== 4) return false; // need to have 4 parts
                    // check if they are all numbers
                    if (!string.join("").str_is("!numeric")) return false; // all parts need to be numbers
                    // no we check if they are all between a range
                    var one = string[0] * 1,
                        two = string[1] * 1,
                        three = string[2] * 1,
                        four = string[3] * 1;
                    if (((one <= -1 || one >= 256) || (two <= -1 || two >= 256) || (three <= -1 || three >= 256) || (four <= -1 || four >= 256))) {
                        return false; // invalid number
                    }
                    return true;
                }
            },
            /**
             * @description [Checks if provided string contains latin characters.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             * @source http://semplicewebsites.com/removing-accents-javascript
             */
            "latin": function() {
                var latin_map = constants.LATIN_MAP,
                    string = this;
                for (var i = 0, l = string.length; i < l; i++) {
                    if (latin_map[string[i]]) return true;
                }
                return false;
            },
            /**
             * @description [Checks if the provided year is a leap year.]
             * @return {Boolean} [True = is leap year, otherwise false.]
             * @info http://www.timeanddate.com/date/leapyear.html
             */
            "leap_yr": function() {
                // must be divisible by 4
                if (((this * 1) % 4)) return false;
                // if the number is a century number(%100) it must be divisible by %400
                if (!((this * 1) % 100) && ((this * 1) % 400)) return false;
                return true;
            },
            /**
             * @description [Checks if provided string characters are all lowercased.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "lower": function() {
                return this.replace(/[a-z]/g, "") === "";
            },
            /**
             * @description [Checks if provided string contains special characters (symbols).]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Array} [The array of special characters to exclude from check.]
             *  @2 {Boolean} [Flag indicating whether to include numbers in check.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "special_string": function(args) { // exclude_characters, check_for_numbers) {
                var special_chars = ("`~!@#$%^&*()-_=+[]{}\\|;:\'\",.<>/? " + ((args[2]) ? "0123456789" : "")).split("");
                var exclude_characters = args[1] || [];
                for (var i = 0, l = exclude_characters.length; i < l; i++) {
                    var remove_index = special_chars.indexOf(exclude_characters[i]);
                    if (remove_index > -1) special_chars.splice(remove_index, 1);
                }
                var string = this;
                // now check if the string has any special chars
                for (var i = 0, l = special_chars.length; i < l; i++) {
                    if (this.indexOf(special_chars[i]) > -1) return true;
                }
                return false;
            },
            /**
             * @description [Checks if provided object is Not-A-Number (NaN).]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "nan": function() {
                return (dtype(this, "number") && this + "" === "NaN") ? true : false;
            },
            /**
             * @description [Checks if provided object is null.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "null": function() {
                return this === null;
            },
            /**
             * @description [Checks if provided object is a number.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "number": function() {
                var string = this;
                if (string + "" !== "Infinity" && dtype(string * 1, "number") && parseFloat(string) >= 0) return true;
                return false;
            },
            /**
             * @description [Checks if provided string includes numbers and spaces.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "number_space": function() {
                return !((/[^0-9 ]/).test(this));
            },
            /**
             * @description [Checks if provided string is either a binary, decimal(digit),
             *               octal, or hexadecimal number.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "numeric": function() {
                var string = this;
                return (dtype(string, "string") && (string.str_is("!binary") || string.str_is("!digit") || string.str_is("!octal") || string.str_is("!hex")) && string !== "Infinity") ? true : false;
            },
            /**
             * @description [Checks if provided string characters are all uppercased.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "upper": function() {
                return this.replace(/[A-Z]/g, "") === "";
            },
            /**
             * @description [Checks if provided string is in a URL format.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "url": function() {
                var test = this.str_parse("!url");
                return (test.length === 1 && test[0].valid === true) ? true : false;
            },
            /**
             * @description [Checks if provided object is falsy, or anything that can be considered false.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "falsy": function() {
                return (["", false, null, undefined, 0].indexOf(this) >= 0 || dtype(this, "number") && (a + "" === "NaN")) ? true : false;
            },
            /**
             * @description [Checks if provided number is finite.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "finite": function() {
                //if (Number.isFinite) return Number.isFinite(a);
                return isFinite(string);
            },
            /**
             * @description [Checks if provided number is not finite, or infinty.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "infinity": function() {
                return !isFinite(this);
            },
            /**
             * @description [Checks if provided object is a function.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "function": function() {
                return (dtype(this, "function")) ? true : false;
            },
            /**
             * @description [Checks if provided is a plain object ({}).]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "plain_object": function() {
                return (dtype(this, "object")) ? true : false;
            },
            /**
             * @description [Checks to see if 2 objects are idential in content.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Any} [The object to which compare with.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "equal": function(args) {
                var string = this;
                var i, e, a = string,
                    l = a.length,
                    b = args[1],
                    type1, type2, ll;
                if (l !== b.length) return false;
                while (l--) {
                    //i = a.shift();
                    //e = b.shift();
                    i = a[l];
                    e = b[l];
                    type1 = dtype(i);
                    type2 = dtype(e);
                    if (type1 === type2) {
                        //check number type
                        if (type1 === "array") {
                            ll = i.length; //, j, jj;
                            if (ll !== e.length) return false;
                            while (ll--) {
                                if (dtype(i[ll]) === dtype(e[ll]) && (![i[ll]].str_is("!equal", [e[ll]]))) {
                                    return false;
                                }
                            }
                        } else if (type1 === "object") {
                            var r = [],
                                s = [],
                                u = [],
                                v = [],
                                keys = Object.keys(i),
                                len = keys.length,
                                keys1 = Object.keys(e),
                                len1 = keys1.length,
                                j = -1;
                            while (j < len) {
                                j++;
                                r.push(keys[j]);
                                s.push(i[keys[j]]);
                                u.push(keys[j]);
                                v.push(e[keys[j]]);
                            }
                            if (!r.str_is("!equal", u) || !s.str_is("!equal", v)) {
                                return false;
                            }
                        } else {
                            if (i + "" !== e + "") {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                }
                return true;
            },
            /**
             * @description [Checks to see if 2 objects are idential in type.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Any} [The object to which compare with.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "same_type": function(args) { // comparison_object) {
                return dtype(this, dtype(args[1]));
            },
            /**
             * @description [Checks to see if provided object is an HTMLElement.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "element": function() {
                var string = this;
                return (string && string.nodeType === 1 && dtype(string, "htmldivelement")) ? true : false;
            },
            /**
             * @description [Checks if provided object is a string.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "string": function() {
                return (dtype(this, "string")) ? true : false;
            },
            /**
             * @description [Checks if provided object is RegExp object.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "regex": function() {
                return (dtype(this, "regexp")) ? true : false;
            },
            /**
             * @description [Checks to see if provided object is undefined.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "undefined": function() {
                return this === undefined;
            },
            /**
             * @description [Checks to see if provided object is the window.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Any} [The object to which compare with.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "window": function() {
                return (dtype(this, "window")) ? true : false;
            },
            /**
             * @description [Checks if an rgb color is more white than black.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             * @source http://stackoverflow.com/questions/9780632/how-do-i-determine-if-a-color-is-closer-to-white-or-black
             * @source http://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
             * @source https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness
             * @example black === (lessthan or equal 127)
             * @exmaple white === (greaterthan or equal to 128)
             */
            "color_white": function() {
                var rgb = this;
                return (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) < 127 ? false : true;
            },
            /**
             * @description [Checks if an rgb color is more black than white.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "color_black": function() {
                return !(this.str_is("!color_white"));
            },
            /**
             * @description [Checks if provided string is a whole number.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             * @source http://stackoverflow.com/questions/16476501/validate-if-a-value-is-a-whole-number
             */
            "whole_number": function() {
                return (this.str_is("!numeric") && (this * 1) % 1 === 0) ? true : false;
            },
            /**
             * @description [Checks to see if the provided mimetype and file extension are a valid match.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The provided file extension.]
             *  @2 {String} [The provided mimetype to check against.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "mimetype": function(args) {
                var m = constants.MIMETYPES[args[1].str_ensure("!left", ".")];
                return (m && m.indexOf(args[2]) > -1) ? true : false;
            },
            /**
             * @description [Checks to see if the provided string is a base64 URL.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "base64_url": function() {
                var string = this;
                // split at ,
                var parts = string.split(","),
                    first = parts[0],
                    second = parts[1];
                // screen the forst part ==> data:image/png;base64
                // split the first part
                first = first.split(/:|;/);
                // must start with data:
                if (first[0] !== "data") return false;
                // second part must be a legit mime type
                var mimes = constants.MIMETYPES,
                    l = Object.keys(mimes).length,
                    counter = 0;
                for (var key in mimes) {
                    counter++;
                    if (mimes[key].indexOf(first[1]) > -1) break;
                    // return false if we have gone through all the mimetypes
                    // and there is no match
                    if (counter === l) return false;
                }
                // if ( !string.str_is_mimedtype(first[1]) ) return false;
                // third part must Base64
                if (first[2] !== "base64") return false;
                // we check the second part
                if (!second.str_is("!base64_string")) return false;
                return true;
            }
        },
        "length": {
            /**
             * @description [Checks if string length is greater than or equal to the provided length.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The provided length to check against.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "min": function(args) {
                return (this.length >= args[1]) ? true : false;
            },
            /**
             * @description [Checks if string length is less than or equal to the provided length.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The provided length to check against.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "max": function(args) {
                return (this.length <= args[1]) ? true : false;
            },
            "range": function(args) {
                return (this.str_length("!min", args[1]) && this.str_length("!max", args[2])) ? true : false;
            },
            /**
             * @description [Checks if string length is exactly the provided length.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The provided length to check against.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "exact": function(args) {
                return (this.length === args[1]) ? true : false;
            }
        },
        "letter": {
            /**
             * @description [Using the provided letter, function returns the next letter in the alphabet.]
             * @return {String}        [The next letter in alphabet.]
             */
            "next": function() {
                // get the next letter in the alphabet
                var point = this.codePointAt(0);
                if (point === 90) point = 64; // reset to letter A if letter Z provided
                else if (point === 122) point = 96; // reset to letter a if letter z provided
                return String.fromCodePoint(point + 1);
            },
            /**
             * @description [Using the provided letter, function returns the previous letter in the alphabet.]
             * @return {String}        [The previous letter in alphabet.]
             */
            "prev": function() {
                // get the previous letter in the alphabet
                var point = this.codePointAt(0);
                if (point === 65) point = 91; // reset to letter A if letter Z provided
                else if (point === 97) point = 123; // reset to letter a if letter z provided
                return String.fromCodePoint(point - 1);
            }
        },
        "distance": {
            /**
             * @description [Uses levenshteins distance algorithm to determine the distance between 2 strings.]
             * @return {String}        [The string to compare current string with.]
             * @sourcr https://en.wikipedia.org/wiki/Levenshtein_distance
             */
            "leven": function(string1, args) {
                var string2 = args[1];
                // degenerate cases
                if (string1 === string2) return 0;
                if (string1.length === 0) return string2.length;
                if (string2.length === 0) return string1.length;
                // create two work vectors of vareger distances
                var v0 = [], //Array(string2.length + 1),
                    v1 = []; //Array(string2.length + 1);
                // initialize v0 (the previous row of distances)
                // this row is A[0][i]: edit distance for an empty s
                // the distance is just the number of characters to delete from t
                for (var i = 0; i < string2.length + 1; i++) v0[i] = i;
                for (var i = 0; i < string1.length; i++) {
                    // calculate v1 (current row distances) from the previous row v0
                    // first element of v1 is A[i+1][0]
                    //   edit distance is delete (i+1) chars from s to match empty t
                    v1[0] = i + 1;
                    // use formula to fill in the rest of the row
                    for (var j = 0; j < string2.length; j++) {
                        var cost = (string1[i] === string2[j]) ? 0 : 1;
                        v1[j + 1] = Math.min.apply(null, [v1[j] + 1, v0[j + 1] + 1, v0[j] + cost]);
                    }
                    // copy v1 (current row) to v0 (previous row) for next iteration
                    for (var j = 0; j < string2.length + 1; j++) v0[j] = v1[j];
                }
                return v1[string2.length];
            }
        },
        "pad": {
            /**
             * @description [Pads the left and right of the provided string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The amount of characters to bad by.]
             *  @2 {String} [The character to pad with. (default = space character)]
             * @return {String}        [The padded string.]
             */
            "both": function(args) {
                // http://stackoverflow.com/questions/1877475/repeat-character-n-times
                var padding = Array((args[1] || 0) + 1).join(args[2] || " ");
                return padding + this + padding;
            },
            /**
             * @description [Pads the left of the provided string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The amount of characters to bad by.]
             *  @2 {String} [The character to pad with. (default = space character)]
             * @return {String}        [The padded string.]
             */
            "left": function(args) { //times, character) {
                //http://stackoverflow.com/questions/1877475/repeat-character-n-times
                return Array((args[1] || 0) + 1).join(args[2] || " ") + this;
            },
            /**
             * @description [Pads the right of the provided string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The amount of characters to bad by.]
             *  @2 {String} [The character to pad with. (default = space character)]
             * @return {String}        [The padded string.]
             */
            "right": function(args) {
                //http://stackoverflow.com/questions/1877475/repeat-character-n-times
                return this + Array((args[1] || 0) + 1).join(args[2] || " ");
            }
        },
        "parse": {
            /**
             * @description [Parses string to get all the numbers.]
             * @return {Array}        [An array containing all the numbers found in the string.]
             */
            "numbers": function() {
                return (this) ? this.match(/\d+/g) : [];
            },
            /**
             * @description [Returns the first match of a number in the provided string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Boolean} [Flag indicating number should be cast to a number.]
             * @return {String|Number}        [The found number as a string or a number.]
             */
            "number": function(args) {
                var numbers = this.str_parse("!numbers");
                var num = (this && numbers) ? numbers[0] : null;
                // if the second argument is provided we cast the string to number
                return (args[1]) ? +num : num;
            },
            /**
             * @description [Parses HSV color code to return its components in an array.]
             * @return {Array}        [The HSV color components.]
             */
            "hsv": function() {
                return this.str_parse("!rgb", "hsva?");
            },
            /**
             * @description [Parses HSL color code to return its components in an array.]
             * @return {Array}        [The HSL color components.]
             */
            "hsl": function() {
                return this.str_parse("!rgb", "hsla?");
            },
            /**
             * @description [Parses HWB color code to return its components in an array.]
             * @return {Array}        [The HWB color components.]
             */
            "hwb": function() {
                return this.str_parse("!rgb", "hwba?");
            },
            /**
             * @description [Parses rgb color code to return its components in an array.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The type of color code to filter. (rgb, hsl, hsv, hwb)]
             * @return {Array}        [The rgb color components.]
             */
            "rgb": function(args) {
                var type = args[1];
                var string = this;
                // must start with rgb and end with a )
                if (!string.str_is("!swith", ["rgb", "hsl", "hsv", "hwb"]) || !string.str_is("!ewith", [")", ");"])) return 11;
                // split by the comma
                // rgba(0, 1, 1, 1)
                // length must be 3 or 4
                var parts = string.split(",");
                if (!parts.length.num_val("!range", 3, 4)) return 22;
                // go through each part
                // set the search term into the map
                // var r_map = {};
                // r_map[ (((!type) ? "rgba?" : type) + "\\(|\\s") ] = "";
                // var _1 = parts[0].trim().str_replace("!all", r_map),
                var _1 = parts[0].trim().replace(new RegExp((((!type) ? "rgba?" : type) + "\\(|\\s")), ""),
                    _2 = parts[1].trim().replace(/([\%|\s]+)?$/, ""),
                    _3 = parts[2].trim().replace(/([\%|\s]+)?\);?$/, ""),
                    _4 = (parts[3] || "").trim().replace(/([\s]+)?\);?$/, "");
                var one = _1.str_is("!numeric");
                var two = _2.str_is("!numeric");
                var three = _3.str_is("!numeric");
                var four = (parts[3]) ? _4.str_is("!numeric") : true;
                if (
                    (!one || !(+_1).num_val("!range", 0, 255)) || (!two || !(+_2).num_val("!range", 0, 255)) || (!three || !(+_3).num_val("!range", 0, 255)) || (!four || !(+_4).num_val("!range", 0, 255))) return 33;
                return [_1, _2, _3, (_4 || "1")];
            },
            /**
             * @description [Parses URL string to return its URL components.]
             * @return {Object}        [The object containing the URL components.]
             */
            "url": function() {
                var string = this;
                var update = function(update_map) {
                    var _ = this,
                        val;
                    for (var key in update_map) {
                        // if the first char is a colon we cache the val to return later
                        if (key.charAt(0) === ":") {
                            val = update_map[key]
                            _[key.slice(1)] = update_map[key];
                        } else {
                            _[key] = update_map[key];
                        }
                    }
                    return val;
                };
                // get the tld list from the global scope
                var tlds_array = window.suffix_list,
                    S = this;
                // #1 Split the string by the illegal chars
                var illegal = "`\"<> ".split(""),
                    indices = [],
                    parts = [],
                    str = "";
                for (var i = 0, l = string.length; i < l; i++) {
                    if (illegal.indexOf(string[i]) > -1) {
                        indices.push(string[i], i);
                        parts.push({
                            "string": str,
                            "illegal": string[i],
                            "valid": true,
                            "scheme": null,
                            "www": null,
                            "protocol": null,
                            "suffix": null,
                            "update": update
                        });
                        str = "";
                        continue;
                    }
                    str += string[i];
                }
                // #1.5 Get the last string
                // check to see if it is the last character
                // get the last illegal char from the indices
                // if they dont match we need to get the last string
                if (indices[(indices.length) - 2] !== string.str_grab("!right", 1)) {
                    parts.push({
                        "string": string.substring(indices[indices.length - 1] + 1, string.length),
                        "illegal": "",
                        "valid": true,
                        "scheme": null,
                        "www": null,
                        "protocol": null,
                        "suffix": null,
                        "update": update
                    });
                }
                var scheme_list = ["https://", "http://", "file://", "ftp://", "sftp://", "mysql://", "mailto://", "data:", /*camera Real Time Streaming Protocol*/ "rtsp://", /*microsoft media server*/ "mms://", "hdfs://", "s3://", "s3n://", "s3bfs://", "www."];
                // ^START LOOP
                for (var i = 0, l = parts.length; i < l; i++) {
                    var O = parts[i],
                        url = O["string"];
                    // **********
                    // #2 Left side; Find the prefix; any illegal chars before the scheme or "www."
                    // **********
                    // to find the prefix we first check if there is a scheme or "www."
                    var scheme = url.str_ff(scheme_list),
                        prefix;
                    // **********
                    // #2.1 Base64 Check;
                    // **********
                    // check here before anything else if the url is Base64
                    if (scheme = "data:" && url.str_grab("!left", 5) === "data:") {
                        // check if it is in base64 data url format
                        if (url.str_is("!base64_url")) {
                            O.update({
                                "url": url
                            });
                        } else {
                            O.update({
                                "url": url,
                                "valid": "NOT_VALID_BASE64_DATA_URL"
                            });
                        }
                        continue;
                    }
                    if (scheme) {
                        // if we have a scheme we set anything before it as the prefix
                        prefix = url.substr(0, url.indexOf(scheme));
                        if (scheme !== "www.") {
                            O.update({
                                "scheme": scheme,
                                "protocol": scheme.str_chomp("!right", "://")
                            });
                        } else { // "www." was found
                            O.update({
                                "www": true
                            });
                        }
                    } else {
                        // if no "www." or scheme exists we just match any illegally prefixed chracters
                        // ?? this could be a simple url like google.com
                        // illegal chars list for ReGex >> http://stackoverflow.com/questions/5105143/list-of-all-characters-that-should-be-escaped-before-put-in-to-regex
                        prefix = (url.match(/^[`~\!@#\$%\^&\*\(\)_\-\+\=\[\]\{\}\|\\\;\:\'\",\.\<\>/\?\d]+/) || [null])[0];
                    }
                    url = O.update({
                        "prefix": prefix,
                        ":url": url.str_chomp("!left", prefix) // => this will return the url; in essence resetting it
                    });
                    // **********
                    // #3 Right side; Find any punctuation::suffix; any illegal chars found at the end of the string
                    // **********
                    var suffix = (url.match(/[\`\!\)\[\]\}\;\:\'\"\<\>\,\.\?]+$/) || [null])[0];
                    if (suffix) url = url.str_chomp("!right", suffix);
                    url = O.update({
                        "suffix": suffix,
                        "slash": (((url.str_grab("!right", 1) === "/")) ? false : true), // true means we added a slash
                        ":url": url.str_ensure("!right", "/") // => this will return the url; in essence resetting it
                            // we add a forwardslash to help locate the tld in the next step. It will be removed in the path check later
                    });
                    // **********
                    // #4 Find the ending TLD
                    // **********
                    // get the ip address
                    var ip_regex_array = [
                            ["ipv6_ipv4_port", "(://|@)\\[(([a-f0-9]{0,4}(%[a-z0-9]{1,})?:){1,6})((\\d{1,3}\\.){3})((\\d{1,3}\\]:))"],
                            ["ipv6_port", "(://|@)(([a-f0-9]{0,4}(%[a-z0-9]{1,})?:){1,6})((\\d{1,3}\.){3})((\\d{1,3}\\/))"],
                            ["ipv6_ipv4", "(://|@)\\[(([a-f0-9]{0,4}:){1,7})(([a-f0-9]{0,4}){1})((%[a-z0-9]{1,})?){1}(\\]:)"],
                            ["ipv6", "(://|@)(([a-f0-9]{0,4}:){1,7})(([a-f0-9]{0,4}){1})(\\/|(%[a-z0-9]{1,})\\/){1}"],
                            ["ipv4_port", "(://|@)((\\d{1,3}\\.){3})((\\d{1,3}:){1})" /*|| (://|@)((\d{1,3}\.){3})((\d{1,3}:){1})((\d{1,5}\/){1})*/ ],
                            ["ipv4", "(://|@)((\\d{1,3}\\.){3})((\\d{1,3}){1})(\\/){1}"]
                        ],
                        ip, r, ip_match;
                    // loop through the ip ReGex array to find a possible ip address
                    for (var j = 0, ll = ip_regex_array.length; j < ll; j++) {
                        r = new RegExp(ip_regex_array[j][1], "gi");
                        var ip_array = [];
                        url.replace(r, function() {
                            var args = arguments,
                                ip_s_index, ff;
                            ip_match = args[0];
                            if (ip_match.length > 3 && S.is_ip(ip_match)) {
                                ip = ip_match;
                                ip_s_index = args[args.length - 2];
                                ff = S.first_found(ip_match, ["://", "@"]);
                                // normalize the ip
                                if (ff) {
                                    ip = S.chomp_left(ip, ff);
                                    ip_s_index = ip_s_index + ff.length;
                                }
                                ip_array.push(ip, ip_s_index, ip_regex_array[j][0]);
                            }
                            return ip;
                        });
                        // if we have an ip we break the loop and continue to the next step
                        if (ip) break;
                    }
                    // get the potential tld matches that are in the form of .com/ || .com:
                    var potential_tlds = [],
                        potential_tlds_indices = [],
                        S = this,
                        stop;
                    // find the possible tlds
                    var possible_tlds = (url.match(/\.([^\~\`\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\{\}\\\|\;\:\'\"\,\<\>\/\?])+[\/|:/]/gi) || []);
                    // stop_l = false;
                    if (possible_tlds.length) {
                        // see how many tlds were captured
                        for (var j = 0, ll = possible_tlds.length; j < ll; j++) {
                            // loop thorugh each possible_tlds set
                            var current_tld_p = possible_tlds[j],
                                last_char = current_tld_p.str_grab("!right", 1),
                                current_tld_p = possible_tlds[j].str_chomp("!right", ":").str_chomp("!right", "/").str_chomp("!left", "."),
                                current_tld_set = current_tld_p.split("."),
                                current_tld_set_2 = current_tld_p.split(".");
                            // split each and loop
                            for (var k = 0, lll = current_tld_set.length; k < lll; k++) {
                                // remove the first in array after the first ietration
                                if (k !== 0) {
                                    current_tld_set_2.shift();
                                    current_tld_p = current_tld_set_2.join(".");
                                }
                                // get the first char and get the list
                                var list_ptld = tlds_array[current_tld_p.charAt(0)];
                                if (list_ptld && list_ptld.indexOf("." + current_tld_p) > -1 && !current_tld_p.str_is("!numeric")) {
                                    // add to the potentials
                                    potential_tlds = ["." + current_tld_p + last_char];
                                    potential_tlds_indices = [url.indexOf("." + current_tld_p + last_char)];
                                    // break out of loop
                                    k = j = Infinity; // stop both loops
                                }
                            }
                        }
                    }
                    // if no ip address or tld is found turn invalid; everything else to null
                    if (!ip_array.length && !potential_tlds.length) {
                        // set everything to null
                        O.update({
                            "valid": "NO_TLD_or_IP",
                            "tld": null,
                            "ip": null,
                            "ip_prefix": null,
                            "ip_type": null
                        });
                        break;
                    }
                    if (ip_array[1] && (ip_array[1]) < (potential_tlds_indices[0] || url.length)) { // ip comes before tld
                        var ip_start_index = ip_array[1],
                            path;
                        O.update({
                            "tld": null,
                            "port": null,
                            "ip_prefix": null,
                            "path": ("/" + url.substring(ip_start_index + ip.length, url.length)),
                            "url": (url.substring(0, ip_start_index + ip.length)),
                            "ip_type": ((ip_array[0].indexOf("6") > -1) ? "6" : "4")
                        });
                        // If the last character is : we have a port
                        if (ip.str_grab("!right", 1) === ":") {
                            var port_end_index = url.indexOf("/", ip_start_index + ip.length);
                            url = O.update({
                                "port": (url.substring(ip_start_index + ip.length, port_end_index)),
                                "path": (url.substring(port_end_index, url.length)),
                                ":url": (url.substring(0, ip_start_index + ip.length))
                            });
                        }
                        // get the new updated path
                        // path = O["path"].str_chomp("!left", "/");
                        path = (O["path"]);
                        // split and check if the first item is a number
                        var path_parts = path.split("/"),
                            prefix = path_parts[0],
                            is_num = prefix.str_is("!numeric"),
                            ip_type = O["ip_type"];
                        if (is_num && ((ip_type === "6" && prefix * 1 <= 128) || (ip_type === "4" && prefix * 1 <= 32))) {
                            O.update({
                                "ip_prefix": prefix
                            });
                            path_parts.shift(); // remove the prefix from the path_parts
                            path = O.update({
                                ":path": ("/" + path_parts.join("/"))
                            });
                        }
                        // check for auth info before removing it in the later chomps
                        // var has_at = ip.str_is("!in", "@");
                        // final url reset [1]::START
                        url = url.str_chomp("!right", ip);
                        // remove any of the unwated chars from the ip
                        ip = ip.str_chomp("!left", "[");
                        ip = ip.str_chomp("!right", "/");
                        ip = ip.str_chomp("!right", ":");
                        ip = ip.str_chomp("!right", "]");
                        url = O.update({
                            "ip": ip,
                            ":url": (url.str_ensure("!right", "{{__ip__}}")) // => this will return the url; in essence resetting it
                        });
                    } else if (potential_tlds_indices[0] && (potential_tlds_indices[0] < (ip_array[1] || url.length))) { // tld comes before ip
                        // cache the matched tld
                        var tld = potential_tlds[0],
                            current_tld_index = potential_tlds_indices[0];
                        path = O.update({
                            ":path": (url.substring(current_tld_index + tld.length - 1, url.length))
                        });
                        url = O.update({
                            ":url": (url.substring(0, current_tld_index + tld.length)), // => this will return the url; in essence resetting it
                            "tld": tld
                        });
                    }
                    // **********
                    // #5 Find the auth userinfo
                    // **********
                    // skip failed urls
                    if (O["valid"] !== true) continue;
                    // find the first "@"
                    var first_at = url.lastIndexOf("@");
                    // if an @ exists...it must have a scheme
                    if (first_at > -1 && scheme) {
                        // get the string between the scheme and the at
                        var userinfo_start = url.indexOf(scheme),
                            userinfo_end = first_at,
                            userinfo = url.substring(userinfo_start, userinfo_end).str_chomp("!left", scheme);
                        // split the string at the first colon
                        var user_info_parts = userinfo.split(":");
                        // reset the url to everything after the @; e.g. http://a:p@www.google.com => www.google.com/
                        url = url.substring(first_at + 1, url.length);
                        url = O.update({
                            "username": (user_info_parts[0] || null),
                            "password": (user_info_parts[1] || null),
                            "userinfo": ((userinfo === ":") ? null : userinfo),
                            ":url": ((url === "{{__ip__}}") ? O["ip"] : url) // => this will return the url; in essence resetting it
                        });
                    } else {
                        // needs a scheme; if auth is given it must also have a scheme
                        url = O.update({
                            "username": null,
                            "password": null,
                            "userinfo": null,
                            "valid": ((first_at > -1 && !scheme) ? "AUTH_NO_SCHEME" : true),
                            ":url": ((url.str_grab("!right", 10) === "{{__ip__}}") ? O["ip"] : url) // => this will return the url; in essence resetting it
                        });
                    }
                    // **********
                    // #6 Find the domain name
                    // **********
                    // if we have a url...
                    // skip failed urls
                    if (O["valid"] !== true) continue;
                    if (!O["ip"]) {
                        var url_parts = url.str_chomp("!right", tld).str_chomp("!left", scheme).split("."),
                            host_name = [],
                            valid_subdomains = [],
                            invalid_sub;
                        // remove the first item if it is www from the array outside the loop
                        if (url_parts[0] === "www") url_parts.shift();
                        O.update({
                            "domain": null,
                            "subdomains": null
                        });
                        // get the domain which is the last item in the array
                        var domain = url_parts.pop();
                        // if no url_parts length at this point we might have somethin like "http://www.google"
                        // where no tld was given
                        // if (!url_parts.length) {
                        //     O.update({
                        //         "valid": "MISSING_TLD"
                        //     });
                        //     continue;
                        // }
                        if (string.str_is_domain(domain)) {
                            O.update({
                                "domain": domain
                            });
                        } else {
                            O.update({
                                "valid": "INVALID_DOMAIN"
                            });
                            continue;
                        }
                        if (url_parts.length) { // subdomains are left
                            // loop through the url parts and check for any invalidities
                            for (var j = 0, ll = url_parts.length; j < ll; j++) {
                                var current_subdomain = url_parts[j];
                                if (current_subdomain.str_is("!domain")) valid_subdomains.push(current_subdomain);
                                else {
                                    invalid_sub = true;
                                    O.update({
                                        "valid": "INVALID_SUBDOMAIN; " + current_subdomain
                                    });
                                    break;
                                }
                                if (j === ll - 1) O.update({
                                    "subdomains": valid_subdomains
                                });
                            }
                            if (invalid_sub) continue;
                        }
                    }
                    // **********
                    // #7 Find the port
                    // **********
                    // get the list of common default port numbers to schemes
                    // skip failed urls
                    if (O["valid"] !== true) continue;
                    if (!O["ip"] && path.length > 1) { // skip no-paths => "/"
                        if (path.charAt(0) === ":") {
                            var port = path.slice(1).split("/", 1)[0];
                            // port must be between 1 and 65,535
                            if (port.str_is("!numeric") && (port > 0 && port < 65536)) {
                                O.update({
                                    "port": port
                                });
                            } else {
                                O.update({
                                    "port": null,
                                    "valid": "INVALID_PORT_NUMBER"
                                });
                            }
                            path = O.update({
                                ":path": (path.slice(port.length + 1))
                            });
                            url = O.update({
                                ":url": (url.str_chomp("!right", ":" + port + "/") + "/")
                            });
                        }
                    }
                    // **********
                    // #8 Reset path traling slash; ?? validate path here
                    // **********
                    // skip failed urls
                    if (O["valid"] !== true) continue;
                    // reset the path depending on the slash
                    if (O["slash"]) {
                        path = O.update({
                            ":path": ((path === "/") ? path : path.str_chomp("!right", "/"))
                        });
                    }
                    delete O["slash"];
                    // **********
                    // #9 Get the query
                    // **********
                    // skip failed urls
                    if (O["valid"] !== true) continue;
                    var query_index = path.indexOf("?");
                    O["query"] = O["parameters"] = null;
                    if (query_index > -1) {
                        var query = path.substring(query_index + 1, path.length);
                        O.update({
                            "query": query
                        });
                        // get the parameters into a map
                        var query_parts = query.split("&"),
                            parameters = {};
                        for (var j = 0, ll = query_parts.length; j < ll; j++) {
                            var parameter = query_parts[j].split("=");
                            parameters[parameter[0]] = parameter[1];
                        }
                        // add the map to the object
                        O.update({
                            "parameters": parameters
                        });
                    }
                    // **********
                    // #10 Get the fragment aka "#"
                    // **********
                    // skip failed urls
                    if (O["valid"] !== true) continue;
                    var fragment_index = path.lastIndexOf("#");
                    O.update({
                        "fragment": null
                    });
                    if (fragment_index > -1) {
                        var fragment = path.substring(fragment_index, path.length);
                        O.update({
                            "fragment": (fragment.slice(1))
                        });
                        // reset the path; remove the fragment
                        O.update({
                            "path": (path.str_chomp("!right", fragment))
                        });
                    }
                }
                // <scheme>://<username>:<password>@<host>:<port>/<path>;<parameters>?<query>#<fragment>
                return parts;
                //http://www.the-art-of-web.com/javascript/escape/
                // #Version 2015092300, Last Updated Wed Sep 23 07:07:01 2015 UTC => http://data.iana.org/TLD/tlds-alpha-by-domain.txt
                // this is the domain name
                // only non word chracter allowed is an underscore
                /*
                Regardless of the extension, all domain names must follow the same character rules...
                You can use letters (abc), numbers (123) and dashes/hyphens (---).
                Spaces are not allowed and the domain can't begin or end with a dash.
                A little known fact is that you CAN have multiple dashes right next to each other.
                http://stackoverflow.com/questions/7111881/what-are-the-allowed-characters-in-a-sub-domain
                */
                //http://mozgovipc.blogspot.com/2010/11/jquery-javascript-how-to-sort-string.html
                //http://data.iana.org/TLD/tlds-alpha-by-domain.txt
                //http://www.iana.org/domains/root/db
                //http://www.skorks.com/2010/05/what-every-developer-should-know-about-urls/
            }
        },
        "repeat": {
            /**
             * @description [Copies the provided text the provided amount of times.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The amount of times the string should be repeated.]
             * @return {String}        [The string repeated N amount of times.]
             */
            "text": function(args) {
                // create an empty array then populate it with the provided string
                return Array((args[1] || 0) + 1).join(this || " ");
            }
        },
        "replace": {
            /**
             * @description [This is the default and can either be a map or a single needle. This replace
             *               method can only be passed string key and string value pairs.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Object} [Object map containing text and replacement strings.]
             * @return {String}        [The string undergone replacement.]
             */
            "all": function(args) {
                var string = this;
                var needle_map = args[1];
                // var replacement_map = {};
                // // if the provided input is a string and replacement...
                // // we turn it into a replacement_map
                // if (typeof needle_map === "string") {
                //     replacement_map[needle_map] = needle_replacement;
                // }else replacement_map = needle_map;
                // var replacement_map = needle_map;
                // now we loop through all the needles and replace them in the string
                //https://msdn.microsoft.com/en-us/library/2yfce773(v=vs.94).ASPX
                //http://stackoverflow.com/questions/5105143/list-of-all-characters-that-should-be-escaped-before-put-in-to-regex
                var specialChars = ".\+*?[^]$(){}=!<>|:-".split("");
                return string.replace(new RegExp(
                    // we make sure to escape special characters
                    Object.keys(needle_map).map(function(character) {
                        // (specialChars.indexOf(character) !== -1) ? "\\" + character : character);
                        return (specialChars.indexOf(character) !== -1) ? "\\" + character : character;
                    }).join("|") //join all the needles with a pipe => /needle1|needle2/
                    , "g"), function(key) {
                    return needle_map[key];
                });
            },
            /**
             * @description [Uses provided map replacement object to replace any matches in provided string.
             *               This replace method can be passed RegExp patterns.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Object} [Object map containing text and replacement RegExp strings.]
             * @return {String}        [The string undergone replacement.]
             */
            "raw": function(args) {
                var replacement_map = args[1];
                var l = Object.keys(replacement_map).length;
                var string = this;
                for (var i = 0; i < l; i++) {
                    string = string.replace(new RegExp(replacement_map[i][1], replacement_map[i][2]), replacement_map[i][0]);
                }
                return string;
            },
            /**
             * @description [Replaces only from the left of the provided string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The needle string to find in provided string.]
             *  @1 {String} [The string to use as the replacement.]
             * @return {String}        [The string undergone replacement.]
             */
            "left": function(args) {
                return this.replace(new RegExp("^(" + args[1] + ")+", "g"), (args[2] || ""));
            },
            /**
             * @description [Replaces only from the right of the provided string.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The needle string to find in provided string.]
             *  @1 {String} [The string to use as the replacement.]
             * @return {String}        [The string undergone replacement.]
             */
            "right": function(args) {
                return this.replace(new RegExp("(" + args[1] + ")+$", "g"), (args[2] || ""));
            }
        },
        "strip": {
            /**
             * @description [Strips provided string of all accents.]
             * @return {String}        [The string with the accents removed.]
             */
            "accents": function() {
                var latin_map = constants.LATIN_MAP,
                    new_string = [],
                    string = this;
                for (var i = 0, l = string.length; i < l; i++) {
                    var lookup = latin_map[string[i]];
                    if (lookup) new_string.push(lookup);
                    else new_string.push(string[i]);
                }
                return new_string.join("");
            },
            /**
             * @description [Removes all punctiation from the provided string.]
             * @return {String}        [The string with punctuation removed.]
             */
            "punctuation": function() {
                // replace everything but letters and numbers
                return this.replace(/[^a-z\d\s\xa0]+/gi, "").replace(/\s+/g, " ");
            },
            /**
             * @description [Replaces all tags or only the provided tag type.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The tags to strip string of. (i.e. "b|a|div")]
             * @return {String}        [The string with tags removed.]
             */
            "tags": function(args) {
                var string = this;
                var tag_type = args[1];
                return (tag_type) ? string.replace(new RegExp("<(/)?(" + tag_type + ")>", "gi"), "") : string.replace(/\<(\/)?[a-z]+\>/gi, "");
                // return (tag_type) ? string.replace(new RegExp("<\(/\)?" + tag_type + ">", "gi"), "") : string.replace(/\<(\/)?[a-z]+\>/gi, "");
                // if (tag_type) return a.replace(new RegExp("<[" + tag_type + "|/]+>", "gi"), "");
                // return string.replace(/<[\w|/]+>/g, "");
            }
        },
        "trim": {
            /**
             * @description [Trims the inside of the string. Does not touch the left/right sides.]
             * @return {String}        [The string with its inners trimmed.]
             */
            "inner": function() {
                var string = this;
                var cleared = string.str_clear("!space");
                var left = string.match(/^\s+/) || [];
                if (left.length) cleared = left[0] + cleared;
                var right = string.match(/\s+$/) || [];
                if (right.length) cleared = cleared + right[0];
                return cleared;
            },
            /**
             * @description [Trims left side of provided string.]
             * @return {String}        [The string with its left trimmed.]
             */
            "left": function() {
                return this.replace(/^[\s\xa0]+/, "");
            },
            /**
             * @description [Trims right side of provided string.]
             * @return {String}        [The string with its right trimmed.]
             */
            "right": function() {
                return this.replace(/[\s\xa0]+$/, "");
            }
        },
        "truncate": {
            /**
             * @description [Truncates string based on the provided characters count.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The amount of characters to keep after truncating.]
             *  @2 {String} [The ending. (ellipses are uses as the default)]
             * @return {String}        [The truncated string.]
             */
            "by_chars": function(args) {
                var string = this;
                var substr = string.substr(0, args[1]),
                    ending = args[2] || "...";
                var next_char = string[args[1]];
                //no more spaces, single word left
                if (substr === string) {
                    return string;
                } else if (next_char === " ") {
                    return substr + ending;
                } else {
                    // its part of a word...
                    var last_space_index = substr.lastIndexOf(" ");
                    if (last_space_index !== -1) {
                        substr = substr.substr(0, last_space_index);
                        return substr.str_trim("!right") + ending;
                    }
                }
                return ending;
            },
            /**
             * @description [Truncates string based on the provided word count.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {String} [The amount of words to keep after truncating.]
             *  @2 {String} [The ending. (ellipses are uses as the default)]
             * @return {String}        [The truncated string.]
             */
            "by_words": function(args) {
                var string = this;
                var substr = string.str_clear("!space").split(" "),
                    ending = args[2] || "...",
                    new_string = [],
                    counter = 0,
                    cached_spaces = string.match(/[\s\xa0]+/g);
                for (var i = 0, l = Math.min.apply(null, [args[1], substr.length]); i < l; i++) {
                    new_string.push(substr[i]);
                }
                new_string = (substr.length > new_string.length) ? new_string.join(" ") + ending : new_string.join(" ");
                return new_string.replace(/[\s]/g, function(entity) {
                    return cached_spaces[counter++];
                });
            }
        },
        "val": {
            /**
             * @description [Checks if number is bigger than or equal to the provided number.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The minimum the provided number should be.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "min": function(args) {
                return (this >= args[1]) ? true : false;
            },
            /**
             * @description [Checks if number is less than or equal to the provided number.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The maximum the provided number should be.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "max": function(args) {
                return (this <= args[1]) ? true : false;
            },
            /**
             * @description [Checks if number is between the provided min and max numbers.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The minimum the provided number should be.]
             *  @1 {Number} [The maximum the provided number should be.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "range": function(args) {
                return (this.num_val("min", args[1]) && this.num_val("max", args[2])) ? true : false;
            },
            /**
             * @description [Checks if number matches the provided number.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Number} [The minimum the provided number should be.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "exact": function(args) {
                return (this === args[1]) ? true : false;
            },
            /**
             * @description [Checks if number matches any of the numbers in provided array.]
             * @param  {ArgumentsObject} args [The argument object containing the provided parameters.]
             *  @1 {Array} [The list of matches the provided number can match.]
             * @return {Boolean}        [True = passed check, otherwise false.]
             */
            "list": function(args) {
                return (args[1].indexOf(this) > -1) ? true : false;
            }
        }
    };
})();
