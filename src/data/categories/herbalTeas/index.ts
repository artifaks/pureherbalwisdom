
import { Herb } from '@/data/types';
import { herbalTeasPart1 } from './part1';
import { herbalTeasPart2 } from './part2';

// Combine all herbal teas into a single export
export const herbalTeas: Herb[] = [
  ...herbalTeasPart1,
  ...herbalTeasPart2
];
