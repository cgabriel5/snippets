/* jshint shadow:true */
/* jshint bitwise: false */
// http://jshint.com/docs/options/#shadow

document.onreadystatechange = function() {

    "use strict";

    /* [functions.utils] */

    function colorizer(string) {

        var regexp = {
            "counter": -1,
            "container": [],
            "string": {
                "double": {
                    "empty": /(?=[^\\])""/g,
                    "filled": /(?=[^\\])"(.*?)([^\\])"/g,
                },
                "single": {
                    "empty": /(?=[^\\])''/g,
                    "filled": /(?=[^\\])'(.*?)([^\\])'/g,
                }
            },
            "comment": {
                "pattern": /(?=[^\\])\/\*(.*?)([^\\])\*\/$/gm
            },
            "hexcolor": {
                "pattern": /(#[a-f0-9]{8,8}|#[a-f0-9]{6,6}|#[a-f0-9]{3,3})(?=[^a-f0-9]){0,1}/gi
            },
            "selectors": {
                // http://stackoverflow.com/questions/2812072/allowed-characters-for-css-identifiers
                "class": /\.([a-z])([a-z0-9\-_]+)/gi,
                "id": /#([a-z])([a-z0-9\-_])+/gi,
                "tags": /\b(html|img|base|head|link|meta|style|title|address|article|aside|footer|header|h1|h2|h3|h4|h5|h6|hgroup|nav|section|dd|div|dl|dt|figcaption|figure|hr|li|main|ol|p|pre|ul|a|abbr|b|bdi|bdo|br|cite|code|data|dfn|em|i|kbd|mark|q|rp|rt|rtc|ruby|s|samp|small|span|strong|sub|sup|time|u|var|wbr|area|audio|map|track|video|embed|object|param|source|canvas|noscript|script|del|ins|caption|col|colgroup|table|tbody|td|tfoot|th|thead|tr|button|datalist|fieldset|form|input|label|legend|meter|optgroup|option|output|progress|select|textarea|details|dialog|menu|menuitem|summary|content|element|shadow|template|acronym|applet|basefont|big|blink|center|command|content|dir|font|frame|frameset|isindex|keygen|listing|marquee|multicol|nextid|noembed|plaintext|spacer|strike|tt|xmp)\b/gi
            },
            "number": {
                // double | whole | float +  ,;\)unit
                "pattern": /((?=[^\[])\d+\.\d+|(?=[^\[\.])\d+(\.)?|(?=[^\[])(\.)?\d+)(?=( |,|;|\)|em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax))/g
                    // "double": /(?=[^\[])\d+\.\d+/g,
                    // "whole": /[^\[\.]\d+(\.)?/g,
                    // "float": /[^\[](\.)?\d+/g
            },
            "units": {
                "list": /(\$\$_css_number_\[\d+\])(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/gi
            },
            "atrules": {
                // @-rules https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
                "list": /@(charset|import|namespace|media|supports|document|page|font-face|keyframes|viewport|counter-style|font-feature-values|swash|ornaments|annotation|stylistic|styleset|character-variant)/g
            },
            "colornames": {
                "list": /(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgrey|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|grey|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgrey|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)/g
            },
            "functions": {
                "list": /((-(ms|mso|moz|o|atscwap|webkit|khtml|apple|prince|ah|hp|ro|rim|tc)-)?(alpha|annotation|attr|blur|brightness|calc|character-variant|circle|contrast|counter|cross-fade|cubic-bezier|drop-shadow|element|ellipse|fit-content|format|grayscale|hsl|hsla|hue-rotate|image|image-set|inset|invert|leader|linear-gradient|local|matrix|matrix3d|minmax|opacity|ornaments|perspective|polygon|radial-gradient|rect|repeat|repeating-linear-gradient|repeating-radial-gradient|rgb|rgba|rotate|rotate3d|rotatex|rotatey|rotatez|saturate|scale|scale3d|scalex|scaley|scalez|sepia|skew|skewx|skewy|steps|styleset|stylistic|swash|symbols|target-counter|target-counters|target-text|translate|translate3d|translatex|translatey|translatez|url|var|:dir|:lang|:not|:nth-child|:nth-last-child|:nth-last-of-type|:nth-of-type))(?=\()/g
            },
            "keywords": {
                "list": /(~\=|\|\=|\^\=|\$\=|\*\=|~|\*|\=|\>|\+|\!important|before|after)/g
            },
            "properties": {
                // css browser prefix list: http://stackoverflow.com/questions/5411026/list-of-css-vendor-prefixes
                // css property list: http://www.blooberry.com/indexdot/css/propindex/all.htm
                // unique array: http://stackoverflow.com/questions/6940103/how-do-i-make-an-array-with-unique-elements-i-e-remove-duplicates/23282067#23282067
                "list": /((-(ms|mso|moz|o|atscwap|webkit|khtml|apple|prince|ah|hp|ro|rim|tc)-)?(accelerator|azimuth|background|background-attachment|background-color|background-image|background-position|background-position-x|background-position-y|background-repeat|behavior|border|border-bottom|border-bottom-color|border-bottom-style|border-bottom-width|border-collapse|border-color|border-left|border-left-color|border-left-style|border-left-width|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-style|border-top-width|border-width|bottom|caption-side|clear|clip|color|content|counter-increment|counter-reset|cue|cue-after|cue-before|cursor|direction|display|elevation|empty-cells|filter|float|font|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|height|ime-mode|include-source|layer-background-color|layer-background-image|layout-flow|layout-grid|layout-grid-char|layout-grid-char-spacing|layout-grid-line|layout-grid-mode|layout-grid-type|left|letter-spacing|line-break|line-height|list-style|list-style-image|list-style-position|list-style-type|margin|margin-bottom|margin-left|margin-right|margin-top|marker-offset|marks|max-height|max-width|min-height|min-width|-moz-binding|-moz-border-radius|-moz-border-radius-topleft|-moz-border-radius-topright|-moz-border-radius-bottomright|-moz-border-radius-bottomleft|-moz-border-top-colors|-moz-border-right-colors|-moz-border-bottom-colors|-moz-border-left-colors|-moz-opacity|-moz-outline|-moz-outline-color|-moz-outline-style|-moz-outline-width|-moz-user-focus|-moz-user-input|-moz-user-modify|-moz-user-select|orphans|outline|outline-color|outline-style|outline-width|overflow|overflow-X|overflow-Y|padding|padding-bottom|padding-left|padding-right|padding-top|page|page-break-after|page-break-before|page-break-inside|pause|pause-after|pause-before|pitch|pitch-range|play-during|position|quotes|-replace|richness|right|ruby-align|ruby-overhang|ruby-position|-set-link-source|size|speak|speak-header|speak-numeral|speak-punctuation|speech-rate|stress|scrollbar-arrow-color|scrollbar-base-color|scrollbar-dark-shadow-color|scrollbar-face-color|scrollbar-highlight-color|scrollbar-shadow-color|scrollbar-3d-light-color|scrollbar-track-color|table-layout|text-align|text-align-last|text-decoration|text-indent|text-justify|text-overflow|text-shadow|text-transform|text-autospace|text-kashida-space|text-underline-position|top|unicode-bidi|-use-link-source|vertical-align|visibility|voice-family|volume|white-space|widows|width|word-break|word-spacing|word-wrap|writing-mode|z-index|zoom|animation-delay|animation-direction|animation-duration|animation-fill-mode|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|background-blend-mode|background-clip|background-origin|background-size|border-radius|border-bottom-left-radius|border-bottom-right-radius|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-top-left-radius|border-top-right-radius|box-shadow|box-sizing|break-after|break-before|break-inside|font-kerning|font-variant-ligatures|font-variant-caps|font-variant-numeric|image-rendering|isolation|mix-blend-mode|motion-offset|motion-path|motion-rotation|object-fit|object-position|opacity|outline-offset|overflow-wrap|overflow-x|overflow-y|pointer-events|resize|tab-size|text-rendering|text-size-adjust|touch-action|transition-delay|transition-duration|transition-property|transition-timing-function|will-change|appearance|backface-visibility|border-horizontal-spacing|border-image|border-vertical-spacing|box-align|box-decoration-break|box-direction|box-flex|box-flex-group|box-lines|box-ordinal-group|box-orient|box-pack|box-reflect|clip-path|column-count|column-gap|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|align-content|align-items|align-self|flex-basis|flex-grow|flex-shrink|flex-direction|flex-wrap|justify-content|font-smoothing|highlight|hyphens|hyphenate-character|line-clamp|locale|margin-before-collapse|margin-after-collapse|mask-box-image|mask-box-image-outset|mask-box-image-repeat|mask-box-image-slice|mask-box-image-source|mask-box-image-width|mask-clip|mask-composite|mask-image|mask-origin|mask-position|mask-repeat|mask-size|order|perspective|perspective-origin|print-color-adjust|rtl-ordering|shape-outside|shape-image-threshold|shape-margin|tap-highlight-color|text-combine|text-decorations-in-effect|text-emphasis-color|text-emphasis-position|text-emphasis-style|text-fill-color|text-orientation|text-security|text-stroke-color|text-stroke-width|transform|transform-origin|transform-style|user-drag|user-modify|user-select|app-region|buffered-rendering|clip-rule|mask|flood-color|flood-opacity|lighting-color|stop-color|stop-opacity|color-interpolation|color-interpolation-filters|color-rendering|fill|fill-opacity|fill-rule|marker-end|marker-mid|marker-start|mask-type|shape-rendering|stroke|stroke-dasharray|stroke-dashoffset|stroke-linecap|stroke-linejoin|stroke-miterlimit|stroke-opacity|stroke-width|alignment-baseline|baseline-shift|dominant-baseline|text-anchor|vector-effect|paint-order|d|cx|cy|x|y|r|rx|ry))(?=\:)/gi
            }

        };

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
        console.log(dupes.length);

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
