import { Counter } from '../Counter';
import { Card } from '../Card';

export class PlusOnePlusOneCounter extends Counter {
  name = '+1/+1';
  id = 'plus-one-plus-one';
  description = 'Increases the power and toughness of a creature by 1';

  modifier = {
    power: 1,
    toughness: 1
  };
}
