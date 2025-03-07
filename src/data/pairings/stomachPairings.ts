
import { HerbPairing } from '@/data/herbPairings';

// Stomach herb pairings
export const stomachHerbPairings: Record<string, HerbPairing[]> = {
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
  'triphala': [
    {
      herbId: 'ginger',
      reason: 'Triphala\'s cleansing properties pair well with ginger\'s digestive-stimulating effects for comprehensive gut health.'
    },
    {
      herbId: 'fennel',
      reason: 'Triphala\'s cleansing action complements fennel\'s carminative properties to reduce bloating and support digestion.'
    },
    {
      herbId: 'fenugreek',
      reason: 'These traditional Ayurvedic herbs work together to support healthy digestion and elimination.'
    }
  ],
  'fenugreek': [
    {
      herbId: 'ginger',
      reason: 'Fenugreek\'s mucilaginous properties complement ginger\'s warming digestive support for comprehensive gut health.'
    },
    {
      herbId: 'fennel',
      reason: 'Both carminative herbs work together to reduce gas and bloating while supporting overall digestive function.'
    },
    {
      herbId: 'triphala',
      reason: 'Fenugreek\'s mucilage supports triphala\'s gentle cleansing action for digestive health and comfort.'
    }
  ],
  'coriander-seed': [
    {
      herbId: 'fennel',
      reason: 'Both carminative seeds work synergistically to reduce gas and bloating while supporting healthy digestion.'
    },
    {
      herbId: 'peppermint',
      reason: 'Coriander\'s warming properties balance peppermint\'s cooling effect for balanced digestive support.'
    },
    {
      herbId: 'ginger',
      reason: 'These traditional digestive herbs combine to create a powerful blend for digestive comfort and function.'
    }
  ]
};
