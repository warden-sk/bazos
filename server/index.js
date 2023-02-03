"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getProducts_1 = __importDefault(require("./getProducts"));
const getPageCount_1 = __importDefault(require("./getPageCount"));
const fs_1 = __importDefault(require("fs"));
let updateStorage = [];
(async () => {
    let productStorage = JSON.parse(fs_1.default.readFileSync('./json/products.json').toString());
    productStorage = productStorage.map(product => {
        product.isActive = false;
        return product;
    });
    function addProductsToStorage(products) {
        products.forEach(product => {
            const i = productStorage.findIndex(product2 => product2.id === product.id);
            if (i !== -1) {
                console.error(`\x1b[31mProduct "${product.id}" exists at "${i}".\x1b[0m`);
                productStorage[i].isActive = true;
                const columnsToUpdate = ['address', 'date', 'description', 'name', 'price'];
                columnsToUpdate.forEach(columnToUpdate => {
                    if (JSON.stringify(productStorage[i][columnToUpdate]) !== JSON.stringify(product[columnToUpdate])) {
                        updateStorage = [
                            ...updateStorage,
                            {
                                createdAt: +new Date(),
                                from: productStorage[i][columnToUpdate],
                                id: product.id,
                                to: product[columnToUpdate],
                            },
                        ];
                    }
                });
            }
            else {
                productStorage = [...productStorage, product];
            }
        });
    }
    async function $(currentPage, pageCount) {
        const products = await (0, getProducts_1.default)('https://elektro.bazos.sk/projektory', currentPage);
        addProductsToStorage(products);
        const nextPage = currentPage + 1;
        console.log(`\x1b[32mPage ${currentPage} of ${pageCount} \u2014 ${products.length} product(s)\x1b[0m`);
        if (nextPage <= pageCount) {
            await $(nextPage, pageCount);
        }
        else {
            console.log(`\x1b[32m${productStorage.length} product(s)\x1b[0m`);
            fs_1.default.writeFileSync('./json/products.json', JSON.stringify(productStorage));
            fs_1.default.writeFileSync('./json/updates.json', JSON.stringify(updateStorage));
        }
    }
    const pageCount = await (0, getPageCount_1.default)('https://elektro.bazos.sk/projektory');
    await $(1, pageCount);
})();
