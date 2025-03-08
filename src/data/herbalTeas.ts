
import { HerbalTea } from './types';

export const herbalTeas: HerbalTea[] = [
  {
    id: 'chamomile-tea',
    name: 'Chamomile Tea',
    color: '#FFD700',
    benefits: [
      'Promotes sleep and relaxation',
      'Soothes digestive discomfort',
      'Helps reduce inflammation',
      'May reduce menstrual pain'
    ],
    preparation: "1. Use 1 tablespoon of dried chamomile flowers per cup\n2. Pour hot water (not boiling) over the flowers\n3. Steep for 5 minutes, covered\n4. Strain and enjoy, optionally with honey",
    effects: ['Relaxing', 'Soothing', 'Anti-inflammatory'],
    bestTimeToConsume: 'Evening, before bedtime'
  },
  {
    id: 'peppermint-tea',
    name: 'Peppermint Tea',
    color: '#90EE90',
    benefits: [
      'Relieves digestive issues and IBS symptoms',
      'Reduces headache pain',
      'Opens nasal passages and relieves congestion',
      'Freshens breath naturally'
    ],
    preparation: "1. Use 1-2 teaspoons of dried peppermint leaves per cup\n2. Pour hot water over the leaves\n3. Steep for 5-7 minutes\n4. Strain and enjoy plain or with a touch of honey",
    effects: ['Cooling', 'Stimulating', 'Digestive aid'],
    bestTimeToConsume: 'After meals or when experiencing digestive discomfort'
  },
  {
    id: 'ginger-tea',
    name: 'Ginger Tea',
    color: '#F4A460',
    benefits: [
      'Relieves nausea and motion sickness',
      'Improves circulation and warms the body',
      'Supports immune function',
      'Reduces inflammation and muscle pain'
    ],
    preparation: "1. Slice 1-2 inches of fresh ginger root thinly\n2. Simmer in water for 10-15 minutes\n3. Add lemon and honey to taste\n4. Strain and serve hot",
    effects: ['Warming', 'Stimulating', 'Anti-inflammatory'],
    bestTimeToConsume: 'Morning or when feeling cold/experiencing nausea'
  },
  {
    id: 'lavender-tea',
    name: 'Lavender Tea',
    color: '#B57EDC',
    benefits: [
      'Calms anxiety and stress',
      'Promotes restful sleep',
      'Soothes headaches',
      'May help reduce depression symptoms'
    ],
    preparation: "1. Use 1 tablespoon of dried lavender buds per cup\n2. Pour hot water over the buds\n3. Steep for 5 minutes\n4. Strain and sweeten lightly if desired",
    effects: ['Calming', 'Relaxing', 'Stress-relieving'],
    bestTimeToConsume: 'Evening or during stressful situations'
  },
  {
    id: 'echinacea-tea',
    name: 'Echinacea Tea',
    color: '#DDA0DD',
    benefits: [
      'Supports immune system function',
      'May reduce cold duration and symptoms',
      'Contains anti-inflammatory properties',
      'Helps fight infections'
    ],
    preparation: "1. Use 1-2 teaspoons of dried echinacea (root, leaves, or flowers) per cup\n2. Pour boiling water over herbs\n3. Steep for 10-15 minutes\n4. Strain and drink up to 3 times daily when needed",
    effects: ['Immune-boosting', 'Protective', 'Therapeutic'],
    bestTimeToConsume: 'At first sign of illness or throughout cold/flu season'
  },
  {
    id: 'lemon-balm-tea',
    name: 'Lemon Balm Tea',
    color: '#ADFF2F',
    benefits: [
      'Reduces anxiety and stress',
      'Improves sleep quality',
      'Supports cognitive function',
      'May help with cold sores'
    ],
    preparation: "1. Use 1-2 tablespoons of fresh or 1 tablespoon of dried lemon balm per cup\n2. Pour hot water over the herbs\n3. Steep for 5-10 minutes\n4. Strain and enjoy with optional honey",
    effects: ['Calming', 'Uplifting', 'Antiviral'],
    bestTimeToConsume: 'Evening or during stressful periods'
  },
  {
    id: 'hibiscus-tea',
    name: 'Hibiscus Tea',
    color: '#FF69B4',
    benefits: [
      'May lower blood pressure',
      'Rich in vitamin C and antioxidants',
      'Supports heart health',
      'Refreshing and cooling for the body'
    ],
    preparation: "1. Use 1-2 tablespoons of dried hibiscus flowers per cup\n2. Pour boiling water over flowers\n3. Steep for 5-10 minutes\n4. Strain and enjoy hot or cold, sweetened if desired",
    effects: ['Cooling', 'Cardioprotective', 'Refreshing'],
    bestTimeToConsume: 'Throughout the day, especially in warm weather'
  },
  {
    id: 'rooibos-tea',
    name: 'Rooibos Tea',
    color: '#CD5C5C',
    benefits: [
      'Rich in antioxidants',
      'Naturally caffeine-free',
      'May improve skin health',
      'Supports respiratory health'
    ],
    preparation: "1. Use 1 teaspoon of rooibos per cup\n2. Pour boiling water over the leaves\n3. Steep for 5-7 minutes\n4. Enjoy plain or with milk and honey",
    effects: ['Soothing', 'Hydrating', 'Mineral-rich'],
    bestTimeToConsume: 'Any time of day, suitable as a caffeine-free alternative'
  }
];
