
import React from 'react';
import CategoryIcon from './CategoryIcon';
import { cn } from '@/lib/utils';
import { HerbCategory } from '@/data/types';

interface CategoryHeaderProps {
  activeCategory: HerbCategory;
  handleCategoryChange: (category: HerbCategory) => void;
  categoryColors: Record<HerbCategory, string>;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ 
  activeCategory, 
  handleCategoryChange,
  categoryColors 
}) => {
  return (
    <div className="glass sticky top-0 z-10 py-6 px-8 flex items-center justify-center">
      <div className="flex flex-wrap gap-3 justify-center">
        {(['heart', 'stomach', 'mens', 'womens'] as const).map((category) => (
          <button 
            key={category}
            className={cn(
              "category-button flex items-center px-5 py-3 rounded-xl transition-all duration-300 border",
              "focus-ring",
              activeCategory === category 
                ? `active ${categoryColors[category]}` 
                : "bg-white/70 hover:bg-white border-gray-100"
            )}
            onClick={() => handleCategoryChange(category)}
          >
            <CategoryIcon category={category} size={20} className="mr-2" />
            <span className="font-medium">
              {category === 'heart' ? 'Heart' : 
               category === 'stomach' ? 'Stomach' : 
               category === 'mens' ? "Men's Health" : 
               "Women's Health"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryHeader;
