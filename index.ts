/*
 * Copyright 2023 Marek Kobida
 */

import type { Product } from './getProducts';
import getProducts from './getProducts';
import getPageCount from './getPageCount';
import fs from 'fs';

interface Update {
  createdAt: number;
  from: any;
  id: number;
  to: any;
}

let updateStorage: Update[] = [];

(async () => {
  let productStorage: Product[] = JSON.parse(fs.readFileSync('./json/products.json').toString());

  productStorage = productStorage.map(product => {
    product.isActive = false;

    return product;
  });

  function addProductsToStorage(products: Product[]) {
    products.forEach(product => {
      const i = productStorage.findIndex(product2 => product2.id === product.id);

      if (i !== -1) {
        console.error(`\x1b[31mProduct "${product.id}" exists at "${i}".\x1b[0m`);

        productStorage[i].isActive = true;

        const columnsToUpdate = ['address', 'date', 'description', 'name', 'price'] as const;

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
      } else {
        productStorage = [...productStorage, product];
      }
    });
  }

  async function $(currentPage: number, pageCount: number) {
    const products = await getProducts('https://elektro.bazos.sk/projektory', currentPage);

    addProductsToStorage(products);

    const nextPage = currentPage + 1;

    console.log(`\x1b[32mPage ${currentPage} of ${pageCount} \u2014 ${products.length} product(s)\x1b[0m`);

    if (nextPage <= pageCount) {
      await $(nextPage, pageCount);
    } else {
      console.log(`\x1b[32m${productStorage.length} product(s)\x1b[0m`);

      fs.writeFileSync('./json/products.json', JSON.stringify(productStorage));
      fs.writeFileSync('./json/updates.json', JSON.stringify(updateStorage));
    }
  }

  const pageCount = await getPageCount('https://elektro.bazos.sk/projektory');

  await $(1, pageCount);
})();
