
import React from 'react';
import { Link } from 'react-router-dom';
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
    e.preventDefault(); // Prevent navigation when clicking bookmark
    if (onToggleSave) {
      onToggleSave();
    }
  };

  // Card content that will be wrapped with either a div or Link
  const cardContent = (
    <>
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
        "font-medium text-gray-800 dark:text-white text-center",
        size === 'small' ? "text-xs" : "text-sm"
      )}>{name}</span>
      
      {primaryBenefit && size !== 'small' && (
        <p className="text-xs text-gray-600 dark:text-gray-200 mt-1 text-center line-clamp-2 max-w-[95%] leading-tight">
          {primaryBenefit}
        </p>
      )}
      
      {category && size !== 'small' && (
        <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-300">
          <CategoryIcon category={category} size={12} className="mr-1" />
          <span>
            {category === 'heart' ? 'Heart' : 
             category === 'stomach' ? 'Stomach' : 
             category === 'mens' ? "Men's" : 
             category === 'womens' ? "Women's" :
             category === 'brain' ? "Brain" : "Tea"}
          </span>
        </div>
      )}
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-accent/5 animate-pulse-soft" />
      )}
    </>
  );

  // Base className for card
  const cardClassName = cn(
    "herb-card relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl",
    "bg-white dark:bg-gray-800 herb-card-shadow transition-all duration-300",
    "active:bg-gray-50 dark:active:bg-gray-700 touch-manipulation",
    isActive ? "active ring-2 ring-accent/50 scale-105 z-10" : "hover:bg-gray-50/80 dark:hover:bg-gray-700/90 hover:scale-102 hover:shadow-md",
    "w-full cursor-pointer",
    size === 'small' ? "p-2 sm:p-3" : "p-3 sm:p-4"
  );

  // If in a modal context, use the onClick, otherwise Link to the herb detail page
  if (isActive) {
    return (
      <div
        className={cardClassName}
        style={{ borderTop: `4px solid ${categoryColor}` }}
        onClick={onClick}
        aria-selected={isActive}
        role="button"
      >
        {cardContent}
      </div>
    );
  } else {
    return (
      <Link
        to={`/herbs/${id}`}
        className={cardClassName}
        style={{ borderTop: `4px solid ${categoryColor}` }}
        onClick={onClick}
        aria-selected={isActive}
        role="button"
      >
        {cardContent}
      </Link>
    );
  }
};

export default HerbCard;
