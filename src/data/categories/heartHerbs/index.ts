
import { Herb } from '@/data/types';
import { heartHerbsPart1 } from './part1';
import { heartHerbsPart2 } from './part2';
import { heartHerbsPart3 } from './part3';
import { heartHerbsPart4 } from './part4';
import { heartHerbsPart5 } from './part5';

// Combine all heart herbs into a single export
export const heartHerbs: Herb[] = [
  ...heartHerbsPart1,
  ...heartHerbsPart2,
  ...heartHerbsPart3,
  ...heartHerbsPart4,
  ...heartHerbsPart5
];
