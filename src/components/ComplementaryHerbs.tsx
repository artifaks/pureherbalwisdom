
import React from 'react';
import { Herb } from '@/data/types';
import HerbCard from './HerbCard';
import { Sparkles } from 'lucide-react';

// Define pairings data for herbs
interface HerbPairing {
  herbId: string;
  reason: string;
}

interface HerbPairingsMap {
  [herbId: string]: HerbPairing[];
}

// Sample pairings data - in a real app, this would be more comprehensive
const herbPairings: HerbPairingsMap = {
  // Heart herbs
  'hawthorn': [
    { herbId: 'motherwort', reason: 'Motherwort complements Hawthorn by adding calming properties to heart support' },
    { herbId: 'linden', reason: 'Linden pairs with Hawthorn for comprehensive heart and circulatory health' },
    { herbId: 'garlic', reason: 'Garlic adds cholesterol-lowering benefits to Hawthorn\'s heart-protective effects' }
  ],
  'motherwort': [
    { herbId: 'hawthorn', reason: 'Hawthorn enhances Motherwort\'s cardiotonic properties' },
    { herbId: 'lemon-balm', reason: 'Lemon Balm adds nervous system support to Motherwort\'s heart benefits' },
    { herbId: 'skullcap', reason: 'Skullcap complements Motherwort\'s calming properties for stress-related heart issues' }
  ],
  'astragalus': [
    { herbId: 'hawthorn', reason: 'Hawthorn enhances Astragalus\'s cardiovascular strengthening effects' },
    { herbId: 'ginger', reason: 'Ginger improves circulation alongside Astragalus\'s supportive properties' },
    { herbId: 'garlic', reason: 'Garlic complements Astragalus with additional immune support for heart health' }
  ],
  // New heart herb pairings
  'hibiscus': [
    { herbId: 'hawthorn', reason: 'Hawthorn enhances Hibiscus\'s blood pressure-lowering effects' },
    { herbId: 'rose', reason: 'Rose adds emotional heart support to Hibiscus\'s physical benefits' },
    { herbId: 'linden', reason: 'Linden complements Hibiscus for comprehensive cardiovascular support' }
  ],
  'linden': [
    { herbId: 'hawthorn', reason: 'Hawthorn adds strength to Linden\'s gentle heart-supporting properties' },
    { herbId: 'motherwort', reason: 'Motherwort complements Linden\'s calming effects with additional heart support' },
    { herbId: 'rose', reason: 'Rose enhances Linden\'s emotional heart support properties' }
  ],
  'rose': [
    { herbId: 'hawthorn', reason: 'Hawthorn adds physical heart support to Rose\'s emotional benefits' },
    { herbId: 'motherwort', reason: 'Motherwort enhances Rose\'s calming properties for heart health' },
    { herbId: 'linden', reason: 'Linden complements Rose for gentle, comprehensive heart support' }
  ],
  'olive-leaf': [
    { herbId: 'hawthorn', reason: 'Hawthorn enhances Olive Leaf\'s cardiovascular benefits' },
    { herbId: 'garlic', reason: 'Garlic complements Olive Leaf for blood pressure and cholesterol support' },
    { herbId: 'hibiscus', reason: 'Hibiscus adds antioxidant support to Olive Leaf\'s cardiovascular benefits' }
  ],
  'bilberry': [
    { herbId: 'hawthorn', reason: 'Hawthorn complements Bilberry\'s vascular strengthening properties' },
    { herbId: 'olive-leaf', reason: 'Olive Leaf enhances Bilberry\'s circulatory benefits' },
    { herbId: 'garlic', reason: 'Garlic adds blood-thinning properties to Bilberry\'s vascular support' }
  ],
  
  // Stomach herbs
  'ginger': [
    { herbId: 'peppermint', reason: 'Peppermint enhances Ginger\'s digestive properties while adding cooling effects' },
    { herbId: 'fennel', reason: 'Fennel complements Ginger for comprehensive digestive support' },
    { herbId: 'licorice', reason: 'Licorice adds soothing properties to Ginger\'s warming digestive action' }
  ],
  'peppermint': [
    { herbId: 'chamomile', reason: 'Chamomile adds calming properties to Peppermint\'s digestive benefits' },
    { herbId: 'ginger', reason: 'Ginger adds warming properties to balance Peppermint\'s cooling effects' },
    { herbId: 'fennel', reason: 'Fennel works with Peppermint to reduce bloating and digestive discomfort' }
  ],
  'gentian': [
    { herbId: 'artichoke-leaf', reason: 'Artichoke Leaf enhances Gentian\'s digestive bitter effects for optimal digestion' },
    { herbId: 'dandelion', reason: 'Dandelion adds liver support to Gentian\'s digestive stimulation' },
    { herbId: 'ginger', reason: 'Ginger adds warming properties to balance Gentian\'s bitter, cooling nature' }
  ],
  
  // Men's herbs
  'saw-palmetto': [
    { herbId: 'nettle-root', reason: 'Nettle Root enhances Saw Palmetto\'s prostate supportive properties' },
    { herbId: 'pygeum', reason: 'Pygeum complements Saw Palmetto for comprehensive prostate health' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha adds adaptogenic support to Saw Palmetto\'s hormonal benefits' }
  ],
  'pygeum': [
    { herbId: 'saw-palmetto', reason: 'Saw Palmetto works synergistically with Pygeum for prostate support' },
    { herbId: 'nettle-root', reason: 'Nettle Root enhances Pygeum\'s anti-inflammatory effects' },
    { herbId: 'cordyceps', reason: 'Cordyceps adds energy and vitality to Pygeum\'s structural support' }
  ],
  
  // Women's herbs
  'red-raspberry': [
    { herbId: 'nettle', reason: 'Nettle adds mineral support to Raspberry Leaf\'s female tonic properties' },
    { herbId: 'red-clover', reason: 'Red Clover complements Raspberry Leaf for hormonal balance' },
    { herbId: 'vitex', reason: 'Vitex enhances Raspberry Leaf\'s reproductive system support' }
  ],
  'nettle': [
    { herbId: 'red-raspberry', reason: 'Red Raspberry adds reproductive tone to Nettle\'s mineral support' },
    { herbId: 'red-clover', reason: 'Red Clover complements Nettle for female hormonal balance' },
    { herbId: 'schisandra', reason: 'Schisandra adds adaptogenic support to Nettle\'s nourishing properties' }
  ],
  
  // Brain herbs
  'ginkgo': [
    { herbId: 'bacopa', reason: 'Bacopa complements Ginkgo\'s blood flow benefits with memory enhancement properties' },
    { herbId: 'lions-mane', reason: 'Lion\'s Mane adds nerve-regenerating properties to Ginkgo\'s circulation benefits' },
    { herbId: 'rosemary', reason: 'Rosemary enhances Ginkgo\'s cognitive benefits with additional neuroprotection' }
  ],
  'bacopa': [
    { herbId: 'ginkgo', reason: 'Ginkgo adds circulatory support to Bacopa\'s cognitive enhancement effects' },
    { herbId: 'brahmi', reason: 'Brahmi (Centella) complements Bacopa\'s cognitive effects for enhanced learning' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha adds stress reduction to Bacopa\'s memory benefits' }
  ],
  'lions-mane': [
    { herbId: 'rosemary', reason: 'Rosemary adds antioxidant protection to Lion\'s Mane\'s neurogenesis effects' },
    { herbId: 'ginkgo', reason: 'Ginkgo improves delivery of Lion\'s Mane\'s beneficial compounds to the brain' },
    { herbId: 'rhodiola', reason: 'Rhodiola adds adaptogenic energy to support Lion\'s Mane\'s regenerative effects' }
  ],
  'rosemary': [
    { herbId: 'sage', reason: 'Sage enhances Rosemary\'s memory benefits with additional cognitive support' },
    { herbId: 'ginkgo', reason: 'Ginkgo adds blood flow support to Rosemary\'s neuroprotective properties' },
    { herbId: 'bacopa', reason: 'Bacopa complements Rosemary\'s antioxidant benefits with memory enhancement' }
  ],
  'sage': [
    { herbId: 'rosemary', reason: 'Rosemary complements Sage\'s cognitive benefits for enhanced memory function' },
    { herbId: 'ginkgo', reason: 'Ginkgo adds circulation support to Sage\'s cholinergic enhancement properties' },
    { herbId: 'lions-mane', reason: 'Lion\'s Mane adds neurogenesis support to Sage\'s cognitive effects' }
  ],
  'brahmi': [
    { herbId: 'bacopa', reason: 'Bacopa and Brahmi work synergistically for comprehensive cognitive enhancement' },
    { herbId: 'gotu-kola', reason: 'Gotu Kola complements Brahmi for improved learning and mental clarity' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha adds stress management to Brahmi\'s cognitive benefits' }
  ],
  'gotu-kola': [
    { herbId: 'brahmi', reason: 'Brahmi enhances Gotu Kola\'s effects on mental clarity and focus' },
    { herbId: 'bacopa', reason: 'Bacopa adds memory enhancement to Gotu Kola\'s cognitive support' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha complements Gotu Kola with stress reduction properties' }
  ],
  'ashwagandha-brain': [
    { herbId: 'bacopa', reason: 'Bacopa adds memory support to Ashwagandha\'s stress-reducing properties' },
    { herbId: 'rhodiola', reason: 'Rhodiola enhances Ashwagandha\'s adaptogenic effects for mental performance' },
    { herbId: 'gotu-kola', reason: 'Gotu Kola complements Ashwagandha\'s calming benefits with mental clarity' }
  ],
  // New herb pairings
  'turmeric-brain': [
    { herbId: 'ginger-brain', reason: 'Ginger enhances Turmeric\'s bioavailability and adds warming circulation support' },
    { herbId: 'bacopa', reason: 'Bacopa adds memory enhancement to Turmeric\'s anti-inflammatory brain support' },
    { herbId: 'holy-basil', reason: 'Holy Basil complements Turmeric\'s neuroprotective properties with adaptogenic benefits' }
  ],
  'ginger-brain': [
    { herbId: 'turmeric-brain', reason: 'Turmeric adds potent anti-inflammatory support to Ginger\'s circulatory benefits' },
    { herbId: 'rosemary', reason: 'Rosemary enhances Ginger\'s cognitive effects with memory-boosting compounds' },
    { herbId: 'peppermint', reason: 'Peppermint adds cooling alertness to balance Ginger\'s warming properties' }
  ],
  'lemon-balm': [
    { herbId: 'skullcap', reason: 'Skullcap enhances Lemon Balm\'s calming effects while maintaining mental clarity' },
    { herbId: 'holy-basil', reason: 'Holy Basil adds adaptogenic support to Lemon Balm\'s relaxing properties' },
    { herbId: 'motherwort', reason: 'Motherwort complements Lemon Balm\'s nervous system support with heart benefits' }
  ],
  'skullcap': [
    { herbId: 'lemon-balm', reason: 'Lemon Balm enhances Skullcap\'s calming effects with additional cognitive support' },
    { herbId: 'ashwagandha-brain', reason: 'Ashwagandha adds adaptogenic strength to Skullcap\'s nervous system support' },
    { herbId: 'gotu-kola', reason: 'Gotu Kola complements Skullcap\'s calming effects with mental clarity' }
  ],
  'holy-basil': [
    { herbId: 'ashwagandha-brain', reason: 'Ashwagandha deepens Holy Basil\'s adaptogenic properties for stress resilience' },
    { herbId: 'turmeric-brain', reason: 'Turmeric adds anti-inflammatory support to Holy Basil\'s neuroprotective effects' },
    { herbId: 'bacopa', reason: 'Bacopa enhances Holy Basil\'s cognitive benefits with memory support' }
  ],
  
  // Default pairings for herbs without specific matches
  'default': [
    { herbId: 'hawthorn', reason: 'Hawthorn provides heart support alongside this herb\'s benefits' },
    { herbId: 'ginger', reason: 'Ginger adds digestive support and improves absorption' },
    { herbId: 'nettle', reason: 'Nettle contributes mineral support and gentle detoxification' }
  ]
};

interface ComplementaryHerbsProps {
  activeHerb: Herb;
  allHerbs: Herb[];
  onHerbSelect: (herb: Herb) => void;
  savedHerbs: Herb[];
  onToggleSave: (herb: Herb) => void;
}

const ComplementaryHerbs: React.FC<ComplementaryHerbsProps> = ({
  activeHerb,
  allHerbs,
  onHerbSelect,
  savedHerbs,
  onToggleSave
}) => {
  // Get pairings for the active herb or use default if none specified
  const getPairings = () => {
    // For brain category ashwagandha, use the brain-specific key
    const herbId = activeHerb.id === 'ashwagandha' && activeHerb.category === 'brain' 
      ? 'ashwagandha-brain' 
      : activeHerb.id === 'turmeric' && activeHerb.category === 'brain'
      ? 'turmeric-brain'
      : activeHerb.id === 'ginger' && activeHerb.category === 'brain'
      ? 'ginger-brain'
      : activeHerb.id;
      
    const pairings = herbPairings[herbId] || herbPairings['default'];
    return pairings.map(pairing => {
      const herb = allHerbs.find(h => h.id === pairing.herbId);
      return herb ? { ...pairing, herb } : null;
    }).filter(Boolean);
  };

  const complementaryHerbs = getPairings();

  // Skip rendering if no pairings found
  if (complementaryHerbs.length === 0) return null;

  // Check if herb is saved
  const isHerbSaved = (herbId: string): boolean => {
    return savedHerbs.some(herb => herb.id === herbId);
  };

  return (
    <div className="mt-12 glass p-6 rounded-xl animate-fade-in">
      <div className="flex items-center mb-6">
        <Sparkles className="mr-3 text-amber-500" size={20} />
        <h3 className="text-xl font-semibold text-gray-800">Complementary Herbs</h3>
      </div>
      
      <div className="space-y-6">
        {complementaryHerbs.map((pairing: any) => (
          <div key={pairing.herb.id} className="flex flex-col sm:flex-row gap-4 bg-white/70 p-4 rounded-lg hover:bg-white/90 transition-colors">
            <div className="sm:w-1/6 flex justify-center">
              <HerbCard
                id={pairing.herb.id}
                name={pairing.herb.name}
                color={pairing.herb.color}
                isActive={false}
                onClick={() => onHerbSelect(pairing.herb)}
                category={pairing.herb.category}
                benefits={pairing.herb.benefits}
                isSaved={isHerbSaved(pairing.herb.id)}
                onToggleSave={() => onToggleSave(pairing.herb)}
                size="small"
              />
            </div>
            <div className="sm:w-5/6">
              <h4 className="font-medium text-gray-800 mb-1">{pairing.herb.name} + {activeHerb.name}</h4>
              <p className="text-gray-600">{pairing.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplementaryHerbs;
