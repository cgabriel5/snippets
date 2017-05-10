/**
 * @description [Checks whether document's vertical scrollbar is visible.]
 * @return {Boolean}
 * @info [http://stackoverflow.com/questions/2146874/detect-if-a-page-has-a-vertical-scrollbar]
 */
function is_vertical_scrollbar_visible() {
    return document.body.scrollHeight > window.innerHeight;
}

// usage
if (is_vertical_scrollbar_visible()) {
    console.log("visible :)");
} else {
    // hidden :(
    console.log("hidden :(");
}
