import { Game } from './Game';
import { Player } from './Player';
import { loadCard } from './utilities/cards';

let p1 = new Player({ name: 'Alice', id: 'alice' });
let p2 = new Player({ name: 'Bob', id: 'bob' });
let g = new Game({ players: [p1, p2] });

//g.start();

console.log(g);

await loadCard('Forest');
