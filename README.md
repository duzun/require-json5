# require-json5

Require JSON5 files in node - a better JSON for ES5 era

JSON5 is more human friendly, can contain comments, trailing commas amd more!

## Install

```sh
npm i require-json5
```

## Usage

1) Require a JSON5 file

```js
require('require-json5');
var config = require("./config.json5");
```

2) Load a .json file in JSON5 format

```js
var requireJSON5 = require('require-json5');
var config = requireJSON5("./config.json");
```


3) Parse a JSON5 string

```js
var requireJSON5 = require('require-json5');
var config = requireJSON5.parse('{ name: /*a very important option*/ "value" }');
```

4) Use JSON5 for all `require(.json)` calls

```js
require('require-json5').replace();
var config = require("./config"); // can be config.json, config.json5 or config.js
```
