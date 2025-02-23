import { randomInt } from 'crypto';
import type { CoinFlip } from '../types';

/**
 * Flip a coin.
 *
 * @returns CoinFlip - 'heads' or 'tails'
 */
export function coinFlip(): CoinFlip {
  return randomInt(0, 1) === 0 ? 'heads' : 'tails';
}

/**
 * Roll a die.
 *
 * @returns number - a random number between 1 and sides
 */
export function rollDie(sides: number = 6): number {
  return randomInt(1, sides);
}

/**
 * Shuffle an array.
 *
 * Uses the Fisher-Yates Sorting Algorithm.
 *
 * @returns T[] - a shuffled copy of the input array
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
