
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
    const pairings = herbPairings[activeHerb.id] || herbPairings['default'];
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
