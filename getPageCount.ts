/*
 * Copyright 2023 Marek Kobida
 */

import createRequest from './createRequest';
import toNumber from './toNumber';
import createDOM from './createDOM';

async function getPageCount(url: string): Promise<number> {
  const response = await createRequest(`${url}/${Number.MAX_SAFE_INTEGER}/`); // "\/$"

  const { window } = createDOM(response);

  const text = window.document.querySelector('.strankovani a:last-child')?.textContent;

  return toNumber(text);
}

export default getPageCount;
