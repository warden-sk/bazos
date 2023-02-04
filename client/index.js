/*
 * Copyright 2023 Marek Kobida
 */

const getProductsElement = window.document.querySelector('#getProducts');

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
  const response1 = await fetch('https://raw.githubusercontent.com/warden-sk/bazos/main/json/products.json');
  const response2 = await fetch('https://raw.githubusercontent.com/warden-sk/bazos/main/json/updates.json');

  /**
   * productStorage: Product[]
   */
  let productStorage = await response1.json();

  /**
   * updateStorage: Update[]
   */
  const updateStorage = await response2.json();

  productStorage = productStorage.sort((l, r) => r.date - l.date);

  /**
   * Prvý riadok so stĺpcami
   */
  createTableRow(productsElement, ['address', 'date', 'name', 'price']);
  createTableRow(updatesElement, ['column', 'from', 'to']);

  productStorage.forEach(product => {
    const newTableRow = createTableRow(productsElement, [
      product.address[0],
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

  updateStorage.forEach(update => {
    createTableRow(updatesElement, [update.column, update.from, update.to]);
  });
});
