
import { HerbPairing } from '@/data/herbPairings';

// Default herb pairings for any herb without specific pairings
export const defaultHerbPairings: HerbPairing[] = [
  {
    herbId: 'ginger',
    reason: 'Ginger is a warming herb that enhances circulation and can complement many other herbs.'
  },
  {
    herbId: 'turmeric',
    reason: 'Turmeric\'s anti-inflammatory properties work well with many herbs to enhance overall effects.'
  },
  {
    herbId: 'ashwagandha',
    reason: 'As an adaptogen, ashwagandha can enhance the effects of many herbs by helping the body manage stress.'
  },
  {
    herbId: 'hawthorn',
    reason: 'Hawthorn provides heart support alongside this herb\'s benefits'
  },
  {
    herbId: 'nettle',
    reason: 'Nettle contributes mineral support and gentle detoxification'
  }
];
