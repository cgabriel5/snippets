/**
 * @description [Checks for localStorage availability.]
 * @source [https://mathiasbynens.be/notes/localstorage-pattern]
 * @source-complementary [http://diveintohtml5.info/storage.html]
 */
var storage = (function() {
    var uid = new Date(),
        storage, result;
    try {
        (storage = window.localStorage).setItem(uid, uid);
        result = storage.getItem(uid) == uid;
        storage.removeItem(uid);
        return result && storage;
    } catch (exception) {}
}());

// usage
if (storage) {
    // :)
} else {
    // :(
}