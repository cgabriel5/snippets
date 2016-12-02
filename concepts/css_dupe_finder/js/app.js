/* jshint shadow:true */
/* jshint bitwise: false */
// http://jshint.com/docs/options/#shadow

document.onreadystatechange = function() {

    "use strict";

    /* [functions.utils] */

    function colorizer(string) {

        // universal: strings, comments
        // selector: selectors(class, id, tags), numbers, units, atrules, functions?, keywords
        // property: properties
        // value: hexcolors, numbers, units, functions, keywords, colornames

        var flags = {
            ////////////////////
            "parts": [],
            "counter": -1,
            ////////////////////
            "is": {
                "wrap": null,
                "pair": null
            },
            "string_start": null,
            ////////////////////
            "atsign": null,
            "open": {
                "brace": null
            },
            "brace": {
                "counter": null
            }
        };

        // add 1 to include the last letter character of wanted string
        var include_last_char = 1;

        // pad string to help with edge cases
        string = " " + string + " ";

        // loop over string
        for (var i = 0, l = string.length; i < l; i++) {

            // cache the current character
            var char = string.charAt(i);
            // get the previous char
            var prev_char = string.charAt(i - 1),
                next_char = string.charAt(i + 1);

            // string detection
            if ((-~["\"", "'"].indexOf(char) || char === flags.is.pair) && prev_char !== "\\") {
                if (flags.is.wrap !== "comment") {
                    if (flags.string_start === null && flags.is.wrap === null) {
                        // set flags
                        flags.is.wrap = "string";
                        flags.string_start = i;
                        // must match the same type of quote
                        flags.is.pair = char;
                    } else if (flags.string_start !== null && flags.is.wrap === "string" && flags.is.pair === char) {

                        // store original index to see code clearer
                        var original_index = flags.string_start;

                        // get the string since the open quote
                        var str = string.substring(original_index, (i + include_last_char));
                        // add the string to array
                        flags.parts.push([str, "string"]);
                        // placehold string
                        string = placehold(original_index, string, str);
                        // reset the index
                        i = new_index(original_index);
                        l = string.length;

                        // unset flags
                        flags.is.wrap = null;
                        flags.string_start = null;
                        // must match the same type of quote
                        flags.is.pair = null;
                    }
                }
            }

            // comment detection
            if (((prev_char === "/" && char === "*") || (char === flags.is.pair && next_char === "/"))) {
                if (flags.is.wrap !== "string") {
                    if (flags.string_start === null && flags.is.wrap === null) {
                        // set flags
                        flags.is.wrap = "comment";
                        flags.string_start = i;
                        // must match the same type of quote
                        flags.is.pair = char;
                    } else if (flags.string_start !== null && flags.is.wrap === "comment") {

                        // store original index to see code clearer
                        var original_index = flags.string_start;

                        // get the comment since the open /*
                        var str = string.substring((original_index - 1), (i + (include_last_char * 2)));
                        // add the comment to array
                        flags.parts.push([str, "comment"]);
                        // placehold string
                        string = placehold(original_index, string, str, true /* set is_comment flag */ );
                        // reset the index
                        // move back 1 extra position to compensate for the 2 characters --> /*
                        i = new_index(original_index) - 1;
                        l = string.length;

                        // unset flags
                        flags.is.wrap = null;
                        flags.string_start = null;
                        // must match the same type of quote
                        flags.is.pair = null;
                    }
                }
            }

            // id the end is reached and the flags.string_start is on...there was an unmatched
            // quote or comment. to prevent an infinite loop the index is reset to the next character
            // after the unmatched quote/comment chars so the parsing can continue as normal
            if ((i === (l - 1)) && flags.string_start) {

                // reset the index to skip unmatched ending character.
                // the index will increase naturally when the new
                // iteration begins. this will continue the loop where
                // the unmatched quote was plus 1 position ahead, or the
                // next charcters after the unmatched quote :)
                i = flags.string_start;
                // unset flags
                flags.is.wrap = null;
                flags.string_start = null;
                // must match the same type of quote
                flags.is.pair = null;

            }

        }

        ///////////////////////////
        ///////////////////////////
        ///////////////////////////
        ///////////////////////////

        console.log("string-->" + string);

        // distinguish between selectors and code blocks
        for (var i = 0, l = string.length; i < l; i++) {
            // cache the current character in loop
            var char = string.charAt(i),
                char_code = char.charCodeAt(0);
            var cb = null;

            // look out for these characters: @, {, }, /*, */

            // if (-~["`", " ", "\"", "'"].indexOf(char)) {
            // reset the loop index to the character after the ending tick
            // and skip to the next loop iteration
            if (char === "`") {
                i = string.indexOf("`", i + 1);
                continue;
                // if (i === -1) break; // used to stop infinite loop while debugging
            }

            // check for atsigns
            if (char_code === 64) { // character: @

                // check to see that it is not a one-liner (i.e. @charset, @import, @namespace)
                // get the index of the immediate space after the last letter
                var space_index = string.indexOf(" ", (i + 1)),
                    atrule_name = string.substring((i + 1), space_index);

                // check if artule is a simple one-liner
                if (-~["charset", "import", "namespace"].indexOf(atrule_name)) {
                    // get the index of the next semicolon; meaning the end of the atrule
                    // forward loop all the way to the position of the ending of atrule
                    i = string.indexOf(";", (i + 1)) + 1;

                } else { // all other CSS atrules

                    // // ?????????
                    // only run when there is no active atsign flag
                    // if (flags.atsign) continue;
                    // // ?????????

                    // get the index of the opening brace + set the brace_open flag
                    flags.open.brace = string.indexOf("{", (i + 1));

                    if (flags.open.brace === -1) {
                        // prevent an infinite loop
                        // console.log("no open brace!!");
                        continue;
                    }

                    // set the atsign flag
                    flags.atsign = i;
                    // set the brace counter
                    flags.brace.counter = 1;
                    // forward loop all the way to the position of the start brace
                    i = flags.open.brace;

                    // grab selector (text between atsign and open brace indices)
                    var selector = string.substring(flags.atsign, flags.open.brace).trim();
                    // keep track of the brace indices
                    var brace_indices_track = [i];
                    // the amount of nested (complex "@") levels
                    var nested_levels = 0;

                    // start parsing CSS code block...start by getting the next brace index
                    while (flags.brace.counter) {

                        // get the indices for the next open and closed brace
                        var start_brace_index = string.indexOf("{", i + 1),
                            end_brace_index = string.indexOf("}", i + 1);

                        // place both indices into an array and then filter array to only
                        // have numbers, -1 will be replaced with null, which will then
                        // get pruned out with the filter function
                        // filter(Number): http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript/2843625#2843625
                        var brace_indices = [(!-~start_brace_index ? null : start_brace_index), (!-~end_brace_index ? null : end_brace_index)].filter(Number);

                        // get the lowest index number. this index will be the
                        // closest to the first open brace. if there is no brace at all,
                        // null is returned in place of -1.
                        var next_index = (brace_indices.length) ? Math.min.apply(null, brace_indices) : null;
                        // get the last brace index from stored brace indices
                        var last_index = brace_indices_track[brace_indices_track.length - 1];

                        // increment index by 1 as we do not want to get the opening brace
                        // only want what is bwteen the beaces
                        var between_text_index = last_index + 1;

                        // the text between the last and next brace points. depending on the braces
                        // this could be a selector (simple "s" or complex "@":"x") or a CSS code block
                        var text_between = string.substring(between_text_index, next_index);

                        // get the brace character using the last and next index points
                        var first_brace = string.charAt(last_index);
                        var last_brace = string.charAt(next_index);

                        // check if simple or complex, used later on
                        var type = (text_between.charAt(0) === "@") ? "x" : "s";

                        // the types of possible brace match ups
                        // { { --> Start of block (simple or complex)
                        // { } --> CSS code block
                        // } { --> End of code block, start of new code block
                        // } } --> End of complex block

                        // differentiate between brace match ups
                        if (first_brace === "{" && last_brace === "{") { // child selector
                            // leave alone dont do anything
                        } else if (first_brace === "{" && last_brace === "}") { // code block

                            // set the codeblock flag to true
                            cb = true;
                            // add to array
                            flags.parts.push([text_between, "block"]);
                            // placehold block
                            string = placehold(between_text_index, string, text_between);
                            // reset length and index
                            i = new_index(between_text_index);
                            l = string.length;

                            // placehold block
                            // string = placehold(between_text_index, string, text_between);

                        } else if (first_brace === "}" && last_brace === "{") { // end of code block, start of new code block
                            // leave alone dont do anything
                        } else if (first_brace === "}" && last_brace === "}") { // end of complex code block
                            // leave alone dont do anything
                        }

                        // add the next brace point to track track it
                        brace_indices_track.push(next_index);

                        // if the index matches the start brace "{", increase the brace counter
                        if (start_brace_index === next_index) flags.brace.counter++;
                        // else if the brace is a closing brace "}", decrease the brace counter
                        else if (end_brace_index === next_index) flags.brace.counter--;

                        // forward loop index to the next brace position
                        if (!cb) {
                            i = next_index;
                        } else {
                            cb = null; // turn flag off
                        }

                        // if no more braces are found end the while loop by unsetting the
                        // flags.brace.counter flag
                        if (flags.brace.counter === 0) flags.brace.counter = null; // unset flag

                    }

                    // unset the flag atsign
                    flags.atsign = null;

                }
            }

            // check for braces, this is for simple code blocks
            if (char_code === 123) { // character: {

                // get the indices for the previous closed brace & semicolon
                var end_brace_index = string.lastIndexOf("}", i),
                    semicolon_index = string.lastIndexOf(";", i);

                // place both indices into an array
                // filter(Number): http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript/2843625#2843625
                var prev_indices = [(!-~end_brace_index ? null : end_brace_index), (!-~semicolon_index ? null : semicolon_index)].filter(Number);

                // get the lowest indice in number. this index will be the
                // closest to the first open brace. if there is no brace at all,
                // null is returned in place of -1.
                var prev_index = (prev_indices.length) ? Math.max.apply(null, prev_indices) : null;
                // var prev_index = end_brace_index;

                // finally, get selector from CSS string
                var selector = string.substring(((prev_index) ? (prev_index + 1) : 0), i);

                // increment index by 1 as we do not want to get the opening brace
                // only want what is bwteen the beaces
                var between_text_index = i + 1;

                // get the CSS code block by using the current index + 1 as the start
                // and the closing brace index as the end point
                var text_between = string.substring(between_text_index, string.indexOf("}", (i + 1)));

                // add to array
                flags.parts.push([text_between, "block"]);
                // placehold block
                string = placehold(between_text_index, string, text_between);
                // reset length and index
                i = new_index(between_text_index);
                l = string.length;

            }

        }

        // css browser prefix list: http://stackoverflow.com/questions/5411026/list-of-css-vendor-prefixes
        var prefixes = ["ms", "mso", "moz", "o", "atscwap", "webkit", "khtml", "apple", "prince", "ah", "hp", "ro", "rim", "tc"];
        var colornames = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
        var functions = ["alpha", "annotation", "attr", "blur", "brightness", "calc", "character-variant", "circle", "contrast", "counter", "cross-fade", "cubic-bezier", "drop-shadow", "element", "ellipse", "fit-content", "format", "grayscale", "hsl", "hsla", "hue-rotate", "image", "image-set", "inset", "invert", "leader", "linear-gradient", "local", "matrix", "matrix3d", "minmax", "opacity", "ornaments", "perspective", "polygon", "radial-gradient", "rect", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "rgb", "rgba", "rotate", "rotate3d", "rotatex", "rotatey", "rotatez", "saturate", "scale", "scale3d", "scalex", "scaley", "scalez", "sepia", "skew", "skewx", "skewy", "steps", "styleset", "stylistic", "swash", "symbols", "target-counter", "target-counters", "target-text", "translate", "translate3d", "translatex", "translatey", "translatez", "url", "var", "dir", "lang", "not", "nth-child", "nth-last-child", "nth-last-of-type", "nth-of-type"];
        var tags = ["body", "html", "img", "base", "head", "link", "meta", "style", "title", "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4", "h5", "h6", "hgroup", "nav", "section", "dd", "div", "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre", "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn", "em", "i", "kbd", "mark", "q", "rp", "rt", "rtc", "ruby", "s", "samp", "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "area", "audio", "map", "track", "video", "embed", "object", "param", "source", "canvas", "noscript", "script", "del", "ins", "caption", "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "button", "datalist", "fieldset", "form", "input", "label", "legend", "meter", "optgroup", "option", "output", "progress", "select", "textarea", "details", "dialog", "menu", "menuitem", "summary", "content", "element", "shadow", "template", "acronym", "applet", "basefont", "big", "blink", "center", "command", "content", "dir", "font", "frame", "frameset", "isindex", "keygen", "listing", "marquee", "multicol", "nextid", "noembed", "plaintext", "spacer", "strike", "tt", "xmp"];
        // https://developer.mozilla.org/en-US/docs/Web/CSS/time
        var units = ["em", "ex", "%", "px", "cm", "mm", "in", "pt", "pc", "ch", "rem", "vh", "vw", "vmin", "vmax", "s", "ms"];
        // @-rules https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
        var atrules = ["charset", "import", "namespace", "media", "supports", "document", "page", "font-face", "keyframes", "viewport", "counter-style", "font-feature-values", "swash", "ornaments", "annotation", "stylistic", "styleset", "character-variant"];
        // http://www.w3schools.com/cssref/css_selectors.asp
        var operators = ["~", "*", "=", ">", "+", "|", "^", "$", "~=", "|=", "^=", "$=", "*="];
        var keywords = ["!important", ":active", ":after", ":before", ":checked", ":disabled", ":empty", ":enabled", ":first-child", ":first-letter", ":first-line", ":first-of-type", ":focus", ":hover", ":in-range", ":invalid", ":last-child", ":last-of-type", ":link", ":only-of-type", ":only-child", ":optional", ":out-of-range", ":read-only", ":read-write", ":required", ":root", ":selection", ":target", ":valid", ":visited"];
        // css property list: http://www.blooberry.com/indexdot/css/propindex/all.htm
        // unique array: http://stackoverflow.com/questions/6940103/how-do-i-make-an-array-with-unique-elements-i-e-remove-duplicates/23282067#23282067
        var properties = ["accelerator", "azimuth", "background", "background-attachment", "background-color", "background-image", "background-position", "background-position-x", "background-position-y", "background-repeat", "behavior", "border", "border-bottom", "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-style", "border-top-width", "border-width", "bottom", "caption-side", "clear", "clip", "color", "content", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "elevation", "empty-cells", "filter", "float", "font", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "height", "ime-mode", "include-source", "layer-background-color", "layer-background-image", "layout-flow", "layout-grid", "layout-grid-char", "layout-grid-char-spacing", "layout-grid-line", "layout-grid-mode", "layout-grid-type", "left", "letter-spacing", "line-break", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "max-height", "max-width", "min-height", "min-width", "-moz-binding", "-moz-border-radius", "-moz-border-radius-topleft", "-moz-border-radius-topright", "-moz-border-radius-bottomright", "-moz-border-radius-bottomleft", "-moz-border-top-colors", "-moz-border-right-colors", "-moz-border-bottom-colors", "-moz-border-left-colors", "-moz-opacity", "-moz-outline", "-moz-outline-color", "-moz-outline-style", "-moz-outline-width", "-moz-user-focus", "-moz-user-input", "-moz-user-modify", "-moz-user-select", "orphans", "outline", "outline-color", "outline-style", "outline-width", "overflow", "overflow-X", "overflow-Y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "pause", "pause-after", "pause-before", "pitch", "pitch-range", "play-during", "position", "quotes", "-replace", "richness", "right", "ruby-align", "ruby-overhang", "ruby-position", "-set-link-source", "size", "speak", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "table-layout", "text-align", "text-align-last", "text-decoration", "text-indent", "text-justify", "text-overflow", "text-shadow", "text-transform", "text-autospace", "text-kashida-space", "text-underline-position", "top", "unicode-bidi", "-use-link-source", "vertical-align", "visibility", "voice-family", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "zoom", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "background-blend-mode", "background-clip", "background-origin", "background-size", "border-radius", "border-bottom-left-radius", "border-bottom-right-radius", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-top-left-radius", "border-top-right-radius", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "font-kerning", "font-variant-ligatures", "font-variant-caps", "font-variant-numeric", "image-rendering", "isolation", "mix-blend-mode", "motion-offset", "motion-path", "motion-rotation", "object-fit", "object-position", "opacity", "outline-offset", "overflow-wrap", "overflow-x", "overflow-y", "pointer-events", "resize", "tab-size", "text-rendering", "text-size-adjust", "touch-action", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "will-change", "appearance", "backface-visibility", "border-horizontal-spacing", "border-image", "border-vertical-spacing", "box-align", "box-decoration-break", "box-direction", "box-flex", "box-flex-group", "box-lines", "box-ordinal-group", "box-orient", "box-pack", "box-reflect", "clip-path", "column-count", "column-gap", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "align-content", "align-items", "align-self", "flex-flow", "flex-basis", "flex-grow", "flex-shrink", "flex-direction", "flex-wrap", "flex-pack", "flex-line-pack", "flex-align", "flex-order", "justify-content", "font-smoothing", "highlight", "hyphens", "hyphenate-character", "line-clamp", "locale", "margin-before-collapse", "margin-after-collapse", "mask-box-image", "mask-box-image-outset", "mask-box-image-repeat", "mask-box-image-slice", "mask-box-image-source", "mask-box-image-width", "mask-clip", "mask-composite", "mask-image", "mask-origin", "mask-position", "mask-repeat", "mask-size", "order", "perspective", "perspective-origin", "print-color-adjust", "rtl-ordering", "shape-outside", "shape-image-threshold", "shape-margin", "tap-highlight-color", "text-combine", "text-decorations-in-effect", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-fill-color", "text-orientation", "text-security", "text-stroke-color", "text-stroke-width", "transform", "transform-origin", "transform-style", "user-drag", "user-modify", "user-select", "app-region", "buffered-rendering", "clip-rule", "mask", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "marker-end", "marker-mid", "marker-start", "mask-type", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "alignment-baseline", "baseline-shift", "dominant-baseline", "text-anchor", "vector-effect", "paint-order", "d", "cx", "cy", "x", "y", "r", "rx", "ry", "touch-callout"];

        // console.log(">>>", string);
        string = parser(string, "selectors", flags);

        // string = parser(string, "code_blocks");

        function parser(string, mode, flags) {

            // loop over string
            for (var i = 0, l = string.length; i < l; i++) {

                // cache the current character
                var char = string.charAt(i),
                    prev_char = string.charAt(i - 1),
                    next_char = string.charAt(i + 1);

                // console.log("<<<<<<<<<<<<<<<<<<<<<<", i, char);

                if (char === "@") { // atrule

                    // get the forward index
                    var findex = forward(i, string, /[^a-z\-]/i);
                    // get the fastforwarded string
                    var atrule = string.substring(i, (findex + include_last_char));
                    // add to array
                    flags.parts.push([atrule, "atrule"]);
                    // placehold atrule
                    string = placehold(i, string, atrule);
                    // reset the index
                    i = new_index(i);
                    l = string.length;

                }

            }

            // return string without the added initial padding
            return string.replace(/^\s{1}|\s{1}$/g, "");;
        }

        function new_index(index) {
            var new_position = (index + (flags.counter.toString().length + 2));
            // however, it needs to be decreased by 1 as it naturally gets
            // incremented after every iteration. therefore, leaving it as it
            // would forward it one position, or character.
            return (new_position - 1);
        }

        function counter_to_string() {
            return (flags.counter.toString().length + 2);
        }

        function placehold(index, string, str, is_comment) {
            var start = string.substring(0, (!is_comment ? index : (index - 1)));
            var placeholder = "`" + (++flags.counter) + "`";
            var end = string.substring((index + (!is_comment ? str.length : (str.length - 1))), string.length);
            // reset the string with the placeholder
            return (start + placeholder + end);
        }

        function reverse(index, string, pattern) {
            // loop backwords until pattern is false
            for (var i = index - 1; i > -1; i--) {
                // we add 1 to the returned index because the return happens on the
                // characters that does not pass the pattern test. therefore, we add
                // 1 because the next char (to its right) is the last char that did
                // pass the test
                if (pattern.test(string.charAt(i))) return i + 1;
            }
            // else return the provided index
            return index;
        }

        function forward(index, string, pattern) {
            // fastforward until anything pattern is false
            for (var i = index + 1; i < string.length; i++) {
                // remove 1 from index to not include the character that
                // broke the pattern. we do not want that character
                if (pattern.test(string.charAt(i))) return i - 1;
            }
            // else return the provided index
            return index;
        }
        console.log("string: \"" + string + "\"");
        // remove place holders with HTML
        return string.replace(/`\d+`/g, function() {
            var info = flags.parts[(arguments[0].replace(/`/g, "") * 1)];
            var type = info[1]
            var string;
            string = "<span class=\"lang-css-" + info[1] + "\">" + info[0] + "</span>";
            return string;
        });

    }

    /**
     * @description [Cleans up the CSS dupe blocks by prettifying them (adds proper code
     *               indentation).]
     * @param  {Array} blocks [The array of dupe code blocks.]
     * @return {Array}        [The formated dupe code blocks.]
     */
    function format(blocks) {

        // formated blocked container
        var formated = [];

        // loop over blocks
        for (var i = 0, l = blocks.length; i < l; i++) {

            var block = blocks[i],
                selector = block[0],
                selectors = selector.split(" / "),
                // var css_text = block[1];
                dupes = block[2][0],
                // calculate the CSS block indentation by simply repeating
                // the \t (tab) character
                indentation = Array((selectors.length) + 1).join("\t");

            // build the selector
            var build = [],
                ending_braces = [],
                indent;
            for (var j = 0, ll = selectors.length; j < ll; j++) {
                // calculate the selector indentation
                indent = (Array((j) + 1).join("\t"));
                // add indented selector + indented closing brace to
                // their respective arrays
                build.push(indent + selectors[j] + " {" + "\n");
                ending_braces.push(indent + "}" + "\n");
            }

            // console.log(build)

            // loop over the duplicate properties
            for (var prop in dupes) {
                if (dupes.hasOwnProperty(prop)) {
                    // get the dupes
                    var dupe_array = dupes[prop];
                    // loop over every dupe prop within each property and log
                    for (var j = 0, ll = dupe_array.length; j < ll; j++) {
                        var dupe_declaration = dupe_array[j];
                        build.push(indentation + dupe_declaration[0] + ": ", dupe_declaration[1] + ";\n");
                    }
                }
            }

            // join selector, CSS declarations, and closing braces to make
            // the final string, then add to formated array
            formated.push(build.concat(ending_braces.reverse()).join(""));

        }

        // return the formated dupes
        return formated;

    }

    /**
     * @description [Logs the code blocks that contain dupe CSS declarations.]
     * @param  {Array} blocks [Collection of code blocks containing dupe CSS
     *                         properties.]
     * @return {Null}        [Only logs duplicates info onto the console.]
     */
    function log(dupes) {

        // log the dupes length
        // console.log(dupes.length);

        for (var i = 0, l = dupes.length; i < l; i++) {
            // log the dupe
            console.log(dupes[i]);
            // log a space between dupes
            console.log("");
        }

    }

    /* [app.body] */

    // all resources have loaded (document + sub-resources)
    if (document.readyState === "complete") {

        var code1 = document.getElementById("code1");
        var v = code1.innerHTML;
        var highlighted = colorizer(v);
        code1.innerHTML = highlighted;

        // get the CSS string to work with
        var string = document.getElementsByTagName("textarea")[0].value;

        // create new web worker
        var worker = new Worker("js/worker.js");
        // send data to web worker
        worker.postMessage({ "action": "start", "string": string });

        // listen for web worker messages
        worker.addEventListener("message", function(e) {

            // cache the data object
            var message = e.data;

            // object collection of actions
            var actions = {
                "done": function() {

                    // format the dupes + log dupes to the console
                    log(format(message.dupes));

                    // terminate worker
                    // worker.terminate(); // close worker from main file
                    worker.postMessage({ "action": "stop" }); // cose worker from worker file

                }
            };

            // run the needed action
            (actions[message.action] || new Function)();

        }, false);

    }

};
