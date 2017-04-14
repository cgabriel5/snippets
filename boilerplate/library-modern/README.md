# Read Before Use
1. Make sure to remove the `.gitignore` file from the `img/` directory before using.
2. Only modify the `css/main/styles.css` file. Grunt tasks will handle auto-prefixing, minifying, and concatenation.
3. Run `npm install` in the terminal to install the modules specified in `package.json`.
4. Modify `package.json` `{{****}}` with updated information. Or with `npm init`.
5. Run `grunt` in the terminal to build the `dist/` directory.
5. Run `grunt watch` in the terminal to watch for any development changes.
    * Look in `Gruntfile.js` to see the names of individual tasks if needed to run individually. 
    * Modify `Gruntfile.js` as needed.
6. Remove this section (`Read Before Use`) from the `README` after reading this.
#### Quick CLI Setup
1. Run the following commands in the following order:
    1. **`npm init`**
    2. **`npm install`**
    3. **`grunt`** to build the `dist/` directory
    4. **`grunt watch`** to watch for any development changes

# library name (libraryjs)

Library description.

##### Table of Contents

[What It Does](#what-it-does)  
[What It Does Not Do](#what-it-does-not-do)  
[Add To Project](#add-to-project)  
[Access Library](#access-library)  
[How It Works](#how-it-works)  
[Instance Creation](#instance-creation)  
[API](#api)  
* [Global](#global-api)
    * [QuickTable](#global-quicktable-reference)  
    * [Methods](#global-methods-long)  
* [Instance](#instance-api)
    * [QuickTable](#instance-quicktable-reference)  
    * [Methods](#instance-methods-long) 

[Usage](#usage)  

[Contributing](#contributing)  
[TODO](#todo)  
[License](#license)  

<a name="what-it-does"></a>
### What It Does

* What the library does.

<a name="what-it-does-not-do"></a>
### What It Does Not Do

* The library does not...

<a name="add-to-project"></a>
### Add To Project

```html
<script src="my_js_directory_path/library.js"></script>
```

<a name="access-library"></a>
### Access Library

```js
var Library = window.app.libs.Library;
```

<a name="how-it-works"></a>
### How It Works

Library works by...

<a name="instance-creation"></a>
### Instance Creation

```js
var instance = new Library(p1, p2);
// p1: p1 Description
// p2: p2 Description

// Using the "new" keyword is not necessary. If not used
// the library will make sure to use it for you.
var instance = Library();
```

<a name="api"></a>
### API
 
<a name="global-api"></a>
### API &mdash; Global

<a name="global-quicktable-reference"></a>
### Global QuickTable Reference

Method | Function
------------ | -------------
**globalMethodName** | globalMethodName description

<a name="global-methods-long"></a>
### Global Methods

**Library.globalMethodName** &mdash; globalMethodName description.

```js
Library.globalMethodName();
```

<a name="instance-api"></a>
### API &mdash; Instance

<a name="instance-quicktable-reference"></a>
### Instance QuickTable Reference

Method | Function
------------ | -------------
**instanceMethodName** | instanceMethodName description

<a name="instance-methods-long"></a>
### Instance Methods

**instance.instanceMethodName** &mdash; instanceMethodName description.

```js
instance.instanceMethodName();
```

<a name="usage"></a>
### Usage

For a better understanding check out `index.html` and `app.js`. `app.js` contains examples showing how the library is used.

<a name="contributing"></a>
### Contributing

Contributions are welcome! Found a bug, feel like documentation is lacking/confusing and needs an update, have performance/feature suggestions or simply found a typo? Let me know! :)

See how to contribute [here](https://github.com/cgabriel5/libraryjs/blob/master/CONTRIBUTING.md).

### TODO

- [ ] Any TODO item.

<a name="license"></a>
### License

This project uses the [MIT License](https://github.com/cgabriel5/libraryjs/blob/master/LICENSE.txt).
