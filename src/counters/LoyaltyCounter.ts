import { Counter } from '../Counter';

export class LoyaltyCounter extends Counter {
  name = 'Loyalty';
  id = 'loyalty';
  description = 'Loyalty counter used for Planeswalkers';

  modifier = {
    loyalty: 1
  };
}
