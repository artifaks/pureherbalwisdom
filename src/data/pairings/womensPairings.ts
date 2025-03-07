import { HerbPairing } from '@/data/types';

// Women's herb pairings
export const womensHerbPairings: Record<string, HerbPairing[]> = {
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
  'rose-hips': [
    { herbId: 'nettle', reason: 'Nettle complements Rose Hips\' vitamin and mineral content for hormonal health' },
    { herbId: 'red-raspberry', reason: 'Red Raspberry enhances Rose Hips\' support for female reproductive health' },
    { herbId: 'schisandra', reason: 'Schisandra adds adaptogenic support to Rose Hips\' antioxidant benefits' }
  ],
  'passionflower-womens': [
    { herbId: 'vitex', reason: 'Vitex adds hormonal support to Passionflower\'s calming properties' },
    { herbId: 'motherwort', reason: 'Motherwort enhances Passionflower\'s nervous system support for women' },
    { herbId: 'lemon-balm', reason: 'Lemon Balm complements Passionflower\'s calming effects during PMS' }
  ],
  'shepherds-purse': [
    { herbId: 'lady-mantle', reason: 'Lady\'s Mantle enhances Shepherd\'s Purse\'s astringent properties for female health' },
    { herbId: 'nettle', reason: 'Nettle adds iron support to Shepherd\'s Purse\'s benefits for women\'s health' },
    { herbId: 'yarrow', reason: 'Yarrow complements Shepherd\'s Purse\'s astringent properties for women' }
  ],
  'blue-cohosh': [
    { herbId: 'black-cohosh', reason: 'Black Cohosh creates a traditional synergistic blend with Blue Cohosh' },
    { herbId: 'cramp-bark', reason: 'Cramp Bark adds anti-spasmodic support to Blue Cohosh\'s women\'s health benefits' },
    { herbId: 'ginger', reason: 'Ginger enhances circulation to complement Blue Cohosh\'s actions' }
  ],
  'false-unicorn-root': [
    { herbId: 'wild-yam', reason: 'Wild Yam complements False Unicorn Root\'s female hormone-supporting properties' },
    { herbId: 'vitex', reason: 'Vitex enhances False Unicorn Root\'s benefits for women\'s reproductive health' },
    { herbId: 'black-cohosh', reason: 'Black Cohosh adds hormonal support to False Unicorn Root\'s benefits' }
  ],
  'ashoka-bark': [
    {
      herbId: 'shatavari',
      reason: 'Ashoka\'s uterine support complements shatavari\'s hormonal balancing properties for comprehensive female health.'
    },
    {
      herbId: 'dong-quai',
      reason: 'Both traditional female tonics work synergistically to support menstrual comfort and regularity.'
    },
    {
      herbId: 'shatavari-plus',
      reason: 'Ashoka\'s uterine support enhances shatavari-plus\'s comprehensive female tonic properties.'
    }
  ],
  'cranberry': [
    {
      herbId: 'red-raspberry',
      reason: 'Cranberry\'s urinary tract support complements red raspberry\'s uterine toning for comprehensive female health.'
    },
    {
      herbId: 'nettle',
      reason: 'Cranberry\'s cleansing properties pair well with nettle\'s mineral-rich nourishment for female wellness.'
    },
    {
      herbId: 'dandelion',
      reason: 'Both herbs support healthy elimination and detoxification, benefiting overall female health.'
    }
  ],
  'shatavari-plus': [
    {
      herbId: 'ashoka-bark',
      reason: 'Shatavari-plus\'s hormonal balancing enhances ashoka\'s uterine support for comprehensive female health.'
    },
    {
      herbId: 'dong-quai',
      reason: 'These traditional female tonics work synergistically to support hormonal balance throughout a woman\'s life.'
    },
    {
      herbId: 'vitex',
      reason: 'Shatavari-plus\'s nourishing properties complement vitex\'s hormone-balancing effects for female wellness.'
    }
  ],
  'milk-thistle': [
    {
      herbId: 'dandelion',
      reason: 'Dandelion enhances Milk Thistle\'s liver-supporting properties for hormone detoxification.'
    },
    {
      herbId: 'turmeric',
      reason: 'Turmeric adds anti-inflammatory support to Milk Thistle\'s liver-cleansing actions.'
    },
    {
      herbId: 'schisandra',
      reason: 'Schisandra complements Milk Thistle\'s liver-protective properties with adaptogenic support.'
    }
  ],
  'maca-root-womens': [
    {
      herbId: 'ashwagandha',
      reason: 'Ashwagandha\'s stress-reducing properties complement Maca\'s hormonal support for women.'
    },
    {
      herbId: 'shatavari',
      reason: 'These traditional fertility herbs work synergistically for comprehensive female reproductive support.'
    },
    {
      herbId: 'tribulus-womens',
      reason: 'Tribulus enhances Maca\'s hormone-balancing effects for female reproductive health.'
    }
  ],
  'chaste-tree-berry': [
    {
      herbId: 'dong-quai',
      reason: 'Dong Quai adds blood-moving properties to Chaste Tree Berry\'s hormonal balancing effects.'
    },
    {
      herbId: 'black-cohosh',
      reason: 'Black Cohosh complements Chaste Tree Berry for comprehensive menopausal support.'
    },
    {
      herbId: 'evening-primrose-oil',
      reason: 'Evening Primrose Oil adds essential fatty acids to support Chaste Tree Berry\'s hormonal benefits.'
    }
  ],
  'licorice-root-womens': [
    {
      herbId: 'black-cohosh',
      reason: 'Black Cohosh and Licorice Root work synergistically for menopausal symptom support.'
    },
    {
      herbId: 'wild-yam',
      reason: 'Wild Yam adds hormone-balancing properties to complement Licorice Root\'s adrenal support.'
    },
    {
      herbId: 'tulsi',
      reason: 'Tulsi enhances Licorice Root\'s stress-modulating effects on female hormonal health.'
    }
  ],
  'tribulus-womens': [
    {
      herbId: 'maca-root-womens',
      reason: 'Maca and Tribulus work synergistically to support female hormonal balance and vitality.'
    },
    {
      herbId: 'shatavari',
      reason: 'Shatavari adds nourishing properties to Tribulus\'s tonifying effects for women\'s health.'
    },
    {
      herbId: 'ashwagandha',
      reason: 'Ashwagandha\'s stress-reducing properties complement Tribulus\'s hormonal support for women.'
    }
  ],
  'fennel-womens': [
    { herbId: 'dong-quai', reason: 'Fennel\'s carminative properties complement Dong Quai\'s blood-moving effects for menstrual support' },
    { herbId: 'red-raspberry', reason: 'Both herbs support healthy digestion and reproductive function in women' },
    { herbId: 'fenugreek', reason: 'These herbs work together to support milk production and hormonal balance' }
  ],
  'sage-womens': [
    { herbId: 'black-cohosh', reason: 'Sage\'s ability to reduce sweating pairs well with Black Cohosh\'s support for menopausal transitions' },
    { herbId: 'vitex', reason: 'Sage complements Vitex\'s hormone-balancing properties for comprehensive menopause support' },
    { herbId: 'red-clover', reason: 'Both herbs contain compounds beneficial during hormonal transitions' }
  ],
  'cinnamon-bark-womens': [
    { herbId: 'ginger', reason: 'Both warming herbs support healthy circulation and menstrual comfort' },
    { herbId: 'cramp-bark', reason: 'Cinnamon\'s warming properties enhance Cramp Bark\'s anti-spasmodic effects for menstrual comfort' },
    { herbId: 'dong-quai', reason: 'Combines the circulation-enhancing properties of both herbs for reproductive health' }
  ]
};
