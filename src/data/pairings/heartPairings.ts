
import { HerbPairing } from '@/data/herbPairings';

// Heart herb pairings
export const heartHerbPairings: Record<string, HerbPairing[]> = {
  'cacao': [
    { herbId: 'hawthorn', reason: 'Hawthorn supports Cacao\'s heart-opening properties' },
    { herbId: 'rose', reason: 'Rose enhances Cacao\'s emotional heart support' },
    { herbId: 'cayenne', reason: 'Cayenne improves circulation for Cacao\'s benefits' }
  ],
  'cayenne': [
    { herbId: 'ginger', reason: 'Ginger complements Cayenne\'s warming and circulatory effects' },
    { herbId: 'hawthorn', reason: 'Hawthorn adds heart-strengthening properties to Cayenne' },
    { herbId: 'garlic', reason: 'Garlic enhances Cayenne\'s cardiovascular benefits' }
  ],
  'ginger-heart': [
    { herbId: 'hawthorn', reason: 'Hawthorn enhances Ginger\'s circulatory benefits for the heart' },
    { herbId: 'turmeric', reason: 'Turmeric complements Ginger\'s anti-inflammatory effects' },
    { herbId: 'cayenne', reason: 'Cayenne adds warming and stimulating properties to Ginger' }
  ],
  'tulsi-heart': [
    { herbId: 'hawthorn', reason: 'Hawthorn supports Tulsi\'s stress-reducing effects on the heart' },
    { herbId: 'rose', reason: 'Rose enhances Tulsi\'s emotional heart support' },
    { herbId: 'reishi', reason: 'Reishi adds adaptogenic benefits to Tulsi for heart health' }
  ],
  'turmeric-heart': [
    { herbId: 'ginger', reason: 'Ginger complements Turmeric\'s anti-inflammatory effects' },
    { herbId: 'hawthorn', reason: 'Hawthorn adds heart-strengthening properties to Turmeric' },
    { herbId: 'black-pepper', reason: 'Black Pepper enhances Turmeric\'s absorption for heart benefits' }
  ],
  
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
  'rhodiola-heart': [
    {
      herbId: 'hawthorn',
      reason: 'Rhodiola\'s adaptogenic properties complement hawthorn\'s cardiotonic effects, supporting heart health during stress.'
    },
    {
      herbId: 'schisandra-heart',
      reason: 'These adaptogens work synergistically to support cardiovascular health while helping the body manage stress.'
    },
    {
      herbId: 'goji-berry',
      reason: 'Rhodiola\'s energizing properties pair well with goji\'s antioxidant protection for heart and brain health.'
    }
  ],
  'schisandra-heart': [
    {
      herbId: 'rhodiola-heart',
      reason: 'Both adaptogens support cardiovascular function while helping the body adapt to physical and mental stress.'
    },
    {
      herbId: 'hawthorn',
      reason: 'Schisandra\'s adaptogenic compounds enhance hawthorn\'s cardioprotective benefits for comprehensive heart support.'
    },
    {
      herbId: 'reishi-heart',
      reason: 'Both herbs support stress reduction and cardiovascular health, creating a powerful heart-supporting combination.'
    }
  ],
  'amla-heart': [
    {
      herbId: 'turmeric-heart',
      reason: 'Amla\'s vitamin C enhances the bioavailability of turmeric\'s curcumin, amplifying anti-inflammatory benefits for the heart.'
    },
    {
      herbId: 'hawthorn',
      reason: 'Amla\'s antioxidant properties complement hawthorn\'s cardiotonic effects for comprehensive heart protection.'
    },
    {
      herbId: 'arjuna',
      reason: 'These two traditional Ayurvedic herbs work together to support overall cardiovascular strength and function.'
    }
  ]
};
