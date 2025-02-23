/**
 * Project types.
 */

import { Card } from './Card';
import { defaultPhases, defaultSteps } from './constants/phases-turns';

// https://scryfall.com/docs/api/colors
type CardColor = 'W' | 'U' | 'B' | 'R' | 'G';

// Symbol string (not very strict type here)
type SymbolString = string;

// Card type
type CardType =
  | 'land'
  | 'creature'
  | 'artifact'
  | 'enchantment'
  | 'instant'
  | 'planeswalker'
  | 'sorcery'
  | 'kindred'
  | 'dungeon'
  | 'battle'
  | 'plane'
  | 'phenomenon'
  | 'vanguard'
  | 'scheme'
  | 'conspiracy';

// Super types
type SuperType = 'basic' | 'legendary' | 'snow' | 'world';

// Sub types don't necessarily need to be fully enumarated, but having
// some listed is useful
// https://mtg.fandom.com/wiki/Subtype
type SubType =
  | 'equipment'
  | 'aura'
  | 'saga'
  | 'vehicle'
  | 'blood'
  | 'clue'
  | 'food'
  | 'gold'
  | 'incubator'
  | 'junk'
  | 'map'
  | 'powerstone'
  | 'treasure'
  | string;

// Phase type
type Phase = (typeof defaultPhases)[number];

// Step
type Step = (typeof defaultSteps)[number];

// Grouped steps
type GroupedSteps = Step[][];

// Deck type
type DeckType = '';

// Card Modifier return
type CardModifierReturn = string | number | null;

// Card Modifier object
type CardModifier = { [key: string]: CardModifierReturn | ((card: Card) => CardModifierReturn) };

// Card Modifier function
type CardModifierFunction = (card: Card) => CardModifier;

// Coin flip result
type CoinFlip = 'heads' | 'tails';
