import { Card } from '../Card';
import { Face } from '../Face';
import type { ScryfallCard } from '@scryfall/api-types';

/**
 * Make a new Card object utilizing the scryfall API.
 */
export async function loadCard(cardName: string): Promise<Card> {
  let cardSource: ScryfallCard.Any = await fetch(
    `https://api.scryfall.com/cards/named?exact=${cardName}`
  ).then((res) => res.json());

  // Cast to the appropriate type.
  if ('card_faces' in cardSource) {
    cardSource = cardSource as ScryfallCard.AnyMultiFaced;
  }
  else {
    cardSource = cardSource as ScryfallCard.AnySingleFaced;
  }

  // Get faces
  const facesSource = 'card_faces' in cardSource ? cardSource.card_faces : [cardSource];

  // Create faces
  const faces = facesSource.map((faceSource) => {
    return new Face({
      name: faceSource.name,
      manaCosts: [faceSource.mana_cost],
      typeLine: faceSource.type_line,
      rulesText: faceSource.oracle_text,
      flavorText: faceSource.flavor_text,
      power: faceSource.power,
      toughness: faceSource.toughness,
      loyalty: faceSource.loyalty,
      colors: faceSource.colors,
      colorIdentity: faceSource.color_identity,
      manaValue: faceSource.cmc,
      manaProduced: faceSource.produced_mana,
      imageUri: faceSource.image_uris.normal
    });
  });

  console.log(facesSource);
  console.log(
    new Card({
      name: cardSource.name,
      faces: faces
    })
  );
  return new Card({
    name: cardSource.name,
    faces: faces
  });
}
