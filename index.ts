/**
 * Require .json files with comments
 *
 * @license MIT
 * @version 1.3.0
 * @author Dumitru Uzun (DUzun.Me)
 */

const VERSION = '1.3.0';

const fs = require('fs');
const path = require('path');

const JSON5 = require('json5');

/// Require a JSON file with comments
function requireJSON5(filename: string): any {
    if ( path.extname(filename) == '' ) {
        const extensions = ['.json5', '.json'];
        for (let i=0, l = extensions.length, ext; i<l; ++i) {
            ext = extensions[i];
            const fn = filename + ext;
            if (fs.existsSync(fn)) {
                filename = fn;
                break;
            }
        }

        // ES5 alternative
        // ['.json5', '.json'].some((ext) => {
        //     const fn = filename + ext;
        //     if (!fs.existsSync(fn)) return;
        //     filename = fn;
        //     return true;
        // });
    }

    try {
        return JSON5.parse(stripBOM(fs.readFileSync(filename, 'utf8')));
    }
    catch(error) {
        error.message = filename + ": " + error.message;
        throw error;
    }
}

function require_hook(module: NodeModule, filename: string): void {
    module.exports = requireJSON5(filename);
}

const _backup_require_hooks = {};

/// Override require for .json extension
function replace_require(ext?: string): void {
    if (ext == undefined) ext = '.json';

    const bak = require.extensions[ext];

    if (bak === require_hook) return;

    _backup_require_hooks[ext] = bak;
    require.extensions[ext] = require_hook;
}

/// Restore the original require for .json extension
function restore_require(ext?: string): boolean {
    if (ext == undefined) ext = '.json';

    const bak = _backup_require_hooks[ext];
    if (!(bak && ext in _backup_require_hooks)) return false;

    delete _backup_require_hooks[ext];

    if (bak) {
        require.extensions[ext] = bak;
        return true;
    }

    return delete require.extensions[ext];
}

/// Register .json5 extension for require
replace_require('.json5');


declare namespace requireJSON5 {
    let parse: (json: string) => any;
    let stringify: (value: any) => string;
    let replace: typeof replace_require;
    let restore: typeof restore_require;
    let VERSION: string;
}

/// Exports:

requireJSON5.parse           = JSON5.parse.bind(JSON5);
requireJSON5.stringify       = JSON5.stringify.bind(JSON5);
requireJSON5.replace         = replace_require;
requireJSON5.restore         = restore_require;
requireJSON5.VERSION         = VERSION;

module.exports = requireJSON5;


/// Helpers:

function stripBOM(content: string): string {
    // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
    // because the buffer-to-string conversion in `fs.readFileSync()`
    // translates it to FEFF, the UTF-16 BOM.
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    return content;
}
