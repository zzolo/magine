import { Card } from './Card';
import type { DeckType } from './types';

export class Deck {
  type: DeckType;
  cards: Card[];
  minimumSize: number;
  maximumSize: number = Infinity;
  sideboardCards: Card[];
  sideboardMinimumSize: number = 0;
  sideboardMaximumSize: number = 15;
  commander: Card;
}
