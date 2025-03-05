
import React from 'react';
import { cn } from '@/lib/utils';
import CategoryIcon from './CategoryIcon';
import { HerbCategory } from '@/data/types';

interface HerbCardProps {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
  category?: HerbCategory;
  benefits?: string[];
}

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

  return (
    <div
      className={cn(
        "herb-card relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer",
        "bg-white herb-card-shadow transition-all duration-300",
        isActive ? "active ring-2 ring-accent/50 scale-105" : "hover:bg-gray-50/80 hover:scale-102"
      )}
      style={{ 
        borderTop: `4px solid ${color}`
      }}
      onClick={onClick}
    >
      <div 
        className="herb-color-dot w-10 h-10 rounded-full mb-2 animate-pulse-soft" 
        style={{ backgroundColor: color }}
      />
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
