import React from 'react';
import { cn } from '@/lib/utils';
import CategoryIcon from './CategoryIcon';
import { HerbCategory } from '@/data/types';
import { Leaf, Flower, FlowerIcon, Sprout, TreeDeciduous, Flower2 } from 'lucide-react';

interface HerbCardProps {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
  category?: HerbCategory;
  benefits?: string[];
}

// Function to get the appropriate herb icon based on herb ID
const getHerbIcon = (herbId: string, color: string, size: number = 24) => {
  // Map herbs to their corresponding icons
  const iconMapping: Record<string, React.ReactNode> = {
    // Heart herbs (examples)
    'hawthorn': <Leaf size={size} color={color} />,
    'motherwort': <Flower size={size} color={color} />,
    'arjuna': <TreeDeciduous size={size} color={color} />,
    'garlic': <Sprout size={size} color={color} />,
    
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
  };

  // Return the specific icon or a default leaf icon
  return iconMapping[herbId] || <Leaf size={size} color={color} />;
};

// Get category-specific colors
const getCategoryColor = (category?: HerbCategory): string => {
  switch(category) {
    case 'heart':
      return '#e94057'; // Red for heart herbs
    case 'stomach':
      return '#4CAF50'; // Green for digestive herbs
    case 'mens':
      return '#8D6E63'; // Brown for men's herbs
    case 'womens':
      return '#C2185B'; // Pink for women's herbs
    default:
      return '#757575'; // Default gray
  }
};

const HerbCard: React.FC<HerbCardProps> = ({ 
  id, 
  name, 
  color, 
  isActive, 
  onClick, 
  category,
  benefits 
}) => {
  // Get the primary benefit (first in the array)
  const primaryBenefit = benefits && benefits.length > 0 ? benefits[0] : '';
  // Use category color instead of individual herb color for border
  const categoryColor = getCategoryColor(category);

  return (
    <div
      className={cn(
        "herb-card relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer",
        "bg-white herb-card-shadow transition-all duration-300",
        isActive ? "active ring-2 ring-accent/50 scale-105" : "hover:bg-gray-50/80 hover:scale-102"
      )}
      style={{ 
        borderTop: `4px solid ${categoryColor}`
      }}
      onClick={onClick}
    >
      <div className="herb-icon-container w-10 h-10 rounded-full mb-2 flex items-center justify-center">
        {getHerbIcon(id, categoryColor)}
      </div>
      <span className="text-sm font-medium text-gray-800 text-center">{name}</span>
      
      {/* Primary benefit line */}
      {primaryBenefit && (
        <p className="text-xs text-gray-600 mt-1 text-center line-clamp-2 max-w-[90%]">
          {primaryBenefit}
        </p>
      )}
      
      {category && (
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <CategoryIcon category={category} size={12} className="mr-1" />
          <span>
            {category === 'heart' ? 'Heart' : 
             category === 'stomach' ? 'Stomach' : 
             category === 'mens' ? "Men's" : 
             "Women's"}
          </span>
        </div>
      )}
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-accent/5 animate-fade-in" />
      )}
    </div>
  );
};

export default HerbCard;
