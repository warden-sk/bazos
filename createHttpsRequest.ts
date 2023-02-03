/*
 * Copyright 2023 Marek Kobida
 */

import https from 'https';

function createHttpsRequest(url: string): Promise<Buffer> {
  return new Promise($ => {
    const request = https.request(url, response => {
      let chunks: Buffer[] = [];

      response.on('data', chunk => {
        chunks = [...chunks, chunk];
      });

      response.on('end', () => {
        $(Buffer.concat(chunks));
      });
    });

    request.on('error', error => {
      console.error(error);
    });

    request.end();
  });
}

export default createHttpsRequest;
