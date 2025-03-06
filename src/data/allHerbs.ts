
import { heartHerbs } from './heartHerbs';
import { stomachHerbs } from './stomachHerbs';
import { mensHerbs } from './mensHerbs';
import { womensHerbs } from './womensHerbs';
import { brainHerbs } from './brainHerbs';
import { Herb } from './types';

// Combine all herbs into one array
export const allHerbs: Herb[] = [
  ...heartHerbs.map(herb => ({ ...herb, category: 'heart' as const })),
  ...stomachHerbs.map(herb => ({ ...herb, category: 'stomach' as const })),
  ...mensHerbs.map(herb => ({ ...herb, category: 'mens' as const })),
  ...womensHerbs.map(herb => ({ ...herb, category: 'womens' as const })),
  ...brainHerbs.map(herb => ({ ...herb, category: 'brain' as const })) // Ensure category is added
];

// For debugging
console.log("Total herbs:", allHerbs.length);
console.log("Brain herbs count:", brainHerbs.length);
