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

// localStorage API

// gets count of stored pairs
localStorage.length;
// removes all local data from localStorage
localStorage.clear();
// gets stored item value
localStorage.getItem("<key_name>");
// sets key:value data pair in local storage
localStorage.setItem("<key_name>", "<key_value>");

// **Note: fires when any changes to localstorage or sessionstorage are made
// **Note: changes made on the same page will not be listened to. only
// storage modifications made on other tabs of the same domain will be
// listened to.
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent
window.addEventListener("storage", handler, false);
