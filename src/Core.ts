/**
 * Core class to extend from for game objects.
 */

import { generateId } from './utilities/random';
import { GameQueue } from './GameQueue';
import { getGameQueue as getSharedGameQueue } from './shared/queue';
import type { GameQueueStateChange } from './types';

export class Core {
  readonly objectId: string | null = null;
  readonly typeId: string;
  protected queue: GameQueue;
  protected ignoredProperties = ['objectId', 'typeId', 'queue', 'ignoredProperties'];

  constructor(gameQueue: GameQueue = getSharedGameQueue()) {
    this.typeId = Core.name;
    this.objectId = generateId(this.typeId);
    this.queue = gameQueue;

    // Create a Proxy to auto-track property changes
    return new Proxy(this, {
      set: (target, property, value) => {
        if (typeof property === 'string' && !this.ignoredProperties.includes(property)) {
          target.updateState(property, value);
          return true;
        }
        return Reflect.set(target, property, value);
      }
    });
  }

  /**
   * Updates state and notifies the game queue.
   */
  private updateState(key: string, value: unknown): void {
    // Make a shallow copy for the previous state
    // TODO: Deep copy?
    const previousState = { ...this.getState() };

    // Update value
    (this as any)[key] = value;

    // Update queue
    this.queue.sendState(this.objectId, this.getState(), previousState);
  }

  /**
   * Returns the current state of the object.
   */
  getState(): Record<string, unknown> {
    const state: Record<string, unknown> = {};
    for (const key of Object.keys(this)) {
      if (!this.ignoredProperties.includes(key)) {
        state[key] = (this as any)[key];
      }
    }
    return state;
  }
}
