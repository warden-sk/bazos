"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
function toNumber(input) {
    if (input) {
        input = input.replace(/\s+/g, '');
        const [n] = /\d+/.exec(input) ?? [];
        if (n) {
            return +n;
        }
    }
    console.error(`\x1b[31mInput "${input}" is not a valid number.\x1b[0m`);
    return -1;
}
exports.default = toNumber;
