
import { heartHerbs } from './heartHerbs';
import { stomachHerbs } from './stomachHerbs';
import { mensHerbs } from './mensHerbs';
import { womensHerbs } from './womensHerbs';
import { brainHerbs } from './brainHerbs';
import { herbalTeas } from './herbalTeas';
import { Herb } from './types';

// Convert herbal teas to the Herb format
const herbalTeasAsHerbs: Herb[] = herbalTeas.map(tea => ({
  id: tea.id,
  name: tea.name,
  color: tea.color,
  benefits: tea.benefits,
  oilPreparation: "Not applicable for herbal teas.",
  tincturePreparation: tea.preparation,
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
console.log("Herbal teas count:", herbalTeasAsHerbs.length);
