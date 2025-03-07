import { HerbPairing } from '@/data/types';

// Men's herb pairings
export const mensHerbPairings: Record<string, HerbPairing[]> = {
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
  'tribulus-enhanced': [
    {
      herbId: 'ashwagandha',
      reason: 'Tribulus\'s hormone-supporting properties complement ashwagandha\'s adaptogenic stress support for male vitality.'
    },
    {
      herbId: 'tongkat-ali',
      reason: 'These two powerful male tonics work synergistically to support testosterone and overall male health.'
    },
    {
      herbId: 'horny-goat-enhanced',
      reason: 'These traditional herbs combine to create a comprehensive formula for male reproductive health and vitality.'
    }
  ],
  'horny-goat-enhanced': [
    {
      herbId: 'tribulus-enhanced',
      reason: 'Horny goat weed\'s circulation support complements tribulus\'s hormone support for male reproductive health.'
    },
    {
      herbId: 'maca',
      reason: 'Horny goat weed\'s circulation support pairs well with maca\'s energy and stamina enhancement for male vitality.'
    },
    {
      herbId: 'tongkat-ali',
      reason: 'These traditional herbs work together to support male reproductive health and overall vitality.'
    }
  ],
  'damiana-mens': [
    {
      herbId: 'tribulus',
      reason: 'Damiana\'s nervous system support complements tribulus\'s hormone support for comprehensive male vitality.'
    },
    {
      herbId: 'maca',
      reason: 'Damiana\'s mood-enhancing properties pair well with maca\'s energy support for male wellness.'
    },
    {
      herbId: 'muira-puama',
      reason: 'These traditional South American herbs work synergistically to support male reproductive health and vitality.'
    }
  ],
  'pine-bark': [
    { herbId: 'tongkat-ali', reason: 'Pine Bark\'s circulation support complements Tongkat Ali\'s hormonal effects for enhanced male vitality' },
    { herbId: 'ginseng', reason: 'Pine Bark\'s antioxidant properties enhance Ginseng\'s energy-supporting effects' },
    { herbId: 'maca', reason: 'These two powerful herbs work together to support overall male reproductive health and performance' }
  ],
  'stinging-nettle-mens': [
    { herbId: 'saw-palmetto', reason: 'Stinging Nettle and Saw Palmetto are commonly paired for comprehensive prostate support' },
    { herbId: 'pumpkin-seed-extract', reason: 'Both herbs contain compounds beneficial for prostate and urinary health' },
    { herbId: 'ashwagandha', reason: 'Nettle\'s mineral content pairs well with Ashwagandha\'s stress-reducing properties for overall male health' }
  ],
  'pumpkin-seed-extract': [
    { herbId: 'saw-palmetto', reason: 'Pumpkin Seed\'s zinc-rich profile complements the prostate support of Saw Palmetto' },
    { herbId: 'stinging-nettle-mens', reason: 'These two herbs work synergistically to support prostate and urinary health' },
    { herbId: 'nettle-root', reason: 'Both provide comprehensive support for male reproductive health and urinary function' }
  ]
};
