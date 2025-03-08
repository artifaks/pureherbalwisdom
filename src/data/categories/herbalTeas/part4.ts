
import { Herb } from '@/data/types';

// Fourth part of herbal teas (new herbs)
export const herbalTeasPart4: Herb[] = [
  {
    id: 'lavender-chamomile-tea',
    name: 'Lavender Chamomile Tea',
    color: '#9575CD',
    benefits: [
      'Calming blend for relaxation and sleep',
      'Supports healthy nervous system function',
      'Gentle enough for daily consumption',
      'Traditionally used for stress relief'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1 teaspoon dried chamomile and 1/2 teaspoon lavender\n2. Pour boiling water over herbs\n3. Steep covered for 5-10 minutes\n4. Strain and enjoy before bedtime",
    effects: ['Relaxing', 'Calming', 'Sleep-supporting'],
    bestTimeToConsume: "Evening, 30-60 minutes before bedtime"
  },
  {
    id: 'cinnamon-apple-tea',
    name: 'Cinnamon Apple Tea',
    color: '#FF9800',
    benefits: [
      'Warming blend for digestive comfort',
      'Contains antioxidants that support wellness',
      'Naturally sweet without added sweeteners',
      'Traditional winter wellness tea'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use 1 cinnamon stick and 1 tablespoon dried apple pieces\n2. Simmer in water for 10 minutes\n3. Strain and add honey if desired\n4. Enjoy hot after meals",
    effects: ['Warming', 'Digestive aid', 'Comforting'],
    bestTimeToConsume: "After meals or on cold days"
  },
  {
    id: 'immune-support-tea',
    name: 'Immune Support Tea',
    color: '#FFCA28',
    benefits: [
      'Blend of herbs that support immune function',
      'Contains vitamin C-rich herbs',
      'Traditional formula for seasonal wellness',
      'Supports overall health and vitality'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use equal parts elderberry, rose hips, and echinacea\n2. Add a slice of fresh ginger\n3. Simmer for 15 minutes, then steep covered\n4. Drink daily during cold seasons",
    effects: ['Immune supporting', 'Warming', 'Nutritive'],
    bestTimeToConsume: "Morning or at first sign of feeling under the weather"
  },
  {
    id: 'digestive-harmony-tea',
    name: 'Digestive Harmony Tea',
    color: '#66BB6A',
    benefits: [
      'Balanced blend for comprehensive digestive support',
      'Contains carminative herbs for gas and bloating',
      'Includes bitter herbs for digestive stimulation',
      'Supports healthy digestion after meals'
    ],
    oilPreparation: "Not applicable for herbal teas",
    tincturePreparation: "1. Use equal parts fennel, peppermint, and chamomile\n2. Add a pinch of ginger and gentian root\n3. Pour boiling water over herbs\n4. Steep covered for 10 minutes and enjoy after meals",
    effects: ['Digestive aid', 'Carminative', 'Soothing'],
    bestTimeToConsume: "15-30 minutes after meals"
  }
];
