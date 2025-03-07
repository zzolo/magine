/**
 * Queue to handle communication of game state between server and clients.
 *
 */

import { GameRelay } from './GameRelay';
import { getGameRelay as getSharedGameRelay } from './shared/relay';
import type {
  GameQueueEvent,
  GameQueueStateChange,
  GameQueueInputRequest,
  GameQueueInputResponse
} from './types';

export class GameQueue {
  private relay: GameRelay;
  private events: GameQueueEvent[];

  constructor(relay: GameRelay = getSharedGameRelay()) {
    this.relay = relay;
    this.events = [];
  }

  // Send a state update and log it
  sendState(
    objectId: string,
    state: Record<string, unknown>,
    previousState?: Record<string, unknown>
  ) {
    const event: GameQueueStateChange = { objectId, state, previousState, timestamp: Date.now() };
    this.events.push(event);
    this.relay.sendState(event);
  }

  // Request input, log the request, and store the response once received
  async requestInput(
    playerId: string,
    objectId: string,
    requestId: string,
    inputIds: string[]
  ): Promise<GameQueueInputResponse> {
    const event: GameQueueInputRequest = {
      objectId,
      requestId,
      playerId,
      inputIds,
      timestamp: Date.now()
    };
    this.events.push(event);

    const response: GameQueueInputResponse = await this.relay.requestInput(event);
    this.events.push(response);

    return response;
  }
}
