
import { Herb } from '@/data/types';
import { brainHerbsPart1 } from './part1';
import { brainHerbsPart2 } from './part2';
import { brainHerbsPart3 } from './part3';
import { brainHerbsPart4 } from './part4';
import { brainHerbsPart5 } from './part5';

// Combine all brain herbs into a single export
export const brainHerbs: Herb[] = [
  ...brainHerbsPart1,
  ...brainHerbsPart2,
  ...brainHerbsPart3,
  ...brainHerbsPart4,
  ...brainHerbsPart5
];
