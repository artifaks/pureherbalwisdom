import React from 'react';
import { cn } from '@/lib/utils';
import CategoryIcon from './CategoryIcon';
import { HerbCategory } from '@/data/types';
import { Leaf, Flower, FlowerIcon, Sprout, TreeDeciduous, Flower2, BookmarkPlus, Bookmark, Brain, MushroomIcon } from 'lucide-react';

interface HerbCardProps {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
  category?: HerbCategory;
  benefits?: string[];
  isSaved?: boolean;
  onToggleSave?: () => void;
  size?: 'small' | 'default';
}

const getHerbIcon = (herbId: string, color: string, size: number = 24) => {
  const iconMapping: Record<string, React.ReactNode> = {
    'hawthorn': <Leaf size={size} color={color} />,
    'motherwort': <Flower size={size} color={color} />,
    'arjuna': <TreeDeciduous size={size} color={color} />,
    'garlic': <Sprout size={size} color={color} />,
    
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
    
    'cordyceps': <MushroomIcon size={size} color={color} />,
    'reishi': <MushroomIcon size={size} color={color} />,
    'ginseng-brain': <Sprout size={size} color={color} />,
    'mugwort': <Leaf size={size} color={color} />,
    'periwinkle': <Flower size={size} color={color} />,
  };

  return iconMapping[herbId] || <Leaf size={size} color={color} />;
};

const getCategoryColor = (category?: HerbCategory): string => {
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

const HerbCard: React.FC<HerbCardProps> = ({ 
  id, 
  name, 
  color, 
  isActive, 
  onClick, 
  category,
  benefits,
  isSaved = false,
  onToggleSave,
  size = 'default'
}) => {
  const primaryBenefit = benefits && benefits.length > 0 ? benefits[0] : '';
  const categoryColor = getCategoryColor(category);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSave) {
      onToggleSave();
    }
  };

  return (
    <div
      className={cn(
        "herb-card relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl",
        "bg-white herb-card-shadow transition-all duration-300",
        "active:bg-gray-50 touch-manipulation",
        isActive ? "active ring-2 ring-accent/50 scale-105 z-10" : "hover:bg-gray-50/80 hover:scale-102 hover:shadow-md",
        "w-full cursor-pointer",
        size === 'small' ? "p-2 sm:p-3" : "p-3 sm:p-4"
      )}
      style={{ 
        borderTop: `4px solid ${categoryColor}`
      }}
      onClick={onClick}
      aria-selected={isActive}
      role="button"
    >
      <button 
        className="absolute top-2 right-2 text-gray-400 hover:text-accent transition-colors z-20"
        onClick={handleBookmarkClick}
        aria-label={isSaved ? "Remove from My Herbs" : "Add to My Herbs"}
        title={isSaved ? "Remove from My Herbs" : "Add to My Herbs"}
      >
        {isSaved 
          ? <Bookmark size={size === 'small' ? 14 : 18} className="text-accent fill-accent" /> 
          : <BookmarkPlus size={size === 'small' ? 14 : 18} />
        }
      </button>

      <div className={cn(
        "herb-icon-container rounded-full mb-2 flex items-center justify-center transition-transform duration-300",
        size === 'small' ? "w-6 h-6 sm:w-8 sm:h-8" : "w-8 h-8 sm:w-10 sm:h-10"
      )}>
        {getHerbIcon(id, categoryColor, size === 'small' ? 18 : 24)}
      </div>
      <span className={cn(
        "font-medium text-gray-800 text-center",
        size === 'small' ? "text-xs" : "text-sm"
      )}>{name}</span>
      
      {primaryBenefit && size !== 'small' && (
        <p className="text-xs text-gray-600 mt-1 text-center line-clamp-2 max-w-[95%] leading-tight">
          {primaryBenefit}
        </p>
      )}
      
      {category && size !== 'small' && (
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <CategoryIcon category={category} size={12} className="mr-1" />
          <span>
            {category === 'heart' ? 'Heart' : 
             category === 'stomach' ? 'Stomach' : 
             category === 'mens' ? "Men's" : 
             category === 'womens' ? "Women's" :
             category === 'brain' ? "Brain" : ""}
          </span>
        </div>
      )}
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-accent/5 animate-pulse-soft" />
      )}
    </div>
  );
};

export default HerbCard;
