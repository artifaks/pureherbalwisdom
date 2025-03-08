
import { Herb } from '@/data/types';

// First part of herbal teas
export const herbalTeasPart1: Herb[] = [
  {
    id: 'chamomile-tea',
    name: 'Chamomile Tea',
    color: '#FDD835',
    benefits: [
      'Calming herb for restful sleep',
      'Supports healthy digestion',
      'Gentle and safe for all ages',
      'Traditionally used for relaxation'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1 tablespoon dried chamomile flowers per cup\n2. Pour boiling water over flowers\n3. Steep covered for 5-10 minutes\n4. Strain and enjoy before bedtime",
    effects: ['Relaxing', 'Sleep-inducing', 'Anti-inflammatory'],
    bestTimeToConsume: "Evening, 30-60 minutes before bedtime"
  },
  {
    id: 'peppermint-tea',
    name: 'Peppermint Tea',
    color: '#66BB6A',
    benefits: [
      'Cooling and refreshing for digestion',
      'Helps with focus and mental clarity',
      'Opens respiratory passages',
      'Traditionally used for digestive comfort'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1 tablespoon fresh or 1 teaspoon dried peppermint\n2. Pour boiling water over leaves\n3. Steep covered for 5-7 minutes\n4. Strain and enjoy after meals",
    effects: ['Digestive aid', 'Mental clarity', 'Cooling'],
    bestTimeToConsume: "After meals or mid-morning for focus"
  },
  {
    id: 'ginger-tea',
    name: 'Ginger Tea',
    color: '#FF9800',
    benefits: [
      'Warming and stimulating for circulation',
      'Supports healthy digestion',
      'Traditional remedy for nausea and motion sickness',
      'Immune-supporting properties'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1-inch fresh ginger root, sliced thin\n2. Simmer in water for 10-15 minutes\n3. Add honey and lemon if desired\n4. Strain and enjoy throughout the day",
    effects: ['Warming', 'Anti-nausea', 'Digestive stimulant'],
    bestTimeToConsume: "Morning or when feeling cold or nauseous"
  },
  {
    id: 'lemon-balm-tea',
    name: 'Lemon Balm Tea',
    color: '#AED581',
    benefits: [
      'Calming herb that supports focus',
      'Gentle mood lifting properties',
      'Supports healthy digestion',
      'Traditionally used for nervous tension'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1-2 tablespoons fresh or 1 tablespoon dried lemon balm\n2. Pour boiling water over leaves\n3. Steep covered for 5-10 minutes\n4. Strain and enjoy throughout the day",
    effects: ['Calming', 'Uplifting', 'Digestive support'],
    bestTimeToConsume: "Afternoon or early evening"
  },
  {
    id: 'holy-basil-tea',
    name: 'Holy Basil Tea',
    color: '#8BC34A',
    benefits: [
      'Adaptogenic herb that balances stress response',
      'Supports focus and mental clarity',
      'Traditional Ayurvedic remedy for wellness',
      'Supports healthy immune function'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1 tablespoon fresh or 1 teaspoon dried holy basil\n2. Pour boiling water over leaves\n3. Steep covered for 5-10 minutes\n4. Strain and enjoy throughout the day",
    effects: ['Adaptogenic', 'Stress-reducing', 'Immune supporting'],
    bestTimeToConsume: "Morning or mid-day"
  }
];
