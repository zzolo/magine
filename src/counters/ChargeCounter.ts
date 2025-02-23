import { Counter } from '../Counter';
import { Card } from '../Card';

export class ChargeCounter extends Counter {
  name = 'Charge';
  id = 'charge';
  description = 'Adds a charge counter to an artifact';

  modifier = {
    charges: 1
  };
}
