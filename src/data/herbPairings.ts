
import { Herb } from '@/data/types';

// Define pairings data for herbs
export interface HerbPairing {
  herbId: string;
  reason: string;
}

export interface HerbPairingsMap {
  [herbId: string]: HerbPairing[];
}

// Comprehensive pairings data
export const herbPairings: Record<string, { herbId: string; reason: string }[]> = {
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
  
  // New added women's herb pairings
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
  
  // First default entry - will be replaced by the merged one at the end
  
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
  
  // New heart herb pairings
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
  ],
  
  // New brain herb pairings
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
  ],
  
  // New stomach herb pairings
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
  
  // New mens herb pairings
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
  
  // New womens herb pairings
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

  // Merged default herbs (combining both default entries)
  'default': [
    {
      herbId: 'ginger',
      reason: 'Ginger is a warming herb that enhances circulation and can complement many other herbs.'
    },
    {
      herbId: 'turmeric',
      reason: 'Turmeric\'s anti-inflammatory properties work well with many herbs to enhance overall effects.'
    },
    {
      herbId: 'ashwagandha',
      reason: 'As an adaptogen, ashwagandha can enhance the effects of many herbs by helping the body manage stress.'
    },
    {
      herbId: 'hawthorn',
      reason: 'Hawthorn provides heart support alongside this herb\'s benefits'
    },
    {
      herbId: 'nettle',
      reason: 'Nettle contributes mineral support and gentle detoxification'
    }
  ]
};

