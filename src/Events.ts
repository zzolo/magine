import { generateId } from './utilities/random';
import type { EventHandler } from './types';

export class Events {
  private listeners: Map<string, Map<string, EventHandler>> = new Map();

  /**
   * Subscribe to an event type and return a unique listener ID.
   *
   * @param eventType The name of the event.
   * @param handler The function to call when the event is emitted.
   * @returns A unique listener ID for later removal.
   */
  on<T>(eventType: string, handler: EventHandler<T>, count: number = Infinity): string {
    const listenerId = generateId(`listener-${eventType}`);

    let runCount = 0;
    const wrapperHandler: EventHandler<T> = (eventData: T) => {
      runCount++;
      handler(eventData);
      if (runCount >= count) {
        this.off(eventType, listenerId);
      }
    };

    // Group by event type
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Map());
    }

    // Then by id
    this.listeners.get(eventType)!.set(listenerId, wrapperHandler);
    return listenerId;
  }

  /**
   * Once shorthand for on(eventType, handler, 1).
   */
  once<T>(eventType: string, handler: EventHandler<T>): string {
    return this.on(eventType, handler, 1);
  }

  /**
   * Unsubscribe a specific handler using its listener ID.
   *
   * @param eventType The name of the event.
   * @param listenerId The unique listener ID.
   */
  off(eventType: string, listenerId: string): void {
    this.listeners.get(eventType)?.delete(listenerId);
  }

  /**
   * Emit an event, notifying all listeners.
   * @param eventType The event name.
   * @param eventData The data associated with the event.
   */
  emit<T>(eventType: string, eventData: T): void {
    if (this.listeners.has(eventType)) {
      this.listeners.get(eventType)!.forEach((handler) => handler(eventData));
    }
  }

  /**
   * Remove all listeners for a specific event type.
   *
   * @param eventType The name of the event.
   */
  removeAllListeners(eventType: string): void {
    this.listeners.delete(eventType);
  }
}
