import { HerbPairing } from '@/data/types';

// Brain herb pairings
export const brainHerbPairings: Record<string, HerbPairing[]> = {
  'ginkgo': [
    { herbId: 'bacopa', reason: 'Ginkgo and Bacopa work synergistically to enhance memory and cognitive function' },
    { herbId: 'lions-mane', reason: 'Combining Ginkgo with Lion\'s Mane supports both circulation and nerve growth in the brain' },
    { herbId: 'rhodiola', reason: 'Rhodiola helps combat mental fatigue, complementing Ginkgo\'s cognitive benefits' }
  ],
  'bacopa': [
    { herbId: 'ginkgo', reason: 'Bacopa and Ginkgo enhance memory and cognitive function through different mechanisms' },
    { herbId: 'lions-mane', reason: 'Bacopa supports neuron health, while Lion\'s Mane promotes nerve growth for comprehensive brain support' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha reduces stress, enhancing Bacopa\'s cognitive benefits' }
  ],
  'lions-mane': [
    { herbId: 'ginkgo', reason: 'Lion\'s Mane supports nerve growth, complementing Ginkgo\'s circulation-boosting effects' },
    { herbId: 'bacopa', reason: 'Lion\'s Mane and Bacopa together provide comprehensive support for brain health and cognitive function' },
    { herbId: 'reishi', reason: 'Reishi calms the mind, enhancing Lion\'s Mane\'s neurotrophic benefits' }
  ],
  'rhodiola': [
    { herbId: 'ginkgo', reason: 'Rhodiola combats mental fatigue, enhancing Ginkgo\'s cognitive benefits' },
    { herbId: 'cordyceps', reason: 'Rhodiola and Cordyceps together boost energy and mental performance' },
    { herbId: 'ginseng-brain', reason: 'Ginseng and Rhodiola are both adaptogens that support mental clarity and focus' }
  ],
  'cordyceps': [
    { herbId: 'rhodiola', reason: 'Cordyceps and Rhodiola enhance energy and mental performance, especially during stress' },
    { herbId: 'reishi', reason: 'Cordyceps provides energy, while Reishi calms the mind for balanced brain support' },
    { herbId: 'ginseng-brain', reason: 'Ginseng and Cordyceps together boost energy and cognitive function' }
  ],
  'reishi': [
    { herbId: 'lions-mane', reason: 'Reishi calms the mind, enhancing Lion\'s Mane\'s neurotrophic benefits' },
    { herbId: 'cordyceps', reason: 'Reishi calms the mind, balancing Cordyceps\' energizing effects' },
    { herbId: 'gotu-kola', reason: 'Gotu Kola supports mental clarity, complementing Reishi\'s calming properties' }
  ],
  'ginseng-brain': [
    { herbId: 'rhodiola', reason: 'Ginseng and Rhodiola are adaptogens that support mental clarity and focus' },
    { herbId: 'cordyceps', reason: 'Ginseng and Cordyceps together boost energy and cognitive function' },
    { herbId: 'gotu-kola', reason: 'Gotu Kola enhances Ginseng\'s cognitive benefits by supporting circulation and nerve function' }
  ],
  'mugwort-brain': [
    { herbId: 'lemon-balm', reason: 'Mugwort and Lemon Balm promote relaxation and vivid dreams' },
    { herbId: 'chamomile', reason: 'Chamomile enhances Mugwort\'s calming effects for sleep and dream recall' },
    { herbId: 'valerian-root', reason: 'Combines Mugwort\'s dream-enhancing properties with Valerian\'s sleep-promoting effects' }
  ],
  'periwinkle': [
    { herbId: 'ginkgo', reason: 'Periwinkle and Ginkgo both support brain blood flow and cognitive function' },
    { herbId: 'rosemary-brain', reason: 'Rosemary enhances Periwinkle\'s circulation-boosting effects for memory support' },
    { herbId: 'gotu-kola', reason: 'Gotu Kola complements Periwinkle\'s cognitive benefits by supporting nerve function' }
  ],
  'blueberry': [
    { herbId: 'ginkgo', reason: 'Blueberry\'s antioxidants complement Ginkgo\'s circulation-boosting effects for brain health' },
    { herbId: 'green-tea', reason: 'Both herbs are rich in antioxidants that protect the brain from oxidative stress' },
    { herbId: 'turmeric', reason: 'Turmeric\'s anti-inflammatory properties enhance Blueberry\'s antioxidant benefits for brain health' }
  ],
  'green-tea': [
    { herbId: 'blueberry', reason: 'Green Tea and Blueberry are rich in antioxidants that protect the brain' },
    { herbId: 'rosemary-brain', reason: 'Rosemary enhances Green Tea\'s focus-supporting effects for mental clarity' },
    { herbId: 'lemon-balm', reason: 'Lemon Balm complements Green Tea\'s calming and focus-enhancing properties' }
  ],
  'rosemary-brain': [
    { herbId: 'periwinkle', reason: 'Rosemary enhances Periwinkle\'s circulation-boosting effects for memory support' },
    { herbId: 'green-tea', reason: 'Rosemary enhances Green Tea\'s focus-supporting effects for mental clarity' },
    { herbId: 'sage-brain', reason: 'Both herbs support memory and cognitive function through different mechanisms' }
  ],
  'gotu-kola': [
    { herbId: 'bacopa', reason: 'Gotu Kola and Bacopa work synergistically to enhance memory and cognitive function' },
    { herbId: 'reishi', reason: 'Gotu Kola supports mental clarity, complementing Reishi\'s calming properties' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha reduces stress, enhancing Gotu Kola\'s cognitive benefits' }
  ],
  'brahmi': [
    { herbId: 'ginkgo', reason: 'Brahmi and Ginkgo enhance memory and cognitive function through different mechanisms' },
    { herbId: 'lions-mane', reason: 'Brahmi supports neuron health, while Lion\'s Mane promotes nerve growth for comprehensive brain support' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha reduces stress, enhancing Brahmi\'s cognitive benefits' }
  ],
  'phosphatidylserine': [
    { herbId: 'ginkgo', reason: 'Phosphatidylserine and Ginkgo support brain cell membrane health and circulation' },
    { herbId: 'omega-3', reason: 'Omega-3 fatty acids enhance Phosphatidylserine\'s benefits for brain cell structure and function' },
    { herbId: 'choline', reason: 'Choline supports neurotransmitter production, complementing Phosphatidylserine\'s cell membrane support' }
  ],
  'gotu-kola-enhanced': [
    { herbId: 'bacopa', reason: 'Enhanced Gotu Kola and Bacopa provide comprehensive support for brain health and cognitive function' },
    { herbId: 'lions-mane', reason: 'Lion\'s Mane enhances the neurotrophic benefits of Gotu Kola for nerve growth and repair' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha reduces stress, enhancing the cognitive benefits of Gotu Kola' }
  ],
  'sage-brain': [
    { herbId: 'rosemary-brain', reason: 'Sage and Rosemary both support memory and cognitive function through different mechanisms' },
    { herbId: 'ginkgo', reason: 'Ginkgo enhances Sage\'s circulation-boosting effects for memory support' },
    { herbId: 'lemon-balm', reason: 'Lemon Balm complements Sage\'s calming and focus-enhancing properties' }
  ],
  'rosemary-memory': [
    { herbId: 'sage-brain', reason: 'Rosemary and Sage both support memory and cognitive function through different mechanisms' },
    { herbId: 'ginkgo', reason: 'Ginkgo enhances Rosemary\'s circulation-boosting effects for memory support' },
    { herbId: 'bacopa', reason: 'Bacopa complements Rosemary\'s cognitive benefits by supporting neuron health' }
  ],
  'goji-berry': [
    { herbId: 'green-tea', reason: 'Goji Berry and Green Tea are rich in antioxidants that protect the brain from oxidative stress' },
    { herbId: 'turmeric', reason: 'Turmeric\'s anti-inflammatory properties enhance Goji Berry\'s antioxidant benefits for brain health' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha reduces stress, enhancing Goji Berry\'s cognitive benefits' }
  ],
  'brahmi-enhanced': [
    { herbId: 'ginkgo', reason: 'Enhanced Brahmi and Ginkgo enhance memory and cognitive function through different mechanisms' },
    { herbId: 'lions-mane', reason: 'Lion\'s Mane enhances the neurotrophic benefits of Brahmi for nerve growth and repair' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha reduces stress, enhancing the cognitive benefits of Brahmi' }
  ],
  'mucuna-brain': [
    { herbId: 'green-tea', reason: 'Mucuna Pruriens and Green Tea support neurotransmitter production and antioxidant protection' },
    { herbId: 'rhodiola', reason: 'Rhodiola helps balance Mucuna\'s stimulating effects with adaptogenic support' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha reduces stress, enhancing Mucuna\'s cognitive benefits' }
  ],
  'celastrus-brain': [
    { herbId: 'ginkgo', reason: 'Celastrus and Ginkgo support brain blood flow and cognitive function' },
    { herbId: 'bacopa', reason: 'Bacopa enhances Celastrus\' cognitive benefits by supporting neuron health' },
    { herbId: 'gotu-kola', reason: 'Gotu Kola complements Celastrus\' cognitive benefits by supporting nerve function' }
  ],
  'ashwagandha-brain': [
    { herbId: 'rhodiola', reason: 'Ashwagandha\'s calming effects complement Rhodiola\'s energizing properties for balanced brain support' },
    { herbId: 'gotu-kola', reason: 'These two adaptogens work synergistically to support mental clarity and stress management' },
    { herbId: 'bacopa', reason: 'Combines the memory-enhancing properties of Bacopa with the stress-reducing benefits of Ashwagandha' }
  ],
  'peppermint-brain': [
    { herbId: 'rosemary-brain', reason: 'Peppermint\'s invigorating properties enhance Rosemary\'s circulation-boosting effects for mental clarity' },
    { herbId: 'ginkgo', reason: 'Peppermint\'s cooling properties balance with Ginkgo\'s circulation support for comprehensive brain health' },
    { herbId: 'green-tea', reason: 'Both herbs contain compounds that support mental alertness and focus' }
  ],
  'lemon-balm-brain': [
    { herbId: 'bacopa', reason: 'Lemon Balm\'s calming properties complement Bacopa\'s memory-enhancing effects' },
    { herbId: 'gotu-kola', reason: 'Both herbs support a calm, focused mind and healthy neural function' },
    { herbId: 'reishi', reason: 'Combines Lemon Balm\'s nervine properties with Reishi\'s adaptogenic support for stress management' }
  ]
};
