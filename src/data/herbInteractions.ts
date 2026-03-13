
// Herb interaction cautions — warns users when combining herbs that may interact
// Each entry has two herb IDs, a severity level, and a description

export interface HerbInteraction {
  herb1: string;
  herb2: string;
  severity: 'caution' | 'warning';
  description: string;
}

export const herbInteractions: HerbInteraction[] = [
  // Sedative combinations — excessive drowsiness
  { herb1: 'valerian', herb2: 'kava', severity: 'caution', description: 'Both are strong sedatives — combining may cause excessive drowsiness. Use lower doses if taking together.' },
  { herb1: 'valerian', herb2: 'passionflower', severity: 'caution', description: 'Both promote sleep — may intensify sedative effects. Start with reduced amounts.' },
  { herb1: 'valerian', herb2: 'chamomile', severity: 'caution', description: 'Both have calming effects — mild interaction but may increase drowsiness.' },
  { herb1: 'kava', herb2: 'passionflower', severity: 'caution', description: 'Both are sedating — combined use may cause excessive sleepiness.' },
  { herb1: 'kava', herb2: 'chamomile', severity: 'caution', description: 'Both promote relaxation — may amplify sedative effects.' },
  { herb1: 'ashwagandha', herb2: 'valerian', severity: 'caution', description: 'Both can be sedating — monitor for excessive drowsiness when combined.' },

  // Blood-thinning combinations
  { herb1: 'ginkgo', herb2: 'turmeric', severity: 'warning', description: 'Both have blood-thinning properties — combined use may increase bleeding risk. Consult a healthcare provider.' },
  { herb1: 'ginkgo', herb2: 'garlic', severity: 'warning', description: 'Both thin the blood — combining may increase risk of bleeding. Exercise caution.' },
  { herb1: 'turmeric', herb2: 'garlic', severity: 'caution', description: 'Both have mild blood-thinning effects — use caution if taking blood-thinning medications.' },
  { herb1: 'ginger', herb2: 'ginkgo', severity: 'caution', description: 'Both may thin blood — monitor for increased bleeding tendency when combined.' },
  { herb1: 'ginger', herb2: 'turmeric', severity: 'caution', description: 'Both have anti-inflammatory and mild blood-thinning effects — generally safe but monitor at high doses.' },

  // Blood pressure interactions
  { herb1: 'hawthorn', herb2: 'garlic', severity: 'caution', description: 'Both can lower blood pressure — combined use may cause excessive blood pressure reduction.' },
  { herb1: 'hawthorn', herb2: 'hibiscus', severity: 'caution', description: 'Both lower blood pressure — monitor for dizziness or lightheadedness when combined.' },

  // Stimulant combinations
  { herb1: 'ginseng', herb2: 'green-tea', severity: 'caution', description: 'Both are stimulating — combining may cause jitteriness, insomnia, or increased heart rate.' },
  { herb1: 'ginseng', herb2: 'yerba-mate', severity: 'caution', description: 'Both are energizing — may overstimulate when combined. Reduce doses.' },
  { herb1: 'guarana', herb2: 'green-tea', severity: 'caution', description: 'Both contain caffeine — combining may cause caffeine overload.' },
  { herb1: 'maca', herb2: 'ginseng', severity: 'caution', description: 'Both boost energy and hormones — start with low doses when combining.' },

  // Liver considerations
  { herb1: 'kava', herb2: 'black-cohosh', severity: 'warning', description: 'Both may affect liver function — avoid combining without medical supervision.' },
  { herb1: 'kava', herb2: 'comfrey', severity: 'warning', description: 'Both have potential liver effects — combining is not recommended.' },

  // Hormonal interactions
  { herb1: 'black-cohosh', herb2: 'dong-quai', severity: 'caution', description: 'Both influence estrogen activity — combining may amplify hormonal effects.' },
  { herb1: 'vitex', herb2: 'black-cohosh', severity: 'caution', description: 'Both affect hormonal balance — use under guidance when combining.' },
  { herb1: 'red-clover', herb2: 'dong-quai', severity: 'caution', description: 'Both have phytoestrogenic properties — combined use may intensify estrogenic effects.' },
  { herb1: 'soy', herb2: 'red-clover', severity: 'caution', description: 'Both contain phytoestrogens — monitor hormonal effects when combining.' },

  // Digestive interactions
  { herb1: 'licorice', herb2: 'senna', severity: 'caution', description: 'Licorice may worsen potassium loss from senna — avoid prolonged combined use.' },
  { herb1: 'cascara', herb2: 'senna', severity: 'warning', description: 'Both are strong laxatives — combining may cause severe electrolyte imbalance.' },

  // Immune system
  { herb1: 'echinacea', herb2: 'astragalus', severity: 'caution', description: 'Both strongly stimulate the immune system — may be counterproductive for autoimmune conditions.' },

  // Blood sugar
  { herb1: 'fenugreek', herb2: 'bitter-melon', severity: 'caution', description: 'Both lower blood sugar — combining may cause hypoglycemia. Monitor blood sugar closely.' },
  { herb1: 'cinnamon', herb2: 'fenugreek', severity: 'caution', description: 'Both can reduce blood sugar levels — monitor closely when using together.' },

  // Thyroid
  { herb1: 'ashwagandha', herb2: 'bugleweed', severity: 'warning', description: 'Ashwagandha may increase thyroid activity while bugleweed decreases it — conflicting effects.' },
];

// Helper to check if two herbs have a known interaction
export function getInteraction(herb1Id: string, herb2Id: string): HerbInteraction | undefined {
  return herbInteractions.find(
    i => (i.herb1 === herb1Id && i.herb2 === herb2Id) ||
         (i.herb1 === herb2Id && i.herb2 === herb1Id)
  );
}
