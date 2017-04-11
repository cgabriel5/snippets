/**
 * @description [Detects whether the device is running iOS.]
 * @return {Boolean}    [True if an iOS device. Otherwise, false.]
 * @source [http://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885]
 * @source [http://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system/21742107#21742107]
 */
function is_ios() {
    return ((/ipod|iphone|ipad/).test(navigator.userAgent.toLowerCase()) && !window.MSStream);
}

/**
 * @description [Adds the CSS `ios-click-fix` if the user's device is an iOS device.]
 */
function prepare_ios() {
    // The click event only seems to work when the element has the CSS property `cursor: pointer`.
    // This is docuemnted in the following links:
    // [http://stackoverflow.com/questions/3025348/how-do-i-use-jquery-for-click-event-in-iphone-web-application]
    // [http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html]
    // [http://stackoverflow.com/questions/14795944/jquery-click-events-not-working-in-ios]
    // [http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html]

    // To fix this behavior the `ios-click-fix` CSS class is added to the needed element
    // if the device is an ip***.

    // add the needed CSS class
    if (is_ios()) document.body.classList.add("ios-click-fix");
}

// usage

// Add the following CSS to your styles.css...
//
// .ios-click-fix {
//     cursor: pointer;
// }

// prepare for iOS devices
prepare_ios();
