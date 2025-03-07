import { HerbPairing } from '@/data/types';

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
  ],
  'burdock-root': [
    { herbId: 'dandelion', reason: 'Burdock Root and Dandelion together provide excellent liver support for optimal digestion' },
    { herbId: 'ginger', reason: 'Ginger\'s warming properties complement Burdock\'s cleansing effects for digestive health' },
    { herbId: 'fennel', reason: 'Fennel\'s carminative properties enhance Burdock\'s detoxifying benefits for the digestive system' }
  ],
  'plantain-leaf': [
    { herbId: 'marshmallow', reason: 'Both herbs contain mucilage that soothes and protects the digestive tract lining' },
    { herbId: 'calendula', reason: 'Plantain\'s soothing properties complement Calendula\'s healing effects for digestive tissues' },
    { herbId: 'slippery-elm', reason: 'These two demulcent herbs work together to protect and heal the digestive mucosa' }
  ],
  'caraway-seed': [
    { herbId: 'fennel', reason: 'Both carminative seeds work synergistically to reduce gas and bloating' },
    { herbId: 'peppermint', reason: 'Caraway\'s warming properties balance with Peppermint\'s cooling effects for digestive comfort' },
    { herbId: 'ginger', reason: 'Combines the digestive-stimulating properties of both herbs for comprehensive support' }
  ]
};
