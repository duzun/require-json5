# require-json5 [![Build Status](https://travis-ci.org/duzun/require-json5.svg?branch=master)](https://travis-ci.org/duzun/require-json5)

Require JSON5 files in node - a better JSON for ES5 era

JSON5 is more human friendly, can contain comments, trailing commas, unquoted keys amd more!

## Install

```sh
npm i require-json5
```

## Usage

Include the lib:

```js
var requireJSON5 = require('require-json5');
```

1) Require a JSON5 file

```js
var config = require("./config.json5");
```

2) Load a `.json` file in JSON5 format

```js
var config = requireJSON5("./config.json");
```

3) Load a .js file as JSON5 format. 
This is useful if you don't like the `.json5` file extension
and prefer to keep JSON5 in `.js` files.

```js
var config = requireJSON5("./config.js");
```

3) Parse a JSON5 string

```js
var config = requireJSON5.parse('{ name: /*a very important option*/ "value" }');
```

4) Use JSON5 for all `require(.json)` calls

```js
require('require-json5').replace();
var config = require("./config"); // can be config.json, config.json5 or config.js
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
