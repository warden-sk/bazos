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
async function getProducts(url, page) {
    if (page > 1) {
        url += `/${(page - 1) * 20}`;
    }
    url += `/`; // "\/$"
    const response = await (0, createRequest_1.default)(url);
    const { window } = (0, createDOM_1.default)(response);
    let products = [];
    window.document.querySelectorAll('.inzeraty.inzeratyflex').forEach(div => {
        const AddressElement = div.querySelector('.inzeratylok');
        const DateElement = div.querySelector('.inzeratynadpis .velikost10');
        const DescriptionElement = div.querySelector('.inzeratynadpis .popis');
        const NameElement = div.querySelector('.inzeratynadpis .nadpis')?.querySelector('a');
        const PriceElement = div.querySelector('.inzeratycena');
        if (AddressElement?.textContent &&
            DateElement?.textContent &&
            DescriptionElement?.textContent &&
            NameElement?.textContent &&
            PriceElement?.textContent) {
            const address = AddressElement.textContent;
            const [, day, month, year] = /\[([^.]+)\.([^.]+)\.([^\]]+)]/.exec(DateElement.textContent.replace(/\s+/g, '')) ?? [];
            const description = DescriptionElement.textContent;
            const [id] = /\d{9}/.exec(NameElement.href) ?? [];
            const name = NameElement.textContent;
            const price = PriceElement.textContent;
            const [, left, right] = /(.+)(\d{3}\s+\d{2})/.exec(address) ?? [];
            products = [
                ...products,
                {
                    address: [left, (0, toNumber_1.default)(right)],
                    createdAt: +new Date(),
                    date: +new Date(+year, +month - 1, +day),
                    description,
                    id: (0, toNumber_1.default)(id),
                    isActive: true,
                    name,
                    price: (0, toNumber_1.default)(price),
                },
            ];
        }
    });
    return products;
}
exports.default = getProducts;
