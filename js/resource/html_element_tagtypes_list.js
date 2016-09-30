// get elements [https://developer.mozilla.org/en-US/docs/Web/HTML/Element]
var elements = document.querySelectorAll('td[style="vertical-align: top;"]');

var present = [],
    outdated = [], // obsolete/deprecated
    outdated_flag = false;

// loop through all scrapped elements
for (var i = 0, l = elements.length; i < l; i++) {
    // loop over children nodes
    var children = elements[i].children;
    for (var j = 0, ll = children.length; j < ll; j++) {
        // get the tag name
        var tag = children[j].textContent.replace(/<|>/g, "");
        // separate between present and outdated element tags
        if (tag === "acronym") outdated_flag = true;
        ((!outdated_flag) ? present : outdated).push(tag);
    }
}

console.log("PRESENT TAG COUNT:", present.length, JSON.stringify(present));
console.log("OUTDATED TAG COUNT:", outdated.length, JSON.stringify(outdated));

// PRESENT TAG COUNT: 111
var present = ["html", "base", "head", "link", "meta", "style", "title", "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4", "h5", "h6", "hgroup", "nav", "section", "dd", "div", "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre", "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn", "em", "i", "kbd", "mark", "q", "rp", "rt", "rtc", "ruby", "s", "samp", "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "area", "audio", "map", "track", "video", "embed", "object", "param", "source", "canvas", "noscript", "script", "del", "ins", "caption", "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "button", "datalist", "fieldset", "form", "input", "label", "legend", "meter", "optgroup", "option", "output", "progress", "select", "textarea", "details", "dialog", "menu", "menuitem", "summary", "content", "element", "shadow", "template"];

// OUTDATED TAG COUNT: 24
var outdated = ["acronym", "applet", "basefont", "big", "blink", "center", "command", "content", "dir", "font", "frame", "frameset", "isindex", "keygen", "listing", "marquee", "multicol", "nextid", "noembed", "plaintext", "spacer", "strike", "tt", "xmp"];
