"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = __importDefault(require("jsdom"));
function createDOM(html) {
    return new jsdom_1.default.JSDOM(html);
}
exports.default = createDOM;
