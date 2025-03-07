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
  // ... keep existing code (heart herb pairings)
  
  // New heart herb pairings
  'motherwort-heart': [
    { herbId: 'hawthorn', reason: 'Hawthorn enhances Motherwort\'s cardiotonic properties' },
    { herbId: 'linden', reason: 'Linden complements Motherwort\'s calming nervous system support' },
    { herbId: 'rose', reason: 'Rose adds emotional heart support to Motherwort\'s physical benefits' }
  ],
  'yarrow': [
    { herbId: 'hawthorn', reason: 'Hawthorn adds targeted heart support to Yarrow\'s circulatory benefits' },
    { herbId: 'cayenne', reason: 'Cayenne enhances Yarrow\'s circulation-supporting properties' },
    { herbId: 'ginger-heart', reason: 'Ginger adds warming circulation to Yarrow\'s vascular benefits' }
  ],
  'dan-shen': [
    { herbId: 'hawthorn', reason: 'Hawthorn complements Dan Shen\'s cardiotonic properties' },
    { herbId: 'reishi-heart', reason: 'Reishi adds adaptogenic support to Dan Shen\'s heart benefits' },
    { herbId: 'astragalus', reason: 'Astragalus enhances Dan Shen\'s blood-moving properties' }
  ],
  
  // New stomach herb pairings
  'aloe-vera': [
    { herbId: 'marshmallow', reason: 'Marshmallow enhances Aloe\'s soothing properties for the digestive tract' },
    { herbId: 'slippery-elm', reason: 'Slippery Elm complements Aloe\'s mucilaginous healing effect' },
    { herbId: 'calendula', reason: 'Calendula adds healing properties to Aloe\'s soothing effects' }
  ],
  'calendula': [
    { herbId: 'chamomile', reason: 'Chamomile complements Calendula\'s anti-inflammatory properties' },
    { herbId: 'marshmallow', reason: 'Marshmallow adds soothing mucilage to Calendula\'s healing effects' },
    { herbId: 'licorice', reason: 'Licorice enhances Calendula\'s healing properties for digestive tissues' }
  ],
  'catnip': [
    { herbId: 'chamomile', reason: 'Chamomile enhances Catnip\'s calming effects on the digestive system' },
    { herbId: 'fennel', reason: 'Fennel complements Catnip\'s anti-spasmodic properties' },
    { herbId: 'lemon-balm', reason: 'Lemon Balm adds nervous system support to Catnip\'s digestive benefits' }
  ],
  
  // New men's herb pairings
  'shilajit': [
    { herbId: 'ashwagandha', reason: 'Ashwagandha enhances Shilajit\'s adaptogenic properties for male vitality' },
    { herbId: 'ginseng', reason: 'Ginseng complements Shilajit\'s energy-supporting effects' },
    { herbId: 'cordyceps-mens', reason: 'Cordyceps adds oxygen utilization support to Shilajit\'s mineral benefits' }
  ],
  'suma': [
    { herbId: 'maca', reason: 'Maca enhances Suma\'s adaptogenic properties for male vitality' },
    { herbId: 'tribulus', reason: 'Tribulus adds hormonal support to Suma\'s adaptogenic properties' },
    { herbId: 'ashwagandha', reason: 'Ashwagandha complements Suma\'s stress-reducing benefits' }
  ],
  'cordyceps-mens': [
    { herbId: 'tongkat-ali', reason: 'Tongkat Ali enhances Cordyceps\' effects on male vitality' },
    { herbId: 'ginseng', reason: 'Ginseng complements Cordyceps\' energy-supporting properties' },
    { herbId: 'cistanche', reason: 'Cistanche adds warming yang energy to Cordyceps\' stamina benefits' }
  ],
  
  // New brain herb pairings
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
  
  // New women's herb pairings
  'evening-primrose-oil': [
    { herbId: 'vitex', reason: 'Vitex complements Evening Primrose Oil\'s hormone-balancing properties' },
    { herbId: 'black-cohosh', reason: 'Black Cohosh enhances Evening Primrose Oil\'s benefits for menopausal symptoms' },
    { herbId: 'dong-quai', reason: 'Dong Quai adds blood-moving properties to Evening Primrose Oil\'s anti-inflammatory effects' }
  ],
  'queens-cup': [
    { herbId: 'red-raspberry', reason: 'Red Raspberry enhances Queen\'s Cup\'s reproductive system support' },
    { herbId: 'vitex', reason: 'Vitex complements Queen\'s Cup\'s hormonal balancing properties' },
    { herbId: 'shatavari', reason: 'Shatavari adds nourishing properties to Queen\'s Cup\'s tonic effects' }
  ],
  'raspberry-seed': [
    { herbId: 'red-raspberry', reason: 'Red Raspberry leaf enhances Raspberry Seed\'s female reproductive benefits' },
    { herbId: 'evening-primrose-oil', reason: 'Evening Primrose Oil complements Raspberry Seed\'s essential fatty acid content' },
    { herbId: 'nettle', reason: 'Nettle adds mineral support to Raspberry Seed\'s nutritive properties' }
  ],
  
  // Default pairings for herbs without specific matches
  'default': [
    { herbId: 'hawthorn', reason: 'Hawthorn provides heart support alongside this herb\'s benefits' },
    { herbId: 'ginger', reason: 'Ginger adds digestive support and improves absorption' },
    { herbId: 'nettle', reason: 'Nettle contributes mineral support and gentle detoxification' }
  ],
  'hawthorne-berry': [
    { herbId: 'hawthorn', reason: 'Traditional and berry forms of Hawthorn complement each other for comprehensive heart support' },
    { herbId: 'rose', reason: 'Rose adds emotional heart support to Hawthorne Berry\'s physical benefits' },
    { herbId: 'aronia-berry', reason: 'Aronia Berry enhances the antioxidant effects of Hawthorne Berry for heart health' }
  ],
  'aronia-berry': [
    { herbId: 'hawthorne-berry', reason: 'Hawthorne Berry adds specific cardiac support to Aronia\'s antioxidant benefits' },
    { herbId: 'bilberry', reason: 'Bilberry complements Aronia\'s vascular support with additional circulation benefits' },
    { herbId: 'pomegranate', reason: 'Pomegranate enhances Aronia\'s antioxidant protection for the cardiovascular system' }
  ],
  'pomegranate': [
    { herbId: 'aronia-berry', reason: 'Aronia Berry complements Pomegranate\'s antioxidant protection for the heart' },
    { herbId: 'turmeric-heart', reason: 'Turmeric adds anti-inflammatory effects to Pomegranate\'s antioxidant benefits' },
    { herbId: 'olive-leaf', reason: 'Olive Leaf enhances Pomegranate\'s arterial health support' }
  ],
  'reishi-heart': [
    { herbId: 'hawthorn', reason: 'Hawthorn adds specific heart support to Reishi\'s adaptogenic benefits' },
    { herbId: 'astragalus', reason: 'Astragalus complements Reishi\'s immune-supporting effects for heart health' },
    { herbId: 'tulsi-heart', reason: 'Holy Basil enhances Reishi\'s adaptogenic support for heart health during stress' }
  ],
  'coleus': [
    { herbId: 'hawthorn', reason: 'Hawthorn complements Coleus\'s effects on heart function' },
    { herbId: 'cayenne', reason: 'Cayenne enhances Coleus\'s circulation-boosting benefits' },
    { herbId: 'garlic', reason: 'Garlic adds complementary cardiovascular support to Coleus\'s effects' }
  ],
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
      : activeHerb.id === 'cacao' && activeHerb.category === 'heart'
      ? 'cacao'
      : activeHerb.id === 'cayenne' && activeHerb.category === 'heart'
      ? 'cayenne'
      : activeHerb.id === 'ginger-heart' && activeHerb.category === 'heart'
      ? 'ginger-heart'
      : activeHerb.id === 'tulsi-heart' && activeHerb.category === 'heart'
      ? 'tulsi-heart'
      : activeHerb.id === 'turmeric-heart' && activeHerb.category === 'heart'
      ? 'turmeric-heart'
      : activeHerb.id === 'motherwort-heart' && activeHerb.category === 'heart'
      ? 'motherwort-heart'
      : activeHerb.id === 'yarrow' && activeHerb.category === 'heart'
      ? 'yarrow'
      : activeHerb.id === 'dan-shen' && activeHerb.category === 'heart'
      ? 'dan-shen'
      : activeHerb.id === 'aloe-vera' && activeHerb.category === 'stomach'
      ? 'aloe-vera'
      : activeHerb.id === 'calendula' && activeHerb.category === 'stomach'
      ? 'calendula'
      : activeHerb.id === 'catnip' && activeHerb.category === 'stomach'
      ? 'catnip'
      : activeHerb.id === 'shilajit' && activeHerb.category === 'men'
      ? 'shilajit'
      : activeHerb.id === 'suma' && activeHerb.category === 'men'
      ? 'suma'
      : activeHerb.id === 'cordyceps-mens' && activeHerb.category === 'men'
      ? 'cordyceps-mens'
      : activeHerb.id === 'sage-brain' && activeHerb.category === 'brain'
      ? 'sage-brain'
      : activeHerb.id === 'rosemary-memory' && activeHerb.category === 'brain'
      ? 'rosemary-memory'
      : activeHerb.id === 'goji-berry' && activeHerb.category === 'brain'
      ? 'goji-berry'
      : activeHerb.id === 'evening-primrose-oil' && activeHerb.category === 'women'
      ? 'evening-primrose-oil'
      : activeHerb.id === 'queens-cup' && activeHerb.category === 'women'
      ? 'queens-cup'
      : activeHerb.id === 'raspberry-seed' && activeHerb.category === 'women'
      ? 'raspberry-seed'
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
