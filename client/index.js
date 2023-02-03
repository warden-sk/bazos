/*
 * Copyright 2023 Marek Kobida
 */

const getProjectorsElement = window.document.querySelector('#getProjectors');
const tableElement = window.document.querySelector('#table');

function createTableRow(columns) {
  const newTableRow = tableElement.insertRow();

  columns.forEach(column => {
    newTableRow.insertCell().append(column);
  });

  return newTableRow;
}

getProjectorsElement.addEventListener('click', async () => {
  const response = await fetch('https://raw.githubusercontent.com/warden-sk/bazos/main/json/products.json');

  const json = await response.json();

  createTableRow(['address', 'name', 'price']);

  json.forEach(product => {
    const newTableRow = createTableRow([product.address[0], product.name, `${product.price} €`]);

    newTableRow.addEventListener('click', () => {
      window.open(`https://elektro.bazos.sk/inzerat/${product.id}/.php`, '_blank');
    });
  });
});
