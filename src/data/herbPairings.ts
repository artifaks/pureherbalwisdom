
import { HerbPairing } from '@/data/types';
import { heartHerbPairings } from './pairings/heartPairings';
import { brainHerbPairings } from './pairings/brainPairings';
import { stomachHerbPairings } from './pairings/stomachPairings';
import { mensHerbPairings } from './pairings/mensPairings';
import { womensHerbPairings } from './pairings/womensPairings';
import { defaultHerbPairings } from './pairings/defaultPairings';

// Define pairings data for herbs
export interface HerbPairingsMap {
  [herbId: string]: HerbPairing[];
}

// Combine all pairings into a single export
export const herbPairings: Record<string, HerbPairing[]> = {
  ...heartHerbPairings,
  ...brainHerbPairings,
  ...stomachHerbPairings,
  ...mensHerbPairings,
  ...womensHerbPairings,
  'default': defaultHerbPairings
};
