/**
 * Shared game object.
 */

import { GameRelay } from '../GameRelay';

export let gameRelay: GameRelay;

export const generateGameRelay = () => {
  gameRelay = new GameRelay();
  return gameRelay;
};

export const getGameRelay = () => {
  return gameRelay || generateGameRelay();
};
