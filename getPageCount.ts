/*
 * Copyright 2023 Marek Kobida
 */

import createHttpsRequest from './createHttpsRequest';
import toNumber from './toNumber';
import createDOM from './createDOM';

async function getPageCount(url: string): Promise<number> {
  const httpsResponse = await createHttpsRequest(`${url}/${Number.MAX_SAFE_INTEGER}/`); // "\/$"

  const { window } = createDOM(httpsResponse);

  const text = window.document.querySelector('.strankovani a:last-child')?.textContent;

  return toNumber(text);
}

export default getPageCount;
