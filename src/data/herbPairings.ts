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
export const herbPairings: HerbPairingsMap = {
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
