"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createRequest_1 = __importDefault(require("./createRequest"));
const toNumber_1 = __importDefault(require("./toNumber"));
const createDOM_1 = __importDefault(require("./createDOM"));
async function getPageCount(url) {
    const response = await (0, createRequest_1.default)(`${url}/${Number.MAX_SAFE_INTEGER}/`); // "\/$"
    const { window } = (0, createDOM_1.default)(response);
    const text = window.document.querySelector('.strankovani a:last-child')?.textContent;
    return (0, toNumber_1.default)(text);
}
exports.default = getPageCount;
