import debugGenerator from 'debug';
import { Core } from './Core';
import { Player } from './Player';
import { Turn } from './Turn';
import { shuffle } from './utilities/random';

const debug = debugGenerator('magine:game');

export class Game extends Core {
  type = 'game';
  players: Player[];
  activePlayer: Player;
  losers: Player[];
  winner: Player;
  turn: number = 0;
  turns: Turn[] = [];
  startingHandSize: number = 7;

  /**
   * General construtor to apply properties.
   *
   * TODO: Articulate specific properties to use in constructor
   * and validate.
   *
   * @param {Object} obj - An object with properties to assign.
   */
  constructor(obj: Partial<Game> = {}) {
    super();
    debug('Game constructor called with %o', obj);
    Object.assign(this, obj);
  }

  /**
   * Is multiple player.
   */
  get multiplayer(): boolean {
    return this.players.length > 2;
  }

  /**
   * Is multiple player.
   */
  get ended(): boolean {
    return this.winner !== undefined;
  }

  /**
   * Start the game.
   */
  start() {
    // Determine order of players
    this.players = shuffle(this.players);
    for (const player of this.players) {
      player.initialize(this.startingHandSize);
    }
  }

  /**
   * Player loses the game.
   */
  lose(player: Player) {
    // Put player in losers array
    this.losers.push(player);

    // Remove player from players array
    this.players = this.players.filter((p) => p !== player);

    // Check if there is only one player left, they are the winner
    if (this.players.length === 1) {
      this.winner = this.players[0];
    }
  }

  /**
   * Concede the game.
   */
  concede(player: Player) {
    this.lose(player);
  }
}
