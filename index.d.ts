/**
 * Require .json files with comments
 *
 * @license MIT
 * @version 1.3.0
 * @author Dumitru Uzun (DUzun.Me)
 */
/// <reference types="node" />
declare const VERSION = "1.3.0";
declare const fs: any;
declare const path: any;
declare const JSON5: any;
declare function requireJSON5(filename: string): any;
declare function require_hook(module: NodeModule, filename: string): void;
declare const _backup_require_hooks: {};
declare function replace_require(ext?: string): void;
declare function restore_require(ext?: string): boolean;
declare namespace requireJSON5 {
    let parse: (json: string) => any;
    let stringify: (value: any) => string;
    let replace: typeof replace_require;
    let restore: typeof restore_require;
    let VERSION: string;
}
declare function stripBOM(content: string): string;
