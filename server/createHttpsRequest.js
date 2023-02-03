"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
function createHttpsRequest(url) {
    return new Promise($ => {
        const request = https_1.default.request(url, response => {
            let chunks = [];
            response.on('data', chunk => {
                chunks = [...chunks, chunk];
            });
            response.on('end', () => {
                $(Buffer.concat(chunks));
            });
        });
        request.on('error', error => {
            console.error(error);
        });
        request.end();
    });
}
exports.default = createHttpsRequest;
