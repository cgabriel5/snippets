# xhr-wrapper (Ajax)

A lightweight JavaScript XHR wrapper.

##### Table of Contents

[What It Does](#what-it-does)  
[Add To Project](#add-to-project)  
[Access Library](#access-library)  
[API](#api)  
* [Make Call](#api-make-call)  
* [Cancel Call(s)](#api-cancel-calls)  

[Handling HTTP Errors](#handling-http-errors)  
[Example Usage Concept](#example-usage-concept)  
* [GET](#example-get)  
* [POST](#example-post)  
* [File Upload](#example-file-upload)  

[TODO](#todo)  
[License](#license)  

<a name="what-it-does"></a>
### What It Does

* Provides a wrapper for the XMLHttpRequest Object
* Uses JavaScript Promises
* Allows for cancelable XHR calls

<a name="add-to-project"></a>
### Add To Project

```html
<script src="my_js_directory_path/ajax.js"></script>
```

<a name="access-library"></a>
### Access Library

```js
var Ajax = Ajax;
// or
var Ajax = window.Ajax;
```

<a name="api"></a>
### API

<a name="api-make-call"></a>
**new Ajax** &mdash; Make an ajax call. Returns a `Promise`.

```js
// make an ajax call
var ajax = new Ajax({

    // {String: REQUIRED} 
    // The resource URL.
    "url": "test.php?verified=false", 

    // {String: REQUIRED} 
    // The call method type.
    "method": "GET|POST|PUT|DELETE",

    // {Boolean: REQUIRED, DEFAULT: true} 
    // Set to true when uploading files.
    "files": false|true,

    // {Boolean: REQUIRED, DEFAULT: true} 
    // Flag indicating whether call needs to be cached.
    "cache": false|true,

    // {Boolean: REQUIRED, DEFAULT: true} 
    // Flag indicating whether call needs to be async or sync.
    "async": false|true,

    // {String: OPTIONAL} 
    // The content type.
    "contentType": "application/x-www-form-urlencoded;charset=UTF-8", // default

    // {Boolean: OPTIONAL, DEFAULT: true} 
    // Flag indicating whether data needs to be parsed.
    "processData": false|true,

    // {String|Object|FormData: OPTIONAL}
    "data": "tom nancy",
    "data": {"name": "tom nancy"},
    "data": new FormData(),

    // {String: OPTIONAL} 
    // ID is used to reference call if needed to cancel. 
    // **Note: ID needs to be unique.
    "id": "unique-call-id"
      
    });
```

<a name="api-cancel-calls"></a>
**Ajax.cancel** &mdash; Cancelling call(s).

```js
// cancelling a single call
Ajax.cancel("unique-call-id", function(xhr) {
    console.log("XHR req was canceled.", xhr);
});

// cancel all unfinished calls
Ajax.cancel();
```

<a name="handling-http-errors"></a>
### Handling HTTP Errors

A custom function is needed to check for HTTP errors.

```js
// custom function to check status of request
function check_status(xhr) {
    if ((xhr.status >= 200 && xhr.status < 300) && xhr.readyState === 4) return xhr; // no HTTP error
    else throw new Error(xhr);
}
```

<a name="example-usage-concept"></a>
### Example Usage Concept

<a name="example-get"></a>
**GET Example** &mdash; Example showing a GET Ajax call.

```js
var ajax = new Ajax({
    "method": "GET",
    "url": "test.php?verified=false",
    "cache": false
});

ajax.then(check_status);
ajax.then(function(data) {
    console.log("Server Response: ", data);
});
ajax.catch(function(error) {
    console.log("XHR Error: ", error);
});
```

<a name="example-post"></a>
**POST Example** &mdash; Example showing a POST Ajax call.

```js
var ajax = new Ajax({
        "method": "POST",
        "url": "test.php",
        // "data": { "msg": "Hello World!!", "name": "Selena Gomez" } // data in an object
        "data": "msg=Hello World!&name=Selena Gomez" // string data
    })
    .then(check_status)
    .then(function(data) {
        console.log("Server Response: ", data);
    })
    .catch(function(error) {
        console.log("XHR Error: ", error);
    });
```

<a name="example-file-upload"></a>
**File Upload Example** &mdash; Example shows how to upload multiple files to `PHP` script.

```html
<form id="form" enctype="multipart/form-data">
    <input id="file" type="file" name="images[]" multiple>
</form>
```

```js
document.getElementById("file").addEventListener("change", function(e) {

    // cache the input form, the parent in this case
    var form = this.parentNode;

    // formdata resources...
    var form_data = new FormData(),
        files = this.files,
        file;

    // loop through files to add to FormData object
    for (var i = 0, l = files.length; i < l; i++) {
        file = files.item(i);
        form_data.append(this.getAttribute("name"), file, file.name);
    }

    // upload files to server
    Ajax({
            "method": "POST",
            "url": "test.php?files=true",
            "data": form_data,
            "files": true
        })
        .then(check_status)
        .then(function(data) {
            console.log("Server Response: ", data);
            form.reset(); // reset form
        })
        .catch(function(error) {
            console.log("XHR Error: ", error);
        });

});
```

<a name="todo"></a>
### TODO

- [ ] Add XHR progress event listener
- [ ] Add JSON support 

<a name="license"></a>
### License

This project uses the [MIT License](https://github.com/cgabriel5/snippets/blob/master/concepts/ajax/LICENSE.txt).