# require-json5 [![Build Status](https://travis-ci.com/duzun/require-json5.svg?branch=master)](https://app.travis-ci.com/duzun/require-json5)

Require JSON5 files in node - a better JSON for the JSNext era

JSON5 is more human friendly, can contain comments, trailing commas, unquoted keys and more!

## Install

```sh
npm i -S require-json5
```

## Usage

Include the lib:

```js
const requireJSON5 = require('require-json5');
```

1) Require a JSON5 file

```js
let config = require("./config.json5");
 // or w/o the extension, when "./config.json5" exists and there is no "./config.json", nor "./config.js"
let config = require("./config");
```

2) Explicitly load a `.json` file in JSON5 format

```js
let config = requireJSON5("./config.json");
```

3) Load a .js file as JSON5 format.
This is useful if you don't like the `.json5` file extension
and prefer to keep JSON5 in `.js` files.

```js
let config = requireJSON5("./config.js");
```

3) Parse a JSON5 string

```js
let config = requireJSON5.parse('{ name: /*a very important option*/ "value" }');
```

4) Use JSON5 for all `require(.json)` calls

```js
require('require-json5').replace();
let config = require("./config"); // can be config.json, config.json5 or config.js
```

5) Restore the original `require(.json)`
```js
require('require-json5').restore();
```

## Example of JSON5

The following is a contrived example, but it illustrates most of the features:

```js
{
    foo: 'bar',
    while: true,
 
    this: 'is a \
multi-line string',
 
    // this is an inline comment 
    here: 'is another', // inline comment 
 
    /* this is a block comment
       that continues on another line */
 
    hex: 0xDEADbeef,
    half: .5,
    delta: +10,
    to: Infinity,   // and beyond! 
 
    finally: 'a trailing comma',
    oh: [
        "we shouldn't forget",
        'arrays can have',
        'trailing commas too',
    ],
}
```

For more details on the `JSON5` format see the [json5](https://www.npmjs.com/package/json5) library.
