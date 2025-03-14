
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

// Function to deduplicate herbs by ID
const deduplicateHerbs = (herbs: Herb[]): Herb[] => {
  const uniqueHerbs = new Map<string, Herb>();
  
  herbs.forEach(herb => {
    // Only add the herb if it's not already in the map
    // or if we want to prioritize certain categories, we could add logic here
    if (!uniqueHerbs.has(herb.id)) {
      uniqueHerbs.set(herb.id, herb);
    }
  });
  
  return Array.from(uniqueHerbs.values());
};

// Combine all herbs into one array and deduplicate
const combinedHerbs: Herb[] = [
  ...heartHerbs.map(herb => ({ ...herb, category: 'heart' as const })),
  ...stomachHerbs.map(herb => ({ ...herb, category: 'stomach' as const })),
  ...mensHerbs.map(herb => ({ ...herb, category: 'mens' as const })),
  ...womensHerbs.map(herb => ({ ...herb, category: 'womens' as const })),
  ...brainHerbs.map(herb => ({ ...herb, category: 'brain' as const })),
  ...herbalTeasAsHerbs // Add herbal teas to allHerbs
];

// Deduplicate herbs to ensure unique IDs
export const allHerbs: Herb[] = deduplicateHerbs(combinedHerbs);

// For debugging
console.log("Total herbs (before deduplication):", combinedHerbs.length);
console.log("Total herbs (after deduplication):", allHerbs.length);
console.log("Brain herbs count:", brainHerbs.length);
console.log("Heart herbs count:", heartHerbs.length);
console.log("Stomach herbs count:", stomachHerbs.length);
console.log("Herbal teas count:", herbalTeasAsHerbs.length);

// Log any duplicate herbs that were removed
const duplicateIds = combinedHerbs
  .map(herb => herb.id)
  .filter((id, index, array) => array.indexOf(id) !== index);

if (duplicateIds.length > 0) {
  console.log("Duplicate herb IDs removed:", [...new Set(duplicateIds)]);
}
