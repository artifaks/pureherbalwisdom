
import React from 'react';
import { cn } from '@/lib/utils';
import CategoryIcon from './CategoryIcon';
import { HerbCategory } from '@/data/types';
import BookmarkButton from './BookmarkButton';
import { getHerbIcon, getCategoryColor } from '@/utils/herbIcons';

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
      <BookmarkButton 
        isSaved={isSaved} 
        size={size} 
        onToggle={handleBookmarkClick} 
      />

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
