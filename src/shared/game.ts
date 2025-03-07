/**
 * Shared game object.
 */

import { Game } from '../Game';

export let game: Game;

export const generateGame = () => {
  game = new Game();
  return game;
};

export const getGame = () => {
  return game || generateGame();
};
