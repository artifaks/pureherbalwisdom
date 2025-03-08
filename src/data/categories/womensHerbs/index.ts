
import { Herb } from '@/data/types';
import { womensHerbsPart1 } from './part1';
import { womensHerbsPart2 } from './part2';
import { womensHerbsPart3 } from './part3';
import { womensHerbsPart4 } from './part4';
import { womensHerbsPart5 } from './part5';

// Combine all women's herbs into a single export
export const womensHerbs: Herb[] = [
  ...womensHerbsPart1,
  ...womensHerbsPart2,
  ...womensHerbsPart3,
  ...womensHerbsPart4,
  ...womensHerbsPart5
];
