
import React from 'react';
import { Leaf, Flower, FlowerIcon, Sprout, TreeDeciduous, Flower2, Brain, HeartPulse, BookHeart, HandHeart, HeartHandshake } from 'lucide-react';
import { HerbCategory } from '@/data/types';

// Map herb IDs to their corresponding icons
export const getHerbIcon = (herbId: string, color: string, size: number = 24) => {
  const iconMapping: Record<string, React.ReactNode> = {
    // Heart herbs
    'hawthorn': <Leaf size={size} color={color} />,
    'motherwort': <Flower size={size} color={color} />,
    'arjuna': <TreeDeciduous size={size} color={color} />,
    'garlic': <Sprout size={size} color={color} />,
    'astragalus': <Sprout size={size} color={color} />,
    'tienchi-ginseng': <Sprout size={size} color={color} />,
    'cactus-grandiflorus': <Flower2 size={size} color={color} />,
    // Heart herbs added previously
    'hibiscus': <Flower2 size={size} color={color} />,
    'linden': <Leaf size={size} color={color} />,
    'rose': <Flower size={size} color={color} />,
    'olive-leaf': <Leaf size={size} color={color} />,
    'bilberry': <HeartPulse size={size} color={color} />,
    // New heart herbs added previously
    'cacao': <HeartHandshake size={size} color={color} />,
    'cayenne': <HeartPulse size={size} color={color} />,
    'ginger-heart': <Sprout size={size} color={color} />,
    'tulsi-heart': <Leaf size={size} color={color} />,
    'turmeric-heart': <Sprout size={size} color={color} />,
    // Additional new heart herbs
    'hawthorne-berry': <HeartPulse size={size} color={color} />,
    'aronia-berry': <HeartPulse size={size} color={color} />,
    'pomegranate': <HeartHandshake size={size} color={color} />,
    'reishi-heart': <Sprout size={size} color={color} />,
    'coleus': <Leaf size={size} color={color} />,
    // New heart herbs
    'motherwort-heart': <Flower size={size} color={color} />,
    'yarrow': <Flower2 size={size} color={color} />,
    'dan-shen': <Leaf size={size} color={color} />,
    
    // Stomach herbs
    'peppermint': <Leaf size={size} color={color} />,
    'ginger': <Sprout size={size} color={color} />,
    'chamomile': <Flower size={size} color={color} />,
    'licorice': <Sprout size={size} color={color} />,
    'fennel': <FlowerIcon size={size} color={color} />,
    'marshmallow': <Flower2 size={size} color={color} />,
    'slippery-elm': <TreeDeciduous size={size} color={color} />,
    'meadowsweet': <Flower size={size} color={color} />,
    'cardamom': <Sprout size={size} color={color} />,
    'lemon-balm': <Leaf size={size} color={color} />,
    'angelica': <FlowerIcon size={size} color={color} />,
    'dandelion': <Flower size={size} color={color} />,
    'gentian': <Sprout size={size} color={color} />,
    'artichoke-leaf': <Leaf size={size} color={color} />,
    'orange-peel': <Leaf size={size} color={color} />,
    // New stomach herbs
    'aloe-vera': <Leaf size={size} color={color} />,
    'calendula': <Flower2 size={size} color={color} />,
    'catnip': <Leaf size={size} color={color} />,
    
    // Men's herbs
    'saw-palmetto': <TreeDeciduous size={size} color={color} />,
    'nettle-root': <Sprout size={size} color={color} />,
    'ginseng': <Sprout size={size} color={color} />,
    'tribulus': <Flower size={size} color={color} />,
    'ashwagandha': <Leaf size={size} color={color} />,
    'muira-puama': <TreeDeciduous size={size} color={color} />,
    'tongkat-ali': <Sprout size={size} color={color} />,
    'maca': <Sprout size={size} color={color} />,
    'pine-pollen': <TreeDeciduous size={size} color={color} />,
    'horny-goat-weed': <Leaf size={size} color={color} />,
    'fo-ti': <Leaf size={size} color={color} />,
    'nettle-leaf': <Leaf size={size} color={color} />,
    'muira-puama-root': <Sprout size={size} color={color} />,
    'oatstraw': <Sprout size={size} color={color} />,
    'cistanche': <Sprout size={size} color={color} />,
    // New men's herbs
    'shilajit': <Sprout size={size} color={color} />,
    'suma': <Leaf size={size} color={color} />,
    'cordyceps-mens': <Sprout size={size} color={color} />,
    
    // Brain herbs
    'cordyceps': <Sprout size={size} color={color} />,
    'reishi': <Sprout size={size} color={color} />,
    'ginseng-brain': <Sprout size={size} color={color} />,
    'mugwort-brain': <Leaf size={size} color={color} />, 
    'periwinkle': <Flower size={size} color={color} />,
    'blueberry': <Leaf size={size} color={color} />,
    'green-tea': <Leaf size={size} color={color} />,
    'rosemary-brain': <Leaf size={size} color={color} />,
    'gotu-kola': <Leaf size={size} color={color} />,
    'brahmi': <Leaf size={size} color={color} />,
    'phosphatidylserine': <Brain size={size} color={color} />,
    'gotu-kola-enhanced': <Leaf size={size} color={color} />,
    'ginkgo': <Leaf size={size} color={color} />,
    'bacopa': <Leaf size={size} color={color} />,
    'lions-mane': <Sprout size={size} color={color} />,
    'rhodiola': <Sprout size={size} color={color} />,
    // New brain herbs
    'sage-brain': <Leaf size={size} color={color} />,
    'rosemary-memory': <Leaf size={size} color={color} />,
    'goji-berry': <Sprout size={size} color={color} />,
    
    // Women's herbs
    'red-raspberry': <Leaf size={size} color={color} />,
    'chasteberry': <Sprout size={size} color={color} />,
    'black-cohosh': <Sprout size={size} color={color} />,
    'dong-quai': <Sprout size={size} color={color} />,
    'evening-primrose': <Flower size={size} color={color} />,
    'mugwort-womens': <Leaf size={size} color={color} />,
    'shatavari': <Leaf size={size} color={color} />,
    'wild-yam': <Sprout size={size} color={color} />,
    'motherwort-womens': <Flower size={size} color={color} />,
    'vitex': <Sprout size={size} color={color} />,
    'red-clover': <Flower size={size} color={color} />,
    'damiana': <Leaf size={size} color={color} />,
    'maca-womens': <Sprout size={size} color={color} />,
    'nettle': <Leaf size={size} color={color} />,
    'schisandra': <Sprout size={size} color={color} />,
    'peony': <Flower size={size} color={color} />,
    'angelica-sinensis': <Sprout size={size} color={color} />,
    'tulsi': <Leaf size={size} color={color} />,
    'lady-mantle': <Leaf size={size} color={color} />,
    'black-haw': <TreeDeciduous size={size} color={color} />,
    'cramp-bark': <Leaf size={size} color={color} />,
    // New women's herbs
    'evening-primrose-oil': <Flower size={size} color={color} />,
    'queens-cup': <Flower2 size={size} color={color} />,
    'raspberry-seed': <Leaf size={size} color={color} />,
  };

  // Handle special cases for herbs with duplicate IDs
  if (herbId === 'mugwort' && iconMapping['mugwort-brain']) {
    return iconMapping['mugwort-brain'];
  } else if (herbId === 'mugwort' && iconMapping['mugwort-womens']) {
    return iconMapping['mugwort-womens'];
  } else if (herbId === 'motherwort' && iconMapping['motherwort-womens']) {
    return iconMapping['motherwort-womens'];
  } else if (herbId === 'rosemary-memory') {
    return iconMapping['rosemary-brain'];
  } else if (herbId === 'ginseng') {
    return iconMapping['ginseng'];
  }

  return iconMapping[herbId] || <Leaf size={size} color={color} />;
};

// Extract category color function
export const getCategoryColor = (category?: HerbCategory): string => {
  switch(category) {
    case 'heart':
      return '#e94057';
    case 'stomach':
      return '#4CAF50';
    case 'mens':
      return '#8D6E63';
    case 'womens':
      return '#C2185B';
    case 'brain':
      return '#9C27B0';
    default:
      return '#757575';
  }
};
