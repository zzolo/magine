import debugGenerator from 'debug';
import { Card } from './Card';
import { Deck } from './Deck';
import { Game } from './Game';
import { shuffle } from './utilities/random';

const debug = debugGenerator('magine:player');

export class Player {
  name: string;
  id: string;
  deck: Deck;
  library: Card[];
  sideboard: Card[];
  hand: Card[];
  graveyard: Card[];
  exile: Card[];
  life: number;
  poison: number;
  maxHandSize: number;
  commander: Card;
  battefield: Card[];
  game: Game;

  /**
   * General construtor to apply properties.
   *
   * TODO: Articulate specific properties to use in constructor
   * and validate.
   *
   * @param {Partial<Player>} obj - An object with properties to assign.
   */
  constructor(obj: Partial<Player> = {}) {
    debug('Player constructor called with %o', obj);
    Object.assign(this, obj);
  }

  /**
   * Initialize library, sideboard, hand, graveyard, and exile.
   */
  initialize(startingHandSize = 7) {
    this.library = shuffle(this.deck.cards);
    this.sideboard = [...this.deck.sideboardCards];
    this.hand = [];
    this.graveyard = [];
    this.exile = [];
    this.draw(startingHandSize);
  }

  /**
   * Draw cards from the library.
   */
  draw(cards = 1) {
    let drawn = 0;
    while (drawn < cards) {
      if (this.library.length > 0) {
        const card = this.library.shift();
        this.hand.push(card);
        drawn++;

        debug(`${this.name} draws ${card.name}`);
      }
      else {
        this.game.lose(this);
        break;
      }
    }
  }
}
