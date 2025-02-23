import type { SymbolString, CardColor } from './types';

// https://scryfall.com/docs/api/card-symbols/all
export class Symbol {
  symbol: SymbolString;
  description: string;
  representsMana: boolean;
  appearsInManaCost: boolean;
  manaValue: number;
  hybrid: boolean;
  phyrexian: boolean;
  colors: CardColor[];
}

/**
 * Parse symbol.
 */
export function parseSymbolString(symbolString: string): Symbol[] {
  const symbolsRegex = /\{(.+?)\}/g;
  const manaRegex = /(^|\})(\d+)(\{|$)/g;
  const reduced = symbolString.toLowerCase().trim().replace(/\s+/g, '');
  const symbols = reduced.match(symbolsRegex);
  const mana = reduced.match(manaRegex);

  // TODO: Lookup from defined Symbols
  return [];
}
