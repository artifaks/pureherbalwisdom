import { Herb } from '@/data/types';
import { PlantSuggestion } from '@/services/plantIdentification';

export interface PlantMatch {
  suggestion: PlantSuggestion;
  matchedHerb: Herb | null;
  matchType: 'exact' | 'partial' | 'none';
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function findHerbMatch(suggestion: PlantSuggestion, herbs: Herb[]): { herb: Herb; type: 'exact' | 'partial' } | null {
  const namesToCheck = [
    ...suggestion.commonNames,
    suggestion.name, // scientific name
  ].map(normalize);

  for (const herb of herbs) {
    const herbName = normalize(herb.name);

    // Exact match
    for (const name of namesToCheck) {
      if (name === herbName) {
        return { herb, type: 'exact' };
      }
    }
  }

  // Partial / contains match (second pass)
  for (const herb of herbs) {
    const herbName = normalize(herb.name);

    for (const name of namesToCheck) {
      // "German Chamomile" contains "chamomile"
      if (name.includes(herbName) || herbName.includes(name)) {
        return { herb, type: 'partial' };
      }
    }
  }

  // First-word match (third pass)
  for (const herb of herbs) {
    const herbFirstWord = normalize(herb.name).split(/\s+/)[0];
    if (herbFirstWord.length < 4) continue; // skip very short words

    for (const name of namesToCheck) {
      const nameFirstWord = name.split(/\s+/)[0];
      if (nameFirstWord === herbFirstWord) {
        return { herb, type: 'partial' };
      }
    }
  }

  return null;
}

export function matchPlantsToHerbs(suggestions: PlantSuggestion[], herbs: Herb[]): PlantMatch[] {
  return suggestions.map((suggestion) => {
    const match = findHerbMatch(suggestion, herbs);
    return {
      suggestion,
      matchedHerb: match?.herb ?? null,
      matchType: match?.type ?? 'none',
    };
  });
}
