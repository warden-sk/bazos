/*
 * Copyright 2023 Marek Kobida
 */

import jsdom from 'jsdom';

function createDOM(html: Buffer) {
  return new jsdom.JSDOM(html);
}

export default createDOM;
