/*
 * Copyright 2023 Marek Kobida
 */

const getProductsElement = window.document.querySelector('#getProducts');
const getUpdatesElement = window.document.querySelector('#getUpdates');

const updatesElement = window.document.querySelector('#updates');
const productsElement = window.document.querySelector('#products');

/**
 * Do tabuľky vytvorí riadok so stĺpcami
 *
 * columns: (Node | string)[]
 */
function createTableRow(table, columns) {
  const newTableRow = table.insertRow();

  columns.forEach(column => {
    newTableRow.insertCell().append(column);
  });

  return newTableRow;
}

/**
 * Po kliknutí na „Get products“
 */
getProductsElement.addEventListener('click', async () => {
  const response = await fetch(
    `https://raw.githubusercontent.com/warden-sk/bazos/main/json/products.json?date=${+new Date()}`
  );

  /**
   * productStorage: Product[]
   */
  let productStorage = await response.json();

  productStorage = productStorage.sort((l, r) => r.createdAt - l.createdAt);

  /**
   * Prvý riadok so stĺpcami
   */
  createTableRow(productsElement, ['address', 'createdAt', 'date', 'name', 'price']);

  productStorage.forEach(product => {
    const newTableRow = createTableRow(productsElement, [
      product.address[0],
      new Date(product.createdAt).toLocaleDateString(),
      new Date(product.date).toLocaleDateString(),
      product.name,
      product.price === -1 ? '' : `${product.price} €`,
    ]);

    if (product.isActive) {
      /**
       * Po kliknutí na riadok
       */
      newTableRow.addEventListener('click', () => {
        window.open(`https://elektro.bazos.sk/inzerat/${product.id}/.php`, '_blank');
      });
    } else {
      newTableRow.classList.add('isNotActive');
    }
  });
});

getUpdatesElement.addEventListener('click', async () => {
  const response = await fetch(
    `https://raw.githubusercontent.com/warden-sk/bazos/main/json/updates.json?date=${+new Date()}`
  );

  const updateStorage = await response.json();

  createTableRow(updatesElement, ['productId', 'column', 'from', 'to']);

  updateStorage.forEach(update => {
    const newTableRow = createTableRow(updatesElement, [update.productId, update.column, update.from, update.to]);

    newTableRow.addEventListener('click', () => {
      window.open(`https://elektro.bazos.sk/inzerat/${update.productId}/.php`, '_blank');
    });
  });
});
