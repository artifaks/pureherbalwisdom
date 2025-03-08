
import { heartHerbs } from './categories/heartHerbs';
import { stomachHerbs } from './categories/stomachHerbs';
import { mensHerbs } from './categories/mensHerbs';
import { womensHerbs } from './categories/womensHerbs';
import { brainHerbs } from './categories/brainHerbs';
import { herbalTeas } from './categories/herbalTeas';
import { Herb } from './types';

// The herbal teas are already in Herb format, no need to convert
const herbalTeasAsHerbs: Herb[] = herbalTeas.map(tea => ({
  ...tea,
  category: 'tea' as const
}));

// Combine all herbs into one array
export const allHerbs: Herb[] = [
  ...heartHerbs.map(herb => ({ ...herb, category: 'heart' as const })),
  ...stomachHerbs.map(herb => ({ ...herb, category: 'stomach' as const })),
  ...mensHerbs.map(herb => ({ ...herb, category: 'mens' as const })),
  ...womensHerbs.map(herb => ({ ...herb, category: 'womens' as const })),
  ...brainHerbs.map(herb => ({ ...herb, category: 'brain' as const })),
  ...herbalTeasAsHerbs // Add herbal teas to allHerbs
];

// For debugging
console.log("Total herbs:", allHerbs.length);
console.log("Brain herbs count:", brainHerbs.length);
console.log("Heart herbs count:", heartHerbs.length);
console.log("Stomach herbs count:", stomachHerbs.length);
console.log("Herbal teas count:", herbalTeasAsHerbs.length);
