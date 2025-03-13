
import { Herb } from '@/data/types';
import { herbalTeasPart1 } from './part1';
import { herbalTeasPart2 } from './part2';
import { herbalTeasPart3 } from './part3';
import { herbalTeasPart4 } from './part4';
import { herbalTeasPart5 } from './part5';

// Combine all herbal teas into a single export
export const herbalTeas: Herb[] = [
  ...herbalTeasPart1,
  ...herbalTeasPart2,
  ...herbalTeasPart3,
  ...herbalTeasPart4,
  ...herbalTeasPart5
];
