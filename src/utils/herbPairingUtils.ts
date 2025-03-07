
import { Herb } from '@/data/types';
import { herbPairings } from '@/data/herbPairings';

// Helper function to get the correct key for an herb when looking up pairings
export const getHerbPairingKey = (herb: Herb): string => {
  // Special cases for herbs that need specific category-based keys
  if (herb.id === 'ashwagandha' && herb.category === 'brain') {
    return 'ashwagandha-brain';
  } else if (herb.id === 'turmeric' && herb.category === 'brain') {
    return 'turmeric-brain';
  } else if (herb.id === 'ginger' && herb.category === 'brain') {
    return 'ginger-brain';
  } else if (herb.id === 'cacao' && herb.category === 'heart') {
    return 'cacao';
  } else if (herb.id === 'cayenne' && herb.category === 'heart') {
    return 'cayenne';
  } else if (herb.id === 'ginger-heart' && herb.category === 'heart') {
    return 'ginger-heart';
  } else if (herb.id === 'tulsi-heart' && herb.category === 'heart') {
    return 'tulsi-heart';
  } else if (herb.id === 'turmeric-heart' && herb.category === 'heart') {
    return 'turmeric-heart';
  } else if (herb.id === 'motherwort-heart' && herb.category === 'heart') {
    return 'motherwort-heart';
  } else if (herb.id === 'yarrow' && herb.category === 'heart') {
    return 'yarrow';
  } else if (herb.id === 'dan-shen' && herb.category === 'heart') {
    return 'dan-shen';
  } else if (herb.id === 'aloe-vera' && herb.category === 'stomach') {
    return 'aloe-vera';
  } else if (herb.id === 'calendula' && herb.category === 'stomach') {
    return 'calendula';
  } else if (herb.id === 'catnip' && herb.category === 'stomach') {
    return 'catnip';
  } else if (herb.id === 'shilajit' && herb.category === 'mens') {
    return 'shilajit';
  } else if (herb.id === 'suma' && herb.category === 'mens') {
    return 'suma';
  } else if (herb.id === 'cordyceps-mens' && herb.category === 'mens') {
    return 'cordyceps-mens';
  } else if (herb.id === 'sage-brain' && herb.category === 'brain') {
    return 'sage-brain';
  } else if (herb.id === 'rosemary-memory' && herb.category === 'brain') {
    return 'rosemary-memory';
  } else if (herb.id === 'goji-berry' && herb.category === 'brain') {
    return 'goji-berry';
  } else if (herb.id === 'evening-primrose-oil' && herb.category === 'womens') {
    return 'evening-primrose-oil';
  } else if (herb.id === 'queens-cup' && herb.category === 'womens') {
    return 'queens-cup';
  } else if (herb.id === 'raspberry-seed' && herb.category === 'womens') {
    return 'raspberry-seed';
  } else if (herb.id === 'rose-hips' && herb.category === 'womens') {
    return 'rose-hips';
  } else if (herb.id === 'passionflower-womens' && herb.category === 'womens') {
    return 'passionflower-womens';
  } else if (herb.id === 'shepherds-purse' && herb.category === 'womens') {
    return 'shepherds-purse';
  } else if (herb.id === 'blue-cohosh' && herb.category === 'womens') {
    return 'blue-cohosh';
  } else if (herb.id === 'false-unicorn-root' && herb.category === 'womens') {
    return 'false-unicorn-root';
  } 
  // New herb special cases
  else if (herb.id === 'rhodiola-heart' && herb.category === 'heart') {
    return 'rhodiola-heart';
  } else if (herb.id === 'schisandra-heart' && herb.category === 'heart') {
    return 'schisandra-heart';
  } else if (herb.id === 'amla-heart' && herb.category === 'heart') {
    return 'amla-heart';
  } else if (herb.id === 'brahmi-enhanced' && herb.category === 'brain') {
    return 'brahmi-enhanced';
  } else if (herb.id === 'mucuna-brain' && herb.category === 'brain') {
    return 'mucuna-brain';
  } else if (herb.id === 'celastrus-brain' && herb.category === 'brain') {
    return 'celastrus-brain';
  } else if (herb.id === 'triphala' && herb.category === 'stomach') {
    return 'triphala';
  } else if (herb.id === 'fenugreek' && herb.category === 'stomach') {
    return 'fenugreek';
  } else if (herb.id === 'coriander-seed' && herb.category === 'stomach') {
    return 'coriander-seed';
  } else if (herb.id === 'tribulus-enhanced' && herb.category === 'mens') {
    return 'tribulus-enhanced';
  } else if (herb.id === 'horny-goat-enhanced' && herb.category === 'mens') {
    return 'horny-goat-enhanced';
  } else if (herb.id === 'damiana-mens' && herb.category === 'mens') {
    return 'damiana-mens';
  } else if (herb.id === 'ashoka-bark' && herb.category === 'womens') {
    return 'ashoka-bark';
  } else if (herb.id === 'cranberry' && herb.category === 'womens') {
    return 'cranberry';
  } else if (herb.id === 'shatavari-plus' && herb.category === 'womens') {
    return 'shatavari-plus';
  }
  
  // Default to using the herb's id as the key
  return herb.id;
};

// Get complementary herbs for a given herb
export const getComplementaryHerbs = (activeHerb: Herb, allHerbs: Herb[]) => {
  const herbKey = getHerbPairingKey(activeHerb);
  const pairings = herbPairings[herbKey] || herbPairings['default'];
  
  return pairings.map(pairing => {
    const herb = allHerbs.find(h => h.id === pairing.herbId);
    return herb ? { ...pairing, herb } : null;
  }).filter(Boolean);
};
