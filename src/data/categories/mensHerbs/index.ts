
import { Herb } from '@/data/types';
import { mensHerbsPart1 } from './part1';
import { mensHerbsPart2 } from './part2';
import { mensHerbsPart3 } from './part3';
import { mensHerbsPart4 } from './part4';

// Combine all men's herbs into a single export
export const mensHerbs: Herb[] = [
  ...mensHerbsPart1,
  ...mensHerbsPart2,
  ...mensHerbsPart3,
  ...mensHerbsPart4
];
