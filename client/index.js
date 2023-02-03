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
  const response = await fetch('https://raw.githubusercontent.com/warden-sk/bazos/main/json/products.json');

  /**
   * json: Product[]
   */
  const json = await response.json();

  /**
   * Prvý riadok so stĺpcami
   */
  createTableRow(['address', 'name', 'price']);

  json.forEach(product => {
    const productPrice = product.price === -1 ? '\u2014' : `${product.price} €`;

    const newTableRow = createTableRow([product.address[0], product.name, productPrice]);

    /**
     * Po kliknutí na riadok
     */
    newTableRow.addEventListener('click', () => {
      window.open(`https://elektro.bazos.sk/inzerat/${product.id}/.php`, '_blank');
    });
  });
});
