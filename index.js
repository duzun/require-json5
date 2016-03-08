/**
 * Require .json files with comments
 *
 * @license MIT
 * @version 1.0.2
 * @author Dumitru Uzun (DUzun.Me)
 */

var VERSION = '1.0.2';

var fs = require('fs');
var path = require('path');

var JSON5 = require('json5');

/// Require a JSON file with comments
function requireJSON5(filename) {
    if ( path.extname(filename) == '' ) filename += fs.existsSync(filename + '.json5') ? '.json5' : '.json';
    try {
        return JSON5.parse(stripBOM(fs.readFileSync(filename, 'utf8')));
    }
    catch(error) {
        error.message = filename + ": " + error.message;
        throw error;
    }
}

/// Override require for .json extension
function replace_require() {
    require.extensions['.json'] = function(module, filename) {
        module.exports = requireJSON5(filename);
    };
}

/// Register .json5 extension for require
require.extensions['.json5'] = function(module, filename) {
    module.exports = requireJSON5(filename);
};

/// Exports:

requireJSON5.parse           = JSON5.parse.bind(JSON5);
requireJSON5.stringify       = JSON5.stringify.bind(JSON5);
requireJSON5.replace         = replace_require;
requireJSON5.VERSION         = VERSION;

module.exports = requireJSON5;


/// Helpers:

function stripBOM(content) {
    // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
    // because the buffer-to-string conversion in `fs.readFileSync()`
    // translates it to FEFF, the UTF-16 BOM.
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    return content;
}
