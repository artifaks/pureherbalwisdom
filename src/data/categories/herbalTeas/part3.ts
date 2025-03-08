
import { Herb } from '@/data/types';

// Third part of herbal teas (new herbs)
export const herbalTeasPart3: Herb[] = [
  {
    id: 'rooibos-tea',
    name: 'Rooibos Tea',
    color: '#D84315',
    benefits: [
      'Caffeine-free antioxidant-rich tea',
      'Supports overall wellness and relaxation',
      'Traditional South African remedy',
      'Gentle enough for daily consumption'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1 tablespoon dried rooibos\n2. Pour boiling water over herb\n3. Steep covered for 5-10 minutes\n4. Strain and enjoy any time of day",
    effects: ['Antioxidant', 'Calming', 'Hydrating'],
    bestTimeToConsume: "Any time of day, especially evening as a caffeine-free alternative"
  },
  {
    id: 'nettle-tea',
    name: 'Nettle Tea',
    color: '#558B2F',
    benefits: [
      'Mineral-rich nourishing tea',
      'Supports healthy inflammatory response',
      'Traditional spring tonic for vitality',
      'May help with seasonal wellness'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1 tablespoon dried nettle leaves\n2. Pour boiling water over herb\n3. Steep covered for 10-15 minutes\n4. Strain and enjoy daily",
    effects: ['Nutritive', 'Cleansing', 'Mineralizing'],
    bestTimeToConsume: "Morning or midday, especially during seasonal changes"
  },
  {
    id: 'rose-hip-tea',
    name: 'Rose Hip Tea',
    color: '#E57373',
    benefits: [
      'Rich in vitamin C and antioxidants',
      'Supports immune system health',
      'Traditional winter wellness tea',
      'Pleasant tart flavor with subtle sweetness'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1-2 teaspoons dried rose hips\n2. Simmer in water for 15 minutes\n3. Strain and add honey if desired\n4. Enjoy hot or cold",
    effects: ['Immune supporting', 'Vitamin rich', 'Antioxidant'],
    bestTimeToConsume: "Morning or afternoon, especially during winter months"
  },
  {
    id: 'dandelion-root-tea',
    name: 'Dandelion Root Tea',
    color: '#8D6E63',
    benefits: [
      'Supports liver health and detoxification',
      'Traditional bitter for digestive wellness',
      'Rich in nutrients that support overall health',
      'Roasted root makes a coffee alternative'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1 tablespoon dried or roasted dandelion root\n2. Simmer in water for 10-15 minutes\n3. Strain and add cinnamon if desired\n4. Enjoy morning or afternoon",
    effects: ['Liver supporting', 'Detoxifying', 'Digestive aid'],
    bestTimeToConsume: "Morning or after meals to support digestion"
  },
  {
    id: 'valerian-tea',
    name: 'Valerian Tea',
    color: '#BDBDBD',
    benefits: [
      'Powerful herb for sleep and relaxation',
      'Supports healthy nervous system function',
      'Traditional European remedy for rest',
      'May help with occasional sleeplessness'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1 teaspoon dried valerian root\n2. Pour boiling water over herb\n3. Steep covered for 10-15 minutes\n4. Strain and enjoy before bed",
    effects: ['Sleep promoting', 'Relaxing', 'Calming'],
    bestTimeToConsume: "30-60 minutes before bedtime"
  }
];
