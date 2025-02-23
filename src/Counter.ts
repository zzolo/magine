import { Card } from './Card';
import type { CardModifier, CardModifierFunction } from './types';

export abstract class Counter {
  abstract name: string;
  abstract id: string;
  abstract description: string;
  abstract modifier: CardModifier | CardModifierFunction;
}
