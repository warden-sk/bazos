/*
 * Copyright 2023 Marek Kobida
 */

import https from 'https';

function createRequest(url: string): Promise<string> {
  return new Promise($ => {
    const request = https.request(url, response => {
      let chunks: Buffer[] = [];

      response.on('data', chunk => {
        chunks = [...chunks, chunk];
      });

      response.on('end', () => {
        const html = chunks.toString();

        $(html);
      });
    });

    request.on('error', error => {
      console.error(error);
    });

    request.end();
  });
}

export default createRequest;
