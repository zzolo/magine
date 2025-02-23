import debugGenerator from 'debug';
import { Face } from './Face';
import { Counter } from './Counter';
import type { CardModifier } from './types';

const debug = debugGenerator('magine:card');

// https://media.wizards.com/2025/downloads/MagicCompRules%2020250207.pdf#page=44
export class Card {
  name: string;
  id: string;
  faces: Face[];
  playedFaceIndex: number;
  counters: Counter[];
  modifiers: CardModifier[];
  tapped: boolean;

  /**
   * General construtor to apply properties.
   *
   * TODO: Articulate specific properties to use in constructor
   * and validate.
   *
   * @param {Object} obj - An object with properties to assign.
   */
  constructor(obj: Partial<Card> = {}) {
    debug('Card constructor called with %o', obj);
    Object.assign(this, obj);
  }

  get currentFace(): Face {
    return this.faces[this.playedFaceIndex];
  }
}
