import debugGenerator from 'debug';
import type { CardType, SuperType, SubType, SymbolString, CardColor } from './types';

const debug = debugGenerator('magine:face');

export class Face {
  name?: string;
  typeLine?: string;
  cardTypes: CardType[];
  superTypes?: SuperType[];
  subTypes?: SubType[];
  rulesText?: string;
  flavorText?: string;
  manaCosts: SymbolString[];
  manaValue: number;
  colors: CardColor[];
  colorIdentity: CardColor[];
  token: boolean;
  copy: boolean;
  power?: number;
  toughness?: number;
  loyalty?: number;
  imageUri?: string;
  manaProduced?: CardColor[];

  /**
   * General construtor to apply properties.
   *
   * TODO: Articulate specific properties to use in constructor
   * and validate.
   *
   * @param {Object} obj - An object with properties to assign.
   */
  constructor(obj: Partial<Face> = {}) {
    debug('Face constructor called with %o', obj);
    Object.assign(this, obj);
  }
}
