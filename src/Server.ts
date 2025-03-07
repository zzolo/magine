import { Events } from './Events';
import { Game } from './Game';
import { GameRelay } from './GameRelay';
import { GameQueue } from './GameQueue';
import { generateId } from './utilities/random';
import { getEvents } from './shared/events';
import { getGame } from './shared/game';
import { getGameRelay } from './shared/relay';
import { getGameQueue } from './shared/queue';

export class Server {
  private objectId: string;
  private events: Events;
  private game: Game;
  private relay: GameRelay;
  private queue: GameQueue;

  constructor() {
    this.objectId = generateId('server');
    this.events = getEvents();
    this.game = getGame();
    this.relay = getGameRelay();
    this.queue = getGameQueue();

    setTimeout(() => {
      this.queue.sendState('sdfsdf', { state: 'running' }, { state: 'stopped' });
      this.queue.requestInput('sdf', 'sdfffds', 'sdfsdff', ['sd']);
      this.game.turn = 10;
    }, 2000);
  }
}
