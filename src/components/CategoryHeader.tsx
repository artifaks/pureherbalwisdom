
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
                ? `active ${categoryColors[category]} shadow-lg relative` 
                : "bg-white/70 hover:bg-white border-gray-100"
            )}
            onClick={() => handleCategoryChange(category)}
          >
            <CategoryIcon category={category} size={20} className="mr-2" />
            <span className={cn(
              "font-medium",
              activeCategory === category && "relative"
            )}>
              {category === 'heart' ? 'Heart' : 
               category === 'stomach' ? 'Stomach' : 
               category === 'mens' ? "Men's Health" : 
               "Women's Health"}
               
              {activeCategory === category && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current rounded-full"></span>
              )}
            </span>
            
            {activeCategory === category && (
              <span className="absolute inset-0 rounded-xl opacity-20 animate-pulse-soft"
                    style={{ 
                      boxShadow: `0 0 15px 2px ${
                        category === 'heart' ? '#e94057' : 
                        category === 'stomach' ? '#4CAF50' : 
                        category === 'mens' ? '#3f51b5' : 
                        '#C2185B'
                      }`,
                      background: `radial-gradient(circle, ${
                        category === 'heart' ? 'rgba(233, 64, 87, 0.1)' : 
                        category === 'stomach' ? 'rgba(76, 175, 80, 0.1)' : 
                        category === 'mens' ? 'rgba(63, 81, 181, 0.1)' : 
                        'rgba(194, 24, 91, 0.1)'
                      } 0%, transparent 70%)`
                    }}
              ></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryHeader;
