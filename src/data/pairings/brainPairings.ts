
import { HerbPairing } from '@/data/types';

// Brain herb pairings
export const brainHerbPairings: Record<string, HerbPairing[]> = {
  'ashwagandha-brain': [
    { herbId: 'bacopa', reason: 'Bacopa enhances Ashwagandha\'s cognitive benefits' },
    { herbId: 'gotu-kola', reason: 'Gotu Kola complements Ashwagandha\'s stress-reducing effects on the brain' },
    { herbId: 'lions-mane', reason: 'Lion\'s Mane adds neuroprotective properties to Ashwagandha' }
  ],
  'turmeric-brain': [
    { herbId: 'black-pepper', reason: 'Black Pepper enhances Turmeric\'s absorption for brain benefits' },
    { herbId: 'ginger', reason: 'Ginger complements Turmeric\'s anti-inflammatory effects' },
    { herbId: 'ginkgo', reason: 'Ginkgo adds circulation support to Turmeric\'s brain-boosting properties' }
  ],
  'ginger-brain': [
    { herbId: 'turmeric', reason: 'Turmeric enhances Ginger\'s anti-inflammatory properties' },
    { herbId: 'ginkgo', reason: 'Ginkgo improves circulation for Ginger\'s brain benefits' },
    { herbId: 'rosemary', reason: 'Rosemary complements Ginger\'s cognitive-enhancing effects' }
  ],
  'sage-brain': [
    { herbId: 'rosemary-brain', reason: 'Rosemary enhances Sage\'s cognitive benefits' },
    { herbId: 'ginkgo', reason: 'Ginkgo adds circulation support to Sage\'s brain-supporting compounds' },
    { herbId: 'bacopa', reason: 'Bacopa complements Sage\'s acetylcholine support with memory enhancement' }
  ],
  'rosemary-memory': [
    { herbId: 'sage-brain', reason: 'Sage enhances Rosemary\'s memory benefits' },
    { herbId: 'ginkgo', reason: 'Ginkgo improves delivery of Rosemary\'s beneficial compounds to the brain' },
    { herbId: 'lions-mane', reason: 'Lion\'s Mane adds neurogenesis support to Rosemary\'s protective effects' }
  ],
  'goji-berry': [
    { herbId: 'blueberry', reason: 'Blueberry complements Goji\'s antioxidant protection for the brain' },
    { herbId: 'gotu-kola', reason: 'Gotu Kola adds cognitive support to Goji\'s neuroprotective properties' },
    { herbId: 'reishi', reason: 'Reishi enhances Goji\'s adaptogenic benefits for brain health' }
  ],
  'brahmi-enhanced': [
    {
      herbId: 'ginkgo',
      reason: 'Brahmi\'s cognitive support combined with ginkgo\'s circulation enhancement creates optimal brain function support.'
    },
    {
      herbId: 'lions-mane',
      reason: 'Brahmi\'s memory enhancement complements lion\'s mane\'s nerve-protective properties for comprehensive brain health.'
    },
    {
      herbId: 'mucuna-brain',
      reason: 'Brahmi\'s cognitive support works synergistically with mucuna\'s neurotransmitter precursors for brain health.'
    }
  ],
  'mucuna-brain': [
    {
      herbId: 'brahmi-enhanced',
      reason: 'Mucuna\'s L-DOPA precursors complement brahmi\'s cognitive support for enhanced mental function.'
    },
    {
      herbId: 'ashwagandha-brain',
      reason: 'Mucuna\'s neurotransmitter support pairs well with ashwagandha\'s stress-reducing properties for brain health.'
    },
    {
      herbId: 'gotu-kola',
      reason: 'Mucuna\'s dopamine precursors complement gotu kola\'s circulation-enhancing properties for optimal brain function.'
    }
  ],
  'celastrus-brain': [
    {
      herbId: 'bacopa',
      reason: 'Celastrus\'s cognitive-enhancing oil complements bacopa\'s memory support for comprehensive mental function.'
    },
    {
      herbId: 'brahmi-enhanced',
      reason: 'These traditional Ayurvedic herbs work synergistically to support memory, learning, and cognitive function.'
    },
    {
      herbId: 'ginkgo',
      reason: 'Celastrus\'s mental stimulation pairs well with ginkgo\'s circulation enhancement for optimal brain support.'
    }
  ]
};
