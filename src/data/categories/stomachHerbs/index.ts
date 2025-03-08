
import { Herb } from '@/data/types';
import { stomachHerbsPart1 } from './part1';
import { stomachHerbsPart2 } from './part2';
import { stomachHerbsPart3 } from './part3';
import { stomachHerbsPart4 } from './part4';
import { stomachHerbsPart5 } from './part5';
import { stomachHerbsPart6 } from './part6';

// Combine all stomach herbs into a single export
export const stomachHerbs: Herb[] = [
  ...stomachHerbsPart1,
  ...stomachHerbsPart2,
  ...stomachHerbsPart3,
  ...stomachHerbsPart4,
  ...stomachHerbsPart5,
  ...stomachHerbsPart6
];
