
var fs          = require('fs');
var asert       = require('assert');
var requireJSON = require('..');


// 1.
var config = requireJSON(__dirname + "/config5"); // .json5 file
asert.equal(config.name, 'json5', 'yes');
asert.equal(config.unicorn, 'cake');
asert.equal(config.array.join('|'), [1,2,3,].join('|'));

// 2.
var config = require('./config5'); // .json5 file
asert.equal(config.name, 'json5', 'yes');
asert.equal(config.unicorn, 'cake');
asert.equal(config.array.join('|'), [1,2,3,].join('|'));

requireJSON.replace();

// 3.
var config = require("./config"); // .json file
asert.equal(config.name, 'json', 'yes');
asert.equal(config.unicorn, 'cake');
asert.equal(config.array.join('|'), [1,2,3,].join('|'));

// 4.
var configStr = fs.readFileSync(__dirname + "/config5.json5", 'utf8');
var config = requireJSON.parse(configStr);
asert.equal(config['one-line'], 'comment 1');
asert.equal(config['multi-line'], 'comment 2');



console.log(config);
