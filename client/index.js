/*
 * Copyright 2023 Marek Kobida
 */

const getProductsElement = window.document.querySelector('#getProducts');
const tableElement = window.document.querySelector('#table');

/**
 * Do tabuľky vytvorí riadok so stĺpcami
 *
 * columns: (Node | string)[]
 */
function createTableRow(columns) {
  const newTableRow = tableElement.insertRow();

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

  /**
   * productStorage: Product[]
   */
  let productStorage = await response1.json();

  productStorage = productStorage.sort((l, r) => r.date - l.date);

  /**
   * Prvý riadok so stĺpcami
   */
  createTableRow(['address', 'date', 'name', 'price']);

  productStorage.forEach(product => {
    const newTableRow = createTableRow([
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
});
