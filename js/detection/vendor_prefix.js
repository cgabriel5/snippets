/**
 * @description [Returns the used vendor prefix for the DOM, JS, and CSS.]
 * @return {Object} [Object containing the DOM, JS, CSS, and lowercase
 *                   vendor prefix.]
 * @source Adapted from: [https://davidwalsh.name/vendor-prefix]
 */
function vendor_prefix() {
    // get styles object
    var styles = window.getComputedStyle(document.documentElement, null),
        // turn styles object to array then to string to find
        // moz, webkit, or ms prefix. otherwise use o (opera) as default
        prefix = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || [null, (styles.OLink !== undefined ? "o" : "")])[1],
        // get the dom prefix equivalent
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + prefix + ')', 'i'))[1]
        // return prefix object
    return {
        dom: dom,
        lowercase: prefix,
        css: '-' + prefix + '-',
        js: prefix[0].toUpperCase() + prefix.substr(1)
    };
}

// usage
console.log(vendor_prefix());
