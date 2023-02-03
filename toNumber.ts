/*
 * Copyright 2023 Marek Kobida
 */

function toNumber(input: string | null | undefined): number {
  if (input) {
    input = input.replace(/\s+/g, '');

    const [n] = /\d+/.exec(input) ?? [];

    if (n) {
      return +n;
    }
  }

  console.error(`\x1b[31mInput "${input}" is not a valid number.\x1b[0m`);

  return -1;
}

export default toNumber;
