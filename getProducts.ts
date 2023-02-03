/*
 * Copyright 2023 Marek Kobida
 */

import createHttpsRequest from './createHttpsRequest';
import toNumber from './toNumber';
import createDOM from './createDOM';

export interface Product {
  address: [string, number];
  createdAt: number;
  date: number;
  description: string;
  id: number;
  isActive: boolean;
  name: string;
  price: number;
  updatedAt: number;
}

async function getProducts(url: string, page: number): Promise<Product[]> {
  if (page > 1) {
    url += `/${(page - 1) * 20}`;
  }

  url += `/`; // "\/$"

  const httpsResponse = await createHttpsRequest(url);

  const { window } = createDOM(httpsResponse);

  let products: Product[] = [];

  window.document.querySelectorAll('.inzeraty.inzeratyflex').forEach(div => {
    const AddressElement = div.querySelector('.inzeratylok');
    const DateElement = div.querySelector('.inzeratynadpis .velikost10');
    const DescriptionElement = div.querySelector('.inzeratynadpis .popis');
    const NameElement = div.querySelector('.inzeratynadpis .nadpis')?.querySelector('a');
    const PriceElement = div.querySelector('.inzeratycena');

    if (
      AddressElement?.textContent &&
      DateElement?.textContent &&
      DescriptionElement?.textContent &&
      NameElement?.textContent &&
      PriceElement?.textContent
    ) {
      const [, day, month, year] =
        /\[([^.]+)\.([^.]+)\.([^\]]+)]/.exec(DateElement.textContent.replace(/\s+/g, '')) ?? [];
      const [id] = /\d{9}/.exec(NameElement.href) ?? [];
      const address = AddressElement.textContent;
      const description = DescriptionElement.textContent;
      const name = NameElement.textContent;
      const price = PriceElement.textContent;

      const [, left, right] = /(.+)(\d{3}\s+\d{2})/.exec(address) ?? [];

      products = [
        ...products,
        {
          address: [left, toNumber(right)],
          createdAt: +new Date(),
          date: +new Date(+year, +month - 1, +day),
          description,
          id: toNumber(id),
          isActive: true,
          name,
          price: toNumber(price),
          updatedAt: -1,
        },
      ];
    }
  });

  return products;
}

export default getProducts;
