/**
 * Shared game object.
 */

import { GameQueue } from '../GameQueue';

export let gameQueue: GameQueue;

export const generateGameQueue = () => {
  gameQueue = new GameQueue();
  return gameQueue;
};

export const getGameQueue = () => {
  return gameQueue || generateGameQueue();
};
